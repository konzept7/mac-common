import { DeviceState } from './device';
import { BoxState } from './box';
import { Locale } from './locales';
import { DeProducts, EnProducts, EsProducts, FrProducts, ProductTranslation, TranslationFile } from './plu';
import i18n from 'i18next';

import de from './locales/de.json';
import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';

export const resources = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
  fr: {
    translation: fr,
  },
  es: {
    translation: es,
  },
} as const;

i18n.init({
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  fallbackLng: 'de',
  resources,
});

export const productTranslations: Record<Locale, TranslationFile> = {
  de: DeProducts,
  en: EnProducts,
  fr: FrProducts,
  es: EsProducts,
};

export function getProduct(PLU: number, locale: Locale): ProductTranslation | null {
  const directTranslation = productTranslations[locale][PLU];
  if (directTranslation) {
    return {
      name: directTranslation.name,
      description: directTranslation.description,
      img: directTranslation.img,
    };
  }
  const mod = PLU % 50;

  if (mod === 0 && locale === 'de') {
    console.error(`PLU ${PLU} does neither exist in requested locale nor in German master.`);
    throw new Error(`PLU ${PLU} does neither exist in requested locale nor in German master.`);
  }

  const base = PLU - mod;
  const baseTranslation = productTranslations[locale][base];
  if (baseTranslation) {
    return {
      name: baseTranslation.name,
      description: baseTranslation.description,
      img: baseTranslation.img,
    };
  }
  throw new Error(`PLU ${PLU} does neither exist in requested locale nor in German master.`);
}

export function translateDeviceState(locale: Locale, state?: DeviceState): string {
  return i18n.t(`deviceStates.${state ?? 'Unknown'}`, { lng: locale });
}

export function translateServerState(locale: Locale, state?: BoxState): string {
  return i18n.t(`serverStates.${state ?? 'Unknown'}`, {
    lng: locale,
  });
}

export function translateDevice(locale: Locale, device: string): string {
  return i18n.t(`deviceTypes.${device}`, { lng: locale });
}

export function translateGoods(locale: Locale, goods: string): string {
  return i18n.t(`goods.${goods}`, { lng: locale });
}
