import { ILiveOrder } from '../order';

export const sampleLiveOrder1: ILiveOrder = {
  id: 'AttXjIb1EM',
  currentDevice: 'CupTrayLeft500_1',
  box: '61_-72-95HJV7',
  status: 'Running',
  product: 1503,
  extra: '2013',
  createdAt: 1646172426,
  type: 'Terminal',
  hasPrint: false,
};

export const sampleLiveOrder2: ILiveOrder = {
  id: 'AttXjIb2EM',
  currentDevice: 'CupTrayLeft500_1',
  box: '61_-72-95HJV7',
  status: 'Completed',
  product: 301,
  extra: '2013#211',
  createdAt: 1646212426,
  type: 'Terminal',
  hasPrint: false,
};

export const sampleLiveOrder3: ILiveOrder = {
  id: 'AttXjIb3EM',
  currentDevice: 'CupTrayLeft500_1',
  box: '61_-72-95HJV7',
  status: 'PickedUp',
  product: 1303,
  extra: '2013',
  createdAt: 1646192426,
  type: 'App',
  hasPrint: false,
};

export const sampleLiveOrder4: ILiveOrder = {
  id: 'AttXjIb4EM',
  currentDevice: 'CupTrayLeft500_1',
  box: '61_-72-95HJV7',
  status: 'Queued',
  product: 603,
  extra: '2013',
  createdAt: 1646232426,
  type: 'Terminal',
  hasPrint: true,
};
