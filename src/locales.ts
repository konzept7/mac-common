/**
 * Available front-end locales.
 */
export type Locale = 'en' | 'fr' | 'de' | 'es';

/**
 * Available regional locales.
 */
export type LocaleExtended = 'en-US' | 'fr-FR' | 'de-DE' | 'es-ES' | 'de-AT';

export function toLocale(localeExtended: LocaleExtended | Locale | string): Locale {
  // regex to see if the locale is extended or not
  const regex = /^([a-zA-Z]{2})(-[a-zA-Z]{2})?$/;
  const match = regex.exec(localeExtended);
  if (match) {
    return match[1] as Locale;
  } else {
    throw new Error('invalid locale');
  }
}
