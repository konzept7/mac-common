import { describe, expect, it, test } from 'vitest';
import { ILiveOrder, LiveOrder } from './order';
import { sampleLiveOrder1, sampleLiveOrder2, sampleLiveOrder3, sampleLiveOrder4 } from './sample-data/sampleOrders';

describe('testing order constructor', () => {
  it('should create a new order', () => {
    const order = {
      id: 'test',
      currentDevice: 'test',
      box: 'test',
      status: 'Running',
      product: 1,
      extra: '1#2#3',
      createdAt: 1,
      type: 'Terminal',
      hasPrint: false,
    } as ILiveOrder;
    const o = new LiveOrder(order);
    expect(o.id).toBe('test');
    expect(o.currentDevice).toBe('test');
    expect(o.box).toBe('test');
    expect(o.status).toBe('Running');
    expect(o.product).toBe(1);
    expect(o.extra).toEqual([1, 2, 3]);
    expect(o.createdAt).toEqual(new Date(1000));
    expect(o.type).toBe('Terminal');
    expect(o.hasPrint).toBe(false);
  });

  test('should create order from sample orders without throwing', () => {
    const l1 = sampleLiveOrder1;
    const l2 = sampleLiveOrder2;
    const l3 = sampleLiveOrder3;
    const l4 = sampleLiveOrder4;
    const o1 = new LiveOrder(l1);
    const o2 = new LiveOrder(l2);
    const o3 = new LiveOrder(l3);
    const o4 = new LiveOrder(l4);
    expect(o1.id).toBe('AttXjIb1EM');
    expect(o2.id).toBe('AttXjIb2EM');
    expect(o3.id).toBe('AttXjIb3EM');
    expect(o4.id).toBe('AttXjIb4EM');
  });
});
