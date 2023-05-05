import { DeviceState, IDevice } from './device';
import { Locale, LocalesExtended } from './locales';
export type DeviceType =
  | 'Robot'
  | 'CoffeeMachine_WMF9000s'
  | 'RippleMakerMkII'
  | 'PaymentTerminalDummy'
  | 'PaymentTerminalCastles'
  | 'PaymentTerminalAdyen'
  | 'Gate'
  | 'Scanner'
  | 'DisplayDevice'
  | 'CupHolder';
/**
 * Configuration of a box.
 *
 * This class controls the entire configuration of a unit. It contains the configuration of all devices, the box itself, the tax configuration and the opening hours.
 */
export interface BoxConfig {
  /**
   * The unique identifier of the box. Starts with two signed numbers and is followed by a dash and a random string.
   * These two numbers are derived from the box's location and also enable geo search for the app. When the box is moved, the id will change.
   */
  id: string;
  /**
   * Used on the terminal so that customers have a way to send feedback to the box owner.
   */
  NotificationEmails: string[];
  /**
   * Used on the terminal so that customers have a way to send feedback to the box owner.
   */
  NotificationPhones: string[];
  /**
   * Determines whether blinds shall be opened on box start
   */
  AutoBlinds: boolean;
  /**
   * The nice name of the box. Will be shown to customers.
   */
  name: string;
  /**
   * The city where the box is located.
   */
  city: string;
  /**
   * The zip code of the box.
   */
  zip: string;

  /**
   * The street where the box is located.
   */
  street: string;

  /**
   * The country where the box is located.
   */
  country: string;

  /**
   * Recipe matrix for the box. The numbers are the PLUs of the products.
   */
  recipe: string;

  /**
   * This is used by the telegram API to send messages to the hereby declared subscribers.
   * @format int64
   */
  telegramChatIds: number[];

  /**
   * The default language of the box. This will be used by the terminal to display the menu. It is also used to determine the language of the receipt.
   * @example "de"
   */
  defaultLanguageShort: Locale;

  /**
   * The date when the box was opened. Boxes with opening dates in the future will not be shown in the app.
   */
  openingDate: string;

  /**
   * Latitude of the box. Used to determine the distance to the box.
   * @example 48.123456
   * @minimum -90
   * @maximum 90
   * @multipleOf 0.000001
   * @format double
   */
  latitude: number;

  /**
   * Longitude of the box. Used to determine the distance to the box.
   * @example 11.123456
   * @minimum -180
   * @maximum 180
   * @multipleOf 0.000001
   * @format double
   */
  longitude: number;

  /**
   * The default language of the box. This will be used by the terminal to display the menu. It is also used to determine the language of the receipt.
   * @example "de-DE"
   */
  defaultLanguage: LocalesExtended;

  /**
   * The languages that are supported by the box. These options are available to the customer on the terminal.
   */
  languages: string[];

  /**
   * The opening hours of the box. This is used to determine whether the box is open or closed.
   */
  times: Record<
    'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday',
    { start: string; end: string }
  >;

  /**
   * The time zone of the box. This is used to determine the current time.
   * @example "Europe/Berlin"
   * @pattern ^[A-Za-z0-9_]+/[A-Za-z0-9_]+$
   */
  timeZone: string;

  /**
   * Current state of the box.
   * @example "Okay"
   */
  state?: BoxState;

  /**
   * All devices of the box.
   */
  devices: IDevice[];

  /**
   * The tax configuration of the box.
   */
  tax: TaxConfig;
}

/**
 * This class represents whether a box is connected or not. It is directly derived from the presence of the box in the MQTT broker.
 */
