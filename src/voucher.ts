import { BeverageConfiguration, BeverageConfigurationBase } from './product';

/**
 * The base option of a voucher. This determines if the voucher can be used multiple times or only once.
 */
export type VoucherBaseOption = 'onetime' | 'promo';

/**
 * The type of a voucher. This determines if the voucher is a percentage discount, a price discount or a beverage voucher.
 */
export type VoucherType = 'percent' | 'price' | 'beverage';

/**
 * The state of a voucher. Vouchers can be valid, cancelled, expired or redeemed. Only valid vouchers can be redeemed.
 * Other states are used to give feedback to the customer.
 */
export type VoucherState = 'valid' | 'cancelled' | 'expired' | 'redeemed';

/**
 * Helper function to convert a voucher state to a color.
 *
 * @param state - The state of the voucher.
 * @returns A default color.
 */
export const VoucherStateToColor = (state: VoucherState): string => {
  switch (state) {
    case 'valid':
      return 'green';
    case 'cancelled':
      return 'red';
    case 'expired':
      return 'orange';
    case 'redeemed':
      return 'blue';
    default:
      return 'black';
  }
};

/**
 * A voucher configuration used to create vouchers in the backend.
 */
export interface IVoucher {
  /**
   * Franchisees can create promo vouchers with custom IDs. One-time vouchers are created with a random ID.
   */
  id: string;

  /**
   * The box where the vouchers can be redeemed.
   */
  boxId: string;
  /**
   * When the voucher was initially created.
   */
  creationDate: Date;
  /** @see VoucherBaseOption */
  baseOption: VoucherBaseOption;
  /** @see VoucherType */
  type: VoucherType;
  /**
   * Expiration date of the voucher. After this date the voucher cannot be redeemed anymore.
   */
  expiryDate?: Date;
  /**
   * Tags can be used to group and filter vouchers. First Tag. Maximum of 3 tags.
   */
  tag1?: string;
  /**
   * Tags can be used to group and filter vouchers. Second Tag.
   */
  tag2?: string;
  /**
   * Tags can be used to group and filter vouchers. Third Tag.
   */
  tag3?: string;
  /**
   * The price cut of the voucher in cents of the local currency. Only used for price vouchers.
   * @minimum 0
   * @maximum 1000
   */
  priceCut?: number;
  /**
   * The percentage cut of the voucher. Only used for percentage vouchers.
   * @minimum 0
   * @maximum 100
   */
  percentCut?: number;
  /**
   * The beverage configuration of the voucher. Only used for beverage vouchers.
   * @see BeverageConfiguration
   */
  beverageConfiguration?: BeverageConfigurationBase;
}

export interface IVoucherConfiguration extends IVoucher {
  /**
   * The number of vouchers that are created with this configuration.
   */
  numberOfVouchers: number;
}

/**
 * Where the voucher was redeemed.
 */
export type RedeemingDevice = 'app' | 'terminal';

/**
 * A voucher that can be redeemed by a customer. This is the main entity of the voucher system.
 * @see IVoucher
 */
export class VoucherDto implements IVoucher {
  id!: string;
  boxId!: string;
  creationDate!: Date;
  baseOption!: VoucherBaseOption;
  type!: VoucherType;
  redemptionDate?: Date;
  redeemingDevice?: RedeemingDevice;
  usages?: number = 0;
  expiryDate?: Date;
  tag1?: string;
  tag2?: string;
  tag3?: string;
  priceCut?: number;
  percentCut?: number;
  beverageConfiguration?: BeverageConfigurationBase;
  ttl?: number;
  state!: VoucherState;
  usedCredit = 0;
}

/**
 * @see IVoucherConfiguration
 */
export class VoucherConfigurationDto extends VoucherDto implements IVoucherConfiguration {
  numberOfVouchers!: number;
}
/** Used to collect usage statistics. */
export class VoucherUsageDto {
  id!: string;
  userId!: string;
  redeemingDevice!: RedeemingDevice;
  redemptionDate!: Date;
  usedCredit = 0;
}

/**
 * Used to collect usage statistics.
 */
export class VoucherUsage {
  constructor(voucher: VoucherDto, voucherUsageDto: VoucherUsageDto | null = null) {
    this.id = voucher.id;
    this.boxId = voucher.boxId;
    this.creationDate = voucher.creationDate;
    this.baseOption = voucher.baseOption;
    this.type = voucher.type;
    this.redemptionDate = voucherUsageDto?.redemptionDate ?? voucher.redemptionDate;
    this.redeemingDevice = voucherUsageDto?.redeemingDevice ?? voucher.redeemingDevice;
    this.expiryDate = voucher.expiryDate;
    this.usages = voucher.usages ?? (voucherUsageDto ? 1 : 0);
    this.tag1 = voucher.tag1;
    this.tag2 = voucher.tag2;
    this.tag3 = voucher.tag3;
    this.priceCut = voucher.priceCut;
    this.percentCut = voucher.percentCut;
    this.beverageConfiguration = voucher.beverageConfiguration;
    this.ttl = voucher.ttl;
    this.state = voucher.state;
    this.usedCredit = voucherUsageDto?.usedCredit ?? 0;
  }

  id!: string;
  boxId!: string;
  creationDate!: Date;
  baseOption!: VoucherBaseOption;
  type!: VoucherType;
  redemptionDate?: Date;
  redeemingDevice?: RedeemingDevice;
  expiryDate?: Date;
  usages?: number = 0;
  tag1?: string;
  tag2?: string;
  tag3?: string;
  priceCut?: number;
  percentCut?: number;
  beverageConfiguration?: BeverageConfigurationBase;
  ttl?: number;
  state!: VoucherState;
  usedCredit?: number = 0;
}

/**
 * This function calculates the value of a voucher in cents.
 *
 * It takes the cart and the voucher and calculates the value of the voucher. This function throws an error if the voucher on invalid voucher configurations.
 *
 * @param cart - The cart to calculate the voucher value for
 * @returns The value of the voucher in cents
 */
export const calculateVoucherValue = (cart: (BeverageConfiguration | VoucherDto)[]): number => {
  // Filter the cart to only contain beverage configurations
  const filteredCart = cart.filter((cv) => (cv as BeverageConfiguration)?.productId) as Array<BeverageConfiguration>;
  if (filteredCart.length === 0) return 0; // If there are no beverages in the cart, return 0
  // Find the voucher in the cart
  const voucher = cart.find((ci) => (ci as VoucherDto)?.baseOption) as VoucherDto;

  // If there is no voucher, return 0
  if (!voucher) return 0;

  const minPrice = Math.min(...filteredCart.map((ci) => ci.price));
  if (voucher.type === 'percent') {
    if (!voucher.percentCut) throw new Error("Percent type voucher doesn't have percent cut");
    if (filteredCart.length === 0) return 0; // If there are no beverages in the cart, return 0

    // Percent cut vouchers are determined by the lowest priced beverage in the cart
    const percentCut = Math.floor(minPrice * (voucher.percentCut / 100));

    return percentCut;
  } else if (voucher.type === 'price') {
    // Price cut vouchers reduce the price of the cart by the price cut

    if (!voucher.priceCut) throw new Error("Price type voucher doesn't have price cut");
    return Math.min(voucher.priceCut, minPrice);
  } else if (voucher.type === 'beverage') {
    // Beverage vouchers have the price of the beverage they are redeemable for

    if (!voucher.beverageConfiguration) return 0;
    const beverage = filteredCart.find((v) => v.isFromVoucher);
    console.log('beverage for calculating voucher value', beverage, beverage?.price);
    return beverage?.price ?? 0;
  } else return 0;
};
