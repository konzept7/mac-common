/**
 * Available front-end locales.
 * @typedef {'en' | 'fr' | 'de' | 'es'} Locale
 */

/**
 * Available regional locales.
 * @typedef {'en-US' | 'fr-FR' | 'de-DE' | 'es-ES' | 'de-AT'} LocaleExtended
 */

/**
 * Transforms a locale extended to a locale.
 * @function
 * @param {LocaleExtended | Locale | string} localeExtended The locale extended.
 * @returns {Locale} The two character locale.
 * @throws Will throw an error if the locale is invalid.
 */
function toLocale(localeExtended) {
  // regex to see if the locale is extended or not
  const regex = /^([a-zA-Z]{2})(-[a-zA-Z]{2})?$/;
  const match = regex.exec(localeExtended);
  if (match) {
    return match[1].toLowerCase();
  } else {
    throw new Error('invalid locale');
  }
}
