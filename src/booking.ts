import { calculatePrice, TerminalOrder } from './order';
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
  constructor(beverage: BeverageConfiguration) {
    this.id = beverage.id;
    const date = new Date().toUTCString();
    this.createdAt = date;
    this.sum = beverage.price;
    this.image = beverage.printImage;
    this.product = beverage.productId;
    this.extra = beverage.extra;
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
  constructor(order: TerminalOrder, userId: string, boxId: string, currency: string, voucher: VoucherDto | undefined) {
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
      .map((b) => new BookingBeverage(b as BeverageConfiguration));
    this.usedCredit = order.usedCredit;
  }
}
