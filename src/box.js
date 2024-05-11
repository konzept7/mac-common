/**
 * @typedef {'Robot' | 'CoffeeMachine_WMF9000s' | 'RippleMakerMkII' | 'PaymentTerminalDummy' | 'PaymentTerminalCastles' | 'PaymentTerminalAdyen' | 'Gate' | 'Scanner' | 'DisplayDevice' | 'CupHolder'} DeviceType
 */

/**
 * @typedef {Object} OpeningTimesDay
 * @property {string|null} [start] - The start time.
 * @property {string|null} [end] - The end time.
 */

/**
 * @typedef {Object} OpeningTimes
 * @property {OpeningTimesDay} [Monday]
 * @property {OpeningTimesDay} [Tuesday]
 * @property {OpeningTimesDay} [Wednesday]
 * @property {OpeningTimesDay} [Thursday]
 * @property {OpeningTimesDay} [Friday]
 * @property {OpeningTimesDay} [Saturday]
 * @property {OpeningTimesDay} [Sunday]
 */

/**
 * Represents the configuration of a box, including all devices, tax configuration, and opening hours.
 * @typedef {Object} BoxConfig
 * @property {string} id - The unique identifier of the box.
 * @property {string[]} NotificationEmails - Emails for sending feedback.
 * @property {string[]} NotificationPhones - Phone numbers for sending feedback.
 * @property {boolean} AutoBlinds - Determines if blinds should open on start.
 * @property {string} name - The friendly name of the box.
 * @property {string} city - The city where the box is located.
 * @property {string} zip - The zip code of the box.
 * @property {string} street - The street where the box is located.
 * @property {string} country - The country where the box is located.
 * @property {string} recipe - Recipe matrix for the box.
 * @property {number[]} telegramChatIds - IDs for telegram API messaging.
 * @property {Locale} defaultLanguageShort - The default language (short form).
 * @property {string} openingDate - The date when the box was opened.
 * @property {number} latitude - Latitude of the box.
 * @property {number} longitude - Longitude of the box.
 * @property {LocaleExtended} defaultLanguage - The default language (extended form).
 * @property {string[]} languages - Supported languages by the box.
 * @property {OpeningTimes} times - The opening hours of the box.
 * @property {string} timeZone - The time zone of the box.
 * @property {BoxState} [state] - Current state of the box.
 * @property {IDevice[]} devices - All devices of the box.
 * @property {TaxConfig} tax - The tax configuration of the box.
 */

/**
 * Represents whether a box is connected or not, based on the MQTT broker's presence.
 * @typedef {Object} IBoxPresence
 * @property {number} timestamp - Timestamp of the last connection message.
 * @property {'connected' | 'disconnected' | 'unknown'} eventType - The connection state.
 * @property {boolean} clientInitiatedDisconnect - Whether disconnect was initiated by the client.
 * @property {string} disconnectReason - The reason for disconnect.
 */

/**
 * Represents the current state of a box.
 * @typedef {'NeverInitialized' | 'Okay' | 'Maintenance' | 'Updating' | 'Paused' | 'Pausing' | 'Restarting' | 'FatalError'} BoxState
 */

/**
 * Represents the connection state.
 * @typedef {'connected' | 'initiatedDisconnect' | ''} ConnectionState
 */

/**
 * Helper function to get a default color for a box state.
 * @function
 * @param {BoxState|null|undefined} state - The state of the box.
 * @returns {string} The default color for the given state.
 */
function boxStateToColor(state) {
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
 * Represents the tax configuration of a box.
 * @typedef {Object} TaxConfig
 * @property {string} name - The name of the company.
 * @property {string} [ownerName] - The owner's name.
 * @property {string} number - The tax number of the company.
 * @property {string} zip - The company's zip code.
 * @property {string} city - The company's city.
 * @property {string} street - The company's street.
 * @property {string} country - The company's country.
 * @property {string} currency - The currency of the box.
 * @property {number} rate - The tax rate of the box.
 * @property {string} receiptPrefix - The prefix of the receipt number.
 * @property {string} merchantIdPOS - Merchant ID for POS.
 * @property {string} merchantIdECOM - Merchant ID for e-commerce.
 * @property {boolean} [isNetto] - Whether to display net or gross price.
 */

/**
 * A reduced representation of a box, used for display in lists.
 * @typedef {Object} IBox
 * @property {string} id - The ID and thing name of the box.
 * @property {string} [name] - The friendly name of the box.
 * @property {string} [country] - The country of the box.
 * @property {string} [street] - The street of the box's location.
 * @property {string} [city] - The city of the box's location.
 * @property {string} [company] - The name of the company.
 */

/**
 * {@inheritdoc IBox}
 */
class BoxReduced {
  /**
   * @param {string} id - The box ID.
   * @param {string} [name] - The friendly name of the box.
   * @param {string} [country] - The country where the box is located.
   * @param {string} [street] - The street of the box.
   * @param {string} [city] - The city of the box.
   * @param {string} [company] - The company name.
   * @param {BoxState} [state] - The state of the box.
   * @param {string} [hierarchyId] - The hierarchy ID.
   */
  constructor(id, name, country, street, city, company, state, hierarchyId) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.street = street;
    this.city = city;
    this.company = company;
    this.state = state;
    this.hierarchyId = hierarchyId;
  }
}
