import { DeviceState } from './device';
import { BoxState } from './box';
import { Locale, LocaleExtended, toLocale } from './locales';
import { DeProducts, EnProducts, EsProducts, FrProducts, ProductTranslation, TranslationFile } from './plu';
import i18n from 'i18next';

import de from './locales/de.json';
import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import { JobDescription, JobStatus } from './jobs/job';

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

export function getProduct(PLU: number, locale: Locale | LocaleExtended): ProductTranslation | null {
  locale = toLocale(locale);
  if (!(locale in productTranslations)) {
    throw new Error(`Locale ${locale} not supported.`);
  }

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
  return null;
}

export function translateDeviceState(locale: Locale | LocaleExtended, state?: DeviceState): string {
  return i18n.t(`deviceStates.${state ?? 'Unknown'}`, { lng: toLocale(locale) });
}

export function translateServerState(locale: Locale | LocaleExtended, state?: BoxState): string {
  return i18n.t(`serverStates.${state ?? 'Unknown'}`, {
    lng: toLocale(locale),
  });
}

export function translateDevice(locale: Locale | LocaleExtended, device: string): string {
  return i18n.t(`deviceTypes.${device}`, { lng: toLocale(locale) });
}

export function translateGoods(locale: Locale | LocaleExtended, goods: string): string {
  return i18n.t(`goods.${goods}`, { lng: toLocale(locale) });
}

export function translateJobName(locale: Locale | LocaleExtended, jobName: string): string {
  return i18n.t(`jobs.names.${jobName}`, { lng: toLocale(locale) });
}
export function translateJobDescription(locale: Locale | LocaleExtended, jobName: string): string {
  return i18n.t(`jobs.descriptions.${jobName}`, { lng: toLocale(locale) });
}
export function translateJobCaution(locale: Locale | LocaleExtended, jobName: string) {
  // check that job exists and has caution
  if (!(jobName in de.jobs.cautions)) {
    return undefined;
  }
  return i18n.t(`jobs.cautions.${jobName}`, { lng: toLocale(locale) });
}
export function translateJobOption(locale: Locale | LocaleExtended, jobName: string, option: string) {
  return i18n.t(`jobs.options.${jobName}.${option}`, { lng: toLocale(locale) });
}
export function translateJobOptionName(locale: Locale | LocaleExtended, option: string) {
  return i18n.t(`jobs.optionNames.${option}`, { lng: toLocale(locale) });
}
export function translateJobParameterName(locale: Locale | LocaleExtended, jobName: string, parameterName: string) {
  return i18n.t(`jobs.parameters.${jobName}.${parameterName}`, { lng: toLocale(locale) });
}
export function translateJobStatus(locale: Locale | LocaleExtended, status: JobStatus) {
  return i18n.t(`jobs.status.${status}`, { lng: toLocale(locale) });
}

export function translateJobOptions(locale: Locale | LocaleExtended, jobName: string) {
  // check that job exists and has options
  if (!(jobName in de.jobs.options)) {
    return null;
  }
  const options = Object.keys(de.jobs.options[jobName as keyof typeof de.jobs.options]);
  return options.reduce((pv, cv) => {
    pv[cv] = i18n.t(`jobs.options.${jobName}.${cv}`, { lng: toLocale(locale) });
    return pv;
  }, {} as Record<string, string>);
}
export function translateJob(locale: Locale | LocaleExtended, job: JobDescription) {
  const translation: { name: string; description: string; caution?: string } = {
    name: translateJobName(toLocale(locale), job.name),
    description: translateJobDescription(locale, job.name),
  };
  if (job.caution) {
    translation.caution = translateJobCaution(toLocale(locale), job.name);
  }
  return translation;
}

export function translateJobStep(locale: Locale | LocaleExtended, jobName: string, stepName: string) {
  return i18n.t(`jobs.steps.${jobName}.${stepName}`, { lng: toLocale(locale) });
}
