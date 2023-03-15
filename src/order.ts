export type OrderStatus = 'Running' | 'PickedUp' | 'Completed' | 'Queued';
export type Origin = 'Terminal' | 'App'; // TODO: try merge with voucher -> redeemingdevice
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
