import { DeviceState } from './device';
import { BoxState } from './box';
import { Locale, LocaleExtended, toLocale } from './locales';
import { DeProducts, EnProducts, EsProducts, FrProducts, ProductTranslation, ProductTranslationFile } from './plu';

import de from './locales/de';
import en, { Translation } from './locales/en';
import fr from './locales/fr';
import es from './locales/es';
import { JobDescription, JobStatus } from './jobs/job';

type NestedKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string ? (T[K] extends object ? `${K}.${NestedKeys<T[K]>}` : K) : never;
    }[keyof T]
  : '';

export const resources = {
  en,
  de,
  es,
  fr,
} as const;

// Function to get translation value by nested key
export function t<K extends NestedKeys<Translation>>(key: K, locale: Locale | LocaleExtended): string {
  const keys = key.split('.') as string[];
  let result: any = resources[toLocale(locale)];

  for (const k of keys) {
    result = result[k];
  }

  return result || key; // or some fallback logic
}
export function tt(key: string, locale: Locale | LocaleExtended): string {
  return t(key as NestedKeys<Translation>, locale);
}

export const productTranslations: Record<Locale, ProductTranslationFile> = {
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
  return tt(`deviceStates.${state ?? 'Unknown'}`, locale);
}

export function translateServerState(locale: Locale | LocaleExtended, state?: BoxState): string {
  return tt(`serverStates.${state ?? 'Unknown'}`, locale);
}

export function translateDevice(locale: Locale | LocaleExtended, device: string): string {
  return tt(`deviceTypes.${device}`, locale);
}

export function translateGoods(locale: Locale | LocaleExtended, goods: string): string {
  return tt(`goods.${goods}`, locale);
}

export function translateJobName(locale: Locale | LocaleExtended, jobName: string): string {
  return tt(`jobs.names.${jobName}`, locale);
}
export function translateJobDescription(locale: Locale | LocaleExtended, jobName: string): string {
  return tt(`jobs.descriptions.${jobName}`, locale);
}
export function translateJobCaution(locale: Locale | LocaleExtended, jobName: string) {
  // check that job exists and has caution
  if (!(jobName in de.jobs.cautions)) {
    return undefined;
  }
  return tt(`jobs.cautions.${jobName}`, locale);
}
export function translateJobOption(locale: Locale | LocaleExtended, jobName: string, option: string) {
  return tt(`jobs.options.${jobName}.${option}`, locale);
}
export function translateJobOptionName(locale: Locale | LocaleExtended, option: string) {
  return tt(`jobs.optionNames.${option}`, locale);
}
export function translateJobParameterName(locale: Locale | LocaleExtended, jobName: string, parameterName: string) {
  return tt(`jobs.parameters.${jobName}.${parameterName}`, locale);
}
export function translateJobStatus(locale: Locale | LocaleExtended, status: JobStatus) {
  return tt(`jobs.status.${status}`, locale);
}

export function translateJobOptions(locale: Locale | LocaleExtended, jobName: string) {
  // check that job exists and has options
  if (!(jobName in de.jobs.options)) {
    return null;
  }
  const options = Object.keys(de.jobs.options[jobName as keyof typeof de.jobs.options]);
  return options.reduce((pv, cv) => {
    pv[cv] = tt(`jobs.options.${jobName}.${cv}`, locale);
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
  return tt(`jobs.steps.${jobName}.${stepName}`, locale);
}
