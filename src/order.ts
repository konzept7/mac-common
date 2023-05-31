import { BeverageConfiguration } from './product';
import { calculateVoucherValue, VoucherDto } from './voucher';

/**
 * Queued: order is in the queue, production pending
 * Running: order is being produced
 * Completed: order is completed and ready to be picked up
 * PickedUp: order is picked up by the user
 */
export type OrderStatus = 'Booked' | 'Running' | 'PickedUp' | 'Completed' | 'Queued' | 'Failed';
/**
 * Terminal: order was created by the terminal
 * App: order was created by the app
 */
export type Origin = 'Terminal' | 'App';
/**
 * Orders as sent to the MQTT broker. Special interface because only primitive values are allowed.
 * Extra field is a string of numbers separated by #.
 */
export interface ILiveOrder {
  /** The ID of the order. */
  id: string;

  /** The ID of the device that is currently producing the order. */
  currentDevice: string;

  /** The ID of the box where the order was placed. */
  box: string;

  /** The status of the order. */
  status: OrderStatus;

  /** The product PLU. */
  product: number;

  /** The extra ingredients. */
  extra: string;

  /** The timestamp of order creation. */
  createdAt: number;

  /** Whether the order was created by the terminal or the app. */
  type: Origin;

  /** Whether the order has a print. */
  hasPrint: boolean;
}

/**
 * Represents a live order.
 */
export class LiveOrder {
  /**
   * Creates a new instance of the `LiveOrder` class.
   * @param liveOrder The live order data.
   */
  constructor(liveOrder: ILiveOrder) {
    this.id = liveOrder.id;
    this.currentDevice = liveOrder.currentDevice;
    this.box = liveOrder.box;
    this.status = liveOrder.status;
    this.product = liveOrder.product;
    this.extra = liveOrder.extra
      .split('#')
      .filter((s) => s.length > 0)
      .map((e) => parseInt(e, 10));
    this.createdAt = new Date(liveOrder.createdAt * 1000);
    this.type = liveOrder.type;
    this.hasPrint = liveOrder.hasPrint;
  }

  /** The ID of the order. */
  id: string;

  /** The ID of the device that is currently producing the order. */
  currentDevice: string;

  /** The ID of the box where the order was placed. */
  box: string;

  /** The status of the order. */
  status: OrderStatus;

  /** The product PLU. */
  product: number;

  /** The extra ingredients. */
  extra: number[];

  /** The timestamp of order creation. */
  createdAt: Date;

  /** Whether the order was created by the terminal or the app. */
  type: Origin;

  /** Whether the order has a print. */
  hasPrint: boolean;
}

/**
 * Represents an order created by the terminal.
 */
export class TerminalOrder {
  /** The ID of the order. */
  id!: string;

  /** The beverages included in the order. */
  beverages!: (BeverageConfiguration | VoucherDto)[];

  /** The name of the person picking up the order. */
  pickupName!: string;

  /** The price of the order in cents. */
  priceInCent!: number;

  /** The QR code associated with the order, if applicable. */
  qr: string | undefined;

  /** Whether the order is instant. */
  isInstant = true;

  /** The type of the order. */
  type = 'Terminal';

  /** The voucher associated with the order, if applicable. */
  voucher: VoucherDto | undefined;

  /** The amount of credit used by the voucher, if applicable. */
  usedCredit = 0;

  /**
   * Creates a new instance of the `TerminalOrder` class.
   * @param id The ID of the order.
   * @param beverages The beverages included in the order.
   * @param pickupName The name of the person picking up the order.
   * @param voucher The voucher associated with the order, if applicable.
   */
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
