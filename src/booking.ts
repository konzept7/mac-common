import { calculatePrice, TerminalOrder } from './order';
import { BeverageConfiguration } from './product';
import { VoucherDto } from './voucher';

/**
 * Booking beverages are single drink items of a booking order.
 *
 * @see BookingOrder
 * @see BeverageConfiguration
 */
export class BookingBeverage {
  /** Unique ID of the drink */
  id!: string;
  /** When the drink was scanned on site. Same as creation date for terminal orders. */
  lockedAt!: string;
  /** When the order itself was created. */
  createdAt!: string;
  /** The product PLU of the drink. */
  product!: number;
  /** Specials like extra shots or syrups. */
  extra!: number[];
  /** Whether the drink was free of charge. */
  isFree = false;
  /** The unique identifier for the optional selected print image. */
  image: string | undefined;
  /** Charged amount for this drink, including the extras. */
  sum!: number;

  /** Constructs a booking beverage from a given configuration. @see BeverageConfiguration */
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

/**
 * Booking orders derive from terminal orders and are consumed by the receipt service as well as the ERP api.
 *
 * @see TerminalOrder
 */
export class BookingOrder {
  /** Unique ID of the order. */
  id!: string;
  /** Used currency for ordering. */
  currency!: string;
  /** Unique ID of the unit where the order is placed. */
  boxId!: string;
  /** ID of the user that ordered the drink. Randomly generated for terminal users without any possibility to identify the customer. */
  userId!: string;
  /** Array of single drinks in this order.
   * @see BookingBeverage */
  products!: BookingBeverage[];
  /** What the customer had to pay. This always includes taxes. */
  chargedAmount!: number;
  /** The given discount of the order. Might be deducted from the customers balance. */
  usedCredit = 0;
  /** Payment date. String for easier exchange with backend APIs.
   * @format date-time
   */
  paidAt!: string;
  /** Order creation date. String for easier exchange with backend APIs
   * @format date-time
   */
  createdAt!: string;
  /**
   * Sum of all individual drinks. This only includes taxes if the isNetto flag of the box is not set or set to false.
   * @see TaxConfig
   */
  sum!: number;

  /**
   * Constructs a booking order from a terminal order.
   * @param order - Order as created by the terminal app.
   * @param userId - ID of the user that ordered the drink.
   * @param boxId - Unique ID of the unit where the order is placed.
   * @param currency - Used currency for ordering.
   * @param voucher - Voucher that will be used for this order.
   */
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
