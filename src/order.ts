import { BeverageConfiguration } from './product';
import { VoucherDto } from './voucher';

/**
 * Queued: order is in the queue, production pending
 * Running: order is being produced
 * Completed: order is completed and ready to be picked up
 * PickedUp: order is picked up by the user
 */
export type OrderStatus = 'Running' | 'PickedUp' | 'Completed' | 'Queued';
/**
 * Terminal: order was created by the terminal
 * App: order was created by the app
 */
export type Origin = 'Terminal' | 'App';

/**
 * Orders as sent to the MQTT broker. Special interface because only primitive values are allowed.
 * Extra field is a string of numbers separated by #.
 *
 * @param id - id of the order
 * @param currentDevice - id of the device that is currently producing the order
 * @param box - id of the box where the order was placed
 * @param status - status of the order
 * @param product - product PLU
 * @param extra - extra ingredients
 * @param createdAt - timestamp of order creation
 * @param type - whether the order was created by the terminal or the app
 * @param hasPrint - whether the order has a print
 */
export interface ILiveOrder {
  id: string;
  currentDevice: string;
  box: string;
  status: OrderStatus;
  product: number;
  extra: string;
  createdAt: number;
  type: Origin;
  hasPrint: boolean;
}

export class LiveOrder {
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

  id: string;
  currentDevice: string;
  box: string;
  status: OrderStatus;
  product: number;
  extra: number[];
  createdAt: Date;
  type: Origin;
  hasPrint: boolean;
}
export class TerminalOrder {
  id!: string;
  beverages!: (BeverageConfiguration | VoucherDto)[];
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
