import { BeverageConfiguration } from './product';
import { VoucherDto } from './voucher';

export class BookingBeverage {
  /**
   * @
   */
  id!: string;
  lockedAt!: string;
  createdAt!: string;
  product!: number;
  extra!: number[];
  isFree = false;
  image: string | undefined;
  sum!: number;
  constructor(beverage: BeverageConfiguration, boxId: string, currency: string) {
    this.id = beverage.id;
    const date = new Date().toUTCString();
    this.createdAt = date;
    this.sum = beverage.price;
    this.image = beverage.printImage;
    this.product = beverage.productId;
    this.extra = beverage.extra;
  }
}
export class Order {
  id!: string;
  beverages!: Array<BeverageConfiguration | VoucherDto>;
  pickupName!: string;
  priceInCent!: number;
  qr: string | undefined;
  isInstant = true;
  type = 'Terminal';
  voucher: VoucherDto | undefined;
  usedCredit = 0;

  constructor(
    id: string,
    beverages: (BeverageConfiguration | VoucherDto)[],
    pickupName: string,
    voucher: VoucherDto | undefined,
  ) {
    const u = voucher ? [...beverages, voucher] : beverages;

    this.id = id;
    this.beverages = beverages;
    this.priceInCent = calculatePrice(u);
    this.pickupName = pickupName;
    this.voucher = voucher;
    this.usedCredit = calculateVoucherValue(u);
  }
}
export class BookingOrder {
  id!: string;
  currency!: string;
  boxId!: string;
  userId!: string;
  products!: BookingBeverage[];
  chargedAmount!: number;
  usedCredit = 0;
  paidAt!: string;
  createdAt!: string;
  sum!: number;
  constructor(order: Order, userId: string, boxId: string, currency: string, voucher: VoucherDto | undefined) {
    const u = voucher ? [...order.beverages, voucher] : order.beverages;

    this.id = order.id;
    this.userId = userId;
    this.paidAt = new Date().toUTCString();
    this.createdAt = this.paidAt;
    this.sum = calculatePrice(u);
    this.chargedAmount = this.sum;
    this.currency = currency;
    this.boxId = boxId;
    this.products = order.beverages
      .filter((b) => (b as BeverageConfiguration)?.productId)
      .map((b) => new BookingBeverage(b as BeverageConfiguration, boxId, currency));
    this.usedCredit = order.usedCredit;
  }
}

export const calculatePrice = (cart: (BeverageConfiguration | VoucherDto)[]): number => {
  const priceInCents = cart.reduce((pv, cv) => {
    if ((cv as BeverageConfiguration)?.productId) {
      const b = cv as BeverageConfiguration;
      pv += Math.floor(b.price * 100);
    }
    return pv;
  }, 0);

  const voucherValue = calculateVoucherValue(cart);
  console.log('voucher value', voucherValue);
  const price = priceInCents / 100 - voucherValue;
  return price < 0 ? 0 : price;
};

export const calculateVoucherValue = (cart: (BeverageConfiguration | VoucherDto)[]): number => {
  const filteredCart = cart.filter((cv) => (cv as BeverageConfiguration)?.productId) as Array<BeverageConfiguration>;
  const voucher = cart.find((ci) => (ci as VoucherDto)?.baseOption) as VoucherDto;
  console.log('calculating voucher value', filteredCart, voucher);
  if (!voucher) return 0;
  if (voucher.type === 'percent') {
    if (filteredCart.length === 0) return 0;
    const minPrice = Math.min(...filteredCart.map((ci) => ci.price));
    const percentCut = Math.floor(minPrice * (voucher.percentCut! / 100));
    console.log('percent cut', percentCut);
    return percentCut;
  } else if (voucher.type === 'price') {
    return voucher.priceCut!;
  } else if (voucher.type === 'beverage') {
    if (!voucher.beverageConfiguration) return 0;
    const beverage = filteredCart.find((v) => v.isFromVoucher);
    console.log('beverage for calculating voucher value', beverage, beverage?.price);
    return beverage?.price ?? 0;
  } else return 0;
};
