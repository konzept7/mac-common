export interface IDevice {
  $type: string;
  $fulltype: string;
  $interfaces: string[];
  SerialNumber: string;
  Nicename: string;
  Side?: Side;
  State: DeviceState;
  Port?: number;
  Hostname?: string;
  ProcessedJobsCount?: number;
  RemainingUnitsEstimate?: number;
  UnitsAfterRefill?: number;
  IsAlwaysRefilledOnMaintenance?: boolean;
  BeforeJobRobotPosition?: string;
  AfterJobRobotPosition?: string;
}

export interface BoxConfig {
  id: string;
  NotificationEmails: string[];
  NotificationPhones: string[];
  AutoBlinds: boolean;
  name: string;
  city: string;
  zip: string;
  street: string;
  country: string;
  recipe: string;
  telegramChatIds: number[];
  defaultLanguageShort: string;
  openingDate: string;
  latitude: number;
  longitude: number;
  defaultLanguage: string;
  languages: string[];
  times: Record<
    'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday',
    { start: string; end: string }
  >;
  timeZone: string;
  state?: BoxState;
  devices: IDevice[];
  tax: TaxConfig;
}

export interface IBoxPresence {
  timestamp: number;
  eventType: 'connected' | 'disconnected' | 'unknown';
  clientInitiatedDisconnect: boolean;
  disconnectReason: string;
}

export type Side = 'Center' | 'L' | 'R';
export type DeviceState = 'ShutDown' | 'Available' | 'ProcessingJob' | 'JobDone' | 'Error' | 'Maintenance' | 'Disabled';
export type BoxState =
  | 'NeverInitialized'
  | 'Okay'
  | 'Maintenance'
  | 'Updating'
  | 'Paused'
  | 'Pausing'
  | 'Restarting'
  | 'FatalError';
export type ConnectionState = 'connected' | 'initiatedDisconnect' | '';

export function boxStateToColor(state: BoxState | undefined | null) {
  switch (state) {
    case 'FatalError':
      return 'red';
    case 'Okay':
      return 'green';
    case 'Maintenance':
    case 'Paused':
    case 'Pausing':
      return 'yellow';
    case 'NeverInitialized':
    case 'Updating':
    case 'Restarting':
      return 'blue';
    default:
      return 'grey';
  }
}

export function deviceStateToColor(state: DeviceState) {
  switch (state) {
    case 'Available':
    case 'ProcessingJob':
    case 'JobDone':
      return 'green';
    case 'Disabled':
    case 'ShutDown':
      return 'gray';
    case 'Error':
      return 'red';
    case 'Maintenance':
      return 'yellow';
    default:
      return 'blue';
  }
}

export interface IRefillableDevice extends IDevice {
  processedJobsCount: number;
  remainingUnitsEstimate: number;
  unitsAfterRefill: number;
  isAlwaysRefilledOnMaintenance: boolean;
}

export interface TaxConfig {
  name: string;
  number: string;
  zip: string;
  city: string;
  street: string;
  country: string;
  currency: string;
  rate: number;
  receiptPrefix: string;
  merchantIdPOS: string;
  merchantIdECOM: string;
}

export interface IBox {
  id: string;
  name?: string;
  country?: string;
  street?: string;
  city?: string;
  company?: string;
}

export class BoxReduced implements IBox {
  constructor(
    id: string,
    name?: string,
    country?: string,
    street?: string,
    city?: string,
    company?: string,
    state?: BoxState | undefined,
  ) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.street = street;
    this.city = city;
    this.company = company;
    this.state = state;
  }

  id: string;
  name?: string;
  country?: string;
  street?: string;
  city?: string;
  company?: string;
  state?: BoxState | undefined;
}

export interface IDeviceUpdateMessage {
  device: string;
  state: DeviceState;
  processedJobsCount: number;
  unitsRemaining: number;
  timestamp: number;
}
