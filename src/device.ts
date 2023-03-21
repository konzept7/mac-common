/**
 * Side of the device (Front of House), used to determine the shortest path for the robot.
 */
export type Side = 'Center' | 'L' | 'R';

/**
 * All states that a device can be in.
 */
export type DeviceState = 'ShutDown' | 'Available' | 'ProcessingJob' | 'JobDone' | 'Error' | 'Maintenance' | 'Disabled';
export type DeviceType =
  | 'Robot'
  | 'CoffeeMachine_WMF9000s'
  | 'RippleMakerMkII'
  | 'PaymentTerminalDummy'
  | 'PaymentTerminalAdyen'
  | 'PaymentTerminalCastles'
  | 'Terminal'
  | 'Queue'
  | 'Gate'
  | 'Scanner'
  | 'DisplayDevice'
  | 'CupHolder'
  | 'IceMachine';

/**
 * All interfaces that the device implements. It is used by several frontends to determine which actions are available.
 */
export type DeviceInterface =
  | 'ICoffeeMachine'
  | 'IWebsocketDevice'
  | 'IConnectableDevice'
  | 'IDevice'
  | 'INotifyPropertyChanged'
  | 'IPrinter'
  | 'IRefillableDevice'
  | 'IRestartableDevice'
  | 'ITrashableDevice'
  | 'IRobotAccessibleDevice'
  | 'IHttpDevice'
  | 'IJobTimeoutDevice'
  | 'IPaymentTerminal'
  | 'IMaintainableDevice'
  | 'IGate'
  | 'ITcpServerDevice'
  | 'IInitializingDevice'
  | 'IScanner'
  | 'IUsbDevice'
  | 'IDisplayDevice'
  | 'ISshDevice'
  | 'ITcpClientDevice'
  | 'IRobot';

/**
 * This interface represents a device.
 *
 * All devices that can be connected from the server or reached by the robot shall be represented by this interface.
 */
export interface IDevice {
  /**
   * The type of the device. This is the same as the type in the device configuration.
   * @example "CoffeeMachine_WMF9000s"
   */

  $type: DeviceType;
  /**
   * The exact type of the device. This is used by MyAppCafeServer to deserialize the device configuration.
   * @example "MyAppCafeServer.Model.Devices.CoffeeMachine_WMF9000s"
   */
  $fulltype: string;
  /**
   * All interfaces that the device implements. It is used by several frontends to determine which actions are available.
   */
  $interfaces: DeviceInterface[];
  /**
   * Serial number of the device.
   */
  SerialNumber: string;
  /**
   * The name of the device. This is used to identify the device in the frontend.
   */
  Nicename: string;
  /**
   * Side of the device (Front of House), used to determine the shortest path for the robot.
   */
  Side?: Side;
  /**
   * Current state of the device.
   * @example "Available"
   * @default "ShutDown"
   */
  State: DeviceState;
  /**
   * Port of the device. This is used to connect to the device.
   */
  Port?: number;
  /**
   * IP address or hostname of the device. This is used to connect to the device.
   */
  Hostname?: string;
  /**
   * All jobs that have been processed in the current session.
   * @format int32
   * @minimum 0
   */
  ProcessedJobsCount?: number;
  /**
   * The estimated number of units that are left in the device.
   * This is used to determine when the device needs to be refilled.
   * @format int32
   * @minimum 0
   * @default 0
   */
  RemainingUnitsEstimate?: number;

  /**
   * Remaining units estimate will be set to this value after a refill.
   * @format int32
   * @minimum 0
   */
  UnitsAfterRefill?: number;
  /**
   * If true, the device will be refilled on maintenance.
   * @default false
   */
  IsAlwaysRefilledOnMaintenance?: boolean;
  /**
   * Used to construct a robot command. This will be the starting location when picking up a cup from the device.
   * @format int32
   * @minimum 0
   * @maximum 99
   * @pattern ^[0-9]{1,2}$
   */
  BeforeJobRobotPosition?: string;
  /**
   * Used to construct a robot command. This will be the end location when putting a cup into the device.
   * @format int32
   * @minimum 0
   * @maximum 99
   * @pattern ^[0-9]{1,2}$
   */
  AfterJobRobotPosition?: string;
}

/**
 * This interface represents a device that is refilled. Devices that implement this interface
 * can be selected on the maintenance screen for refilling.
 */
export interface IRefillableDevice extends IDevice {
  /**
   * The estimated number of units that are left in the device.
   * This is used to determine when the device needs to be refilled.
   * @format int32
   * @minimum 0
   * @default 0
   */
  processedJobsCount: number;
  /**
   * The estimated number of units that are left in the device.
   * This is used to determine when the device needs to be refilled.
   * @format int32
   * @minimum 0
   * @default 0
   */
  remainingUnitsEstimate: number;
  /**
   * Remaining units estimate will be set to this value after a refill.
   * @format int32
   * @minimum 0
   */
  unitsAfterRefill: number;
  /**
   * If true, the device will be refilled on maintenance.
   * @default false
   */
  isAlwaysRefilledOnMaintenance: boolean;
}

/**
 * Helper function to convert a device state to a color.
 * @param state The device state.
 * @returns The color.
 */
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

/**
 * A message as sent by the AWS IoT MQTT Broker.
 *
 * This message is sent when a device changes its state. It is used to update the device state in the frontend.
 */
export interface IDeviceUpdateMessage {
  /**
   * The serial number of the device.
   */
  device: string;
  /**
   * The new state of the device.
   * @example "Available"
   */
  state: DeviceState;
  /**
   * The number of processed jobs in the current session.
   */
  processedJobsCount: number;
  /**
   * The estimated number of units that are left in the device.
   * This is used to determine when the device needs to be refilled.
   * @format int32
   * @minimum 0
   */
  unitsRemaining: number;
  /**
   * The timestamp of the message. Unix timestamp in milliseconds.
   * @format int64
   * @minimum 0
   * @example 1580000000000
   * @default 0
   */
  timestamp: number;
}
