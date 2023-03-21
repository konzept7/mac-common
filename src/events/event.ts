import { DeviceType } from '../device';

export const codePrefix = (device: DeviceType) => {
  switch (device) {
    case 'CoffeeMachine_WMF9000s':
      return 'C';
    case 'RippleMakerMkII':
      return 'P';
    case 'Gate':
      return 'G';
    case 'PaymentTerminalDummy':
    case 'PaymentTerminalAdyen':
    case 'PaymentTerminalCastles':
      return 'F';
    case 'DisplayDevice':
    case 'Queue':
      return 'Q';
    case 'Terminal':
      return 'O';
    case 'Robot':
      return 'R';
    case 'Scanner':
      return 'S';
    case 'CupHolder':
      return 'B';
    default:
      return 'A';
  }
};

export enum EventSeverity {
  FatalError,
  InfoOnly,
  Warning,
  RestrictedProduction,
  ReducedCapacity,
}

export enum EventNotificationOption {
  FullBroadCast,
  Silent,
  FranchiseeBroadcast,
  OnDemand,
  AdminsOnly,
}

export enum EventAction {
  Restart, // restarts the device and waits 10 minutes
  Wait, // wait for 10 minutes
  Ignore, // ignore the event,  no action at all
  Notify, // notify franchisee, but do nothing else
  Error, // set the device to error, notify, but do nothing else
  Handle, // set the device to error and try to handle, notify, but do nothing else
  Disconnect, // disconnect the device,
  Reconnect, // reconnect the device and test the device after a few minutes,
  Initialize, // initialize the device
  StopProduction, // stop application entirely
}

export enum SharedEventCodes {
  RestartRequested = '1500',
  TestRequested = '1501',
  ManualShutDown = '1502',
  ManualDisable = '1503',
  ManualOpen = '1504',
  ManualEnable = '1506',
  NoConnection = '2000',
  StartupFailed = '2001',
  SingleJobFailed = '2002',
  MultipleJobsFailed = '2003',
  UnknownResponse = '2004',
  JobTimeout = '2006',
  ThrowAwayOrderAndReproduce = '2005',
  CommunicationError = '2009',
  NoCupInDevice = '2200',
  UnknownError = '3000',
  AllDevicesOfThisTypeInError = '8000',
  MoreThanHalfOfThisTypeInError = '8001',
}

export interface EventTemplate {
  Device: DeviceType;
  Code: string;
  Severity: EventSeverity;
  NotificationOption: EventNotificationOption;
  Action: EventAction;
  IsSettingDeviceToErrorImmediately: boolean;
  IsStoppingProduction: boolean;
  AutoRetryTimes: number;
  AutoRetryInterval: number;
  Description: string;
  StepsToResolve: Array<string>;
}
