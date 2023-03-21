enum Device {
  MainServer = 'MainServer',
  Coffeemachine = 'Coffeemachine',
  Printer = 'Printer',
  Gate = 'Gate',
  Payment = 'Payment',
  Queue = 'Queue',
  Terminal = 'Terminal',
  Robot = 'Robot',
  Scanner = 'Scanner',
  CupHolder = 'CupHolder',
}

const codePrefix = (device: Device) => {
  switch (device) {
    case Device.MainServer:
      return 'A';
    case Device.Coffeemachine:
      return 'C';
    case Device.Printer:
      return 'P';
    case Device.Gate:
      return 'G';
    case Device.Payment:
      return 'F';
    case Device.Queue:
      return 'Q';
    case Device.Terminal:
      return 'O';
    case Device.Robot:
      return 'R';
    case Device.Scanner:
      return 'S';
    case Device.CupHolder:
      return 'B';

    default:
      throw new Error('prefix for key ' + device + ' not known');
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
  Device: Device;
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