export interface IBoxPresence {
  /**
   * Timestamp of the last connection message. Unix epoch in milliseconds.
   * @format int64
   * @example 1600000000000
   * @minimum 0
   * @maximum 9999999999999
   * @multipleOf 1
   */
  timestamp: number;
  /**
   * The connection state as sent by the message broker
   */
  eventType: 'connected' | 'disconnected' | 'unknown';
  /**
   * Whether the box disconnected itself or not.
   * @example true
   */
  clientInitiatedDisconnect: boolean;
  /**
   * The reason for the disconnect.
   */
  disconnectReason: string;
}

/**
 * This class represents the current state of a box.
 */
export type BoxState =
  /** Application was started, but unit did not start production yet. */
  | 'NeverInitialized'
  /** Unit is in production. */
  | 'Okay'
  /** Unit is being maintained. */
  | 'Maintenance'
  /** Application is currently updating. */
  | 'Updating'
  /** Unit is currently paused. */
  | 'Paused'
  /** Unit will be paused. Waiting for current production to be finished. */
  | 'Pausing'
  /** Unit is currently restarting. */
  | 'Restarting'
  /** Unit is in an error state. */
  | 'FatalError';

export type ConnectionState = 'connected' | 'initiatedDisconnect' | '';

/**
 * Helper function for frontends to get a default color for a box state.
 * @param state @see BoxState
 * @returns A default color for the box state.
 */
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

/**
 * Tax configuration of a box.
 *
 * The tax config sets all the values needed to generate a receipt. It is also consumed by the erp app to generate the tax reports.
 */
export interface TaxConfig {
  /**
   * The name of the company.
   */
  name: string;
  /**
   * Name of the owner of the company. Some local authorities require that..
   */
  ownerName?: string;
  /**
   * The tax number of the company (VAT).
   * @example "DE123456789"
   */
  number: string;
  /**
   * The zip code of the company's adress.
   * @example "80331"
   */
  zip: string;
  /**
   * The city where the company  is located.
   * @example "Munich"
   */
  city: string;
  /**
   * The street where the company is located.
   * @example "Maximilianstrasse 1"
   */
  street: string;
  /**
   * The country where the company is located. Can be set to the local language, because it is only used to display the country name on the receipt.
   * @example "Deutschland"
   */
  country: string;
  /**
   * The currency of the box. This is used to display the currency on the receipt.
   * @example "EUR"
   // eslint-disable-next-line tsdoc/syntax
   * @pattern ^[A-Z]{3}$
   * @minLength 3
   * @maxLength 3
   */
  currency: string;
  /**
   * The tax rate of the box. This is used to calculate the tax amount on the receipt.
   * @format double
   * @minimum 0
   * @maximum 1
   * @multipleOf 0.000001
   * @example 0.19
   */
  rate: number;
  /**
   * The prefix of the receipt number. This is used to generate the receipt number. This is used when multiple number ranges are required.
   * @example "A"
   */
  receiptPrefix: string;
  /**
   * Used for adyen. The merchant id for the point of sale.
   */
  merchantIdPOS: string;
  /**
   * Used for adyen. The merchant id for the ecommerce.
   */
  merchantIdECOM: string;
  /**
   * Whether terminal and app should display the netto price or the brutto price.
   * @example true
   * @default false
   */
  isNetto?: boolean;
}

/**
 * This is a reduced representation of a box.
 *
 * This is used to display a box in a list. The values are stored directly in AWS IoT and can be fetched
 * from their API. Because of limitations in the AWS IoT API, only strings and a reduced number of properties are used.
 */
export interface IBox {
  /**
   * The id, and also the thing name of the box.
   */
  id: string;
  /**
   * The nice name of the box.
   */
  name?: string;
  /**
   * The country of the box.
   * @example "Deutschland"
   */
  country?: string;
  /**
   * The street where the company is located.
   * @example "Maximilianstrasse 1"
   */
  street?: string;
  /**
   * The city where the company  is located.
   * @example "Munich"
   */
  city?: string;
  /**
   * The name of the company.
   */
  company?: string;
}

/**
 * {@inheritdoc IBox}
 */
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
