import { BeverageConfigurationBase } from './productConfiguration';

export type VoucherBaseOption = 'onetime' | 'promo';

export type VoucherType = 'percent' | 'price' | 'beverage';

export type VoucherState = 'valid' | 'cancelled' | 'expired' | 'redeemed';

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

export interface VoucherConfiguration {
  numberOfVouchers: number;
  id: string;
  boxId: string;
  creationDate: Date;
  baseOption: VoucherBaseOption;
  type: VoucherType;
  expiryDate?: Date;
  tag1?: string;
  tag2?: string;
  tag3?: string;
  priceCut: number;
  percentCut: number;
  beverageConfiguration?: BeverageConfigurationBase;
}

export type RedeemingDevice = 'app' | 'terminal';
export class VoucherDto {
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

export class VoucherConfigurationDto extends VoucherDto {
  numberOfVouchers!: number;
}
export class VoucherUsageDto {
  id!: string;
  userId!: string;
  redeemingDevice!: RedeemingDevice;
  redemptionDate!: Date;
  usedCredit = 0;
}
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
