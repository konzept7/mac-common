import { BoxState, DeviceState } from './box';
import { Locale } from './locales';
import { DeProducts, EnProducts, EsProducts, FrProducts, ProductTranslation, TranslationFile } from './products';
import i18n from 'i18next';

const de = {
  deviceStates: {
    Unknown: 'Unbekannt',
    Available: 'Verfügbar',
    AvailableAfterRestart: 'Neustart notwendig',
    Disabled: 'Deaktiviert',
    Error: 'Störung',
    JobDone: 'Fertig',
    Maintenance: 'Wartung',
    ProcessingJob: 'Beschäftigt',
    ShutDown: 'Aus',
  },
  deviceTypes: {
    CoffeeMachine_WMF9000s_one: 'Kaffeemaschine',
    CoffeeMachine_WMF9000s_other: 'Kaffeemaschinen',
    CupHolder_one: 'Becherhalter',
    CupHolder_other: 'Becherhalter',
    DisplayDevice_one: 'Display',
    DisplayDevice_other: 'Displays',
    Gate_one: 'Ausgabe',
    Gate_other: 'Ausgaben',
    PaymentTerminalAdyen_one: 'Kreditkartenlesegerät',
    PaymentTerminalAdyen_other: 'Kreditkartenlesegeräte',
    PaymentTerminalCastle_one: 'Kreditkartenlesegerät',
    PaymentTerminalCastle_other: 'Kreditkartenlesegeräte',
    PaymentTerminalDummy: 'Platzhalter Kreditkartenlesegerät',
    RippleMakerMkII_one: 'Lebensmitteldrucker',
    RippleMakerMkII_other: 'Lebensmitteldrucker',
    Robot_one: 'Roboter',
    Robot_other: 'Roboter',
    Scanner_one: 'Scanner',
    Scanner_other: 'Scanner',
  },
  serverStates: {
    FatalError: 'Störung',
    Maintenance: 'Wartung',
    NeverInitialized: 'Nicht gestartet',
    Okay: 'Okay',
    Paused: 'Pause',
    Pausing: 'Halte an...',
    Restarting: 'Startet neu',
    Starting: 'Startet...',
    Update: 'Update',
    Updating: 'Update',
    closed: 'Nicht verbunden',
    continue: 'Weiter',
    title: 'Aktueller Status:',
  },
  goods: {
    bean1: 'Bohne1',
    bean2: 'Bohne2',
    category: 'Kategorie',
    powder: 'Schoko',
    cup: 'Becher',
    extraStrong: 'extra stark',
    id: 'ID',
    milk: 'Milch',
    milk1: 'Milch1',
    milk2: 'Milch2',
    name: 'Name',
    noSyrup: 'kein Sirup',
    price: 'Preis',
    print: 'Druck',
    sirup1: 'Sirup1',
    sirup2: 'Sirup2',
    sirup3: 'Sirup3',
    sirup4: 'Sirup4',
    size: 'Größe',
    syrup: 'Sirup',
  },
};
const en = {
  deviceStates: {
    Unknown: 'Unknown',
    Available: 'Available',
    AvailableAfterRestart: 'Restart necessary',
    Disabled: 'Disabled',
    Error: 'Fault',
    JobDone: 'Finished',
    Maintenance: 'Maintenance',
    ProcessingJob: 'Processing job',
    ShutDown: 'Shutdown',
  },
  deviceTypes: {
    CoffeeMachine_WMF9000s_one: 'Coffee machine',
    CoffeeMachine_WMF9000s_other: 'Coffee machines',
    CupHolder_one: 'Cup holder',
    CupHolder_other: 'Cup holders',
    DisplayDevice_one: 'Display',
    DisplayDevice_other: 'Displays',
    Gate_one: 'Door',
    Gate_other: 'Doors',
    PaymentTerminalAdyen_one: 'Payment terminal',
    PaymentTerminalAdyen_other: 'Payment terminals',
    PaymentTerminalCastle_one: 'Payment terminal',
    PaymentTerminalCastle_other: 'Payment terminals',
    PaymentTerminalDummy: 'Placeholder payment terminal',
    RippleMakerMkII_one: 'Printer',
    RippleMakerMkII_other: 'Printers',
    Robot_one: 'Robot',
    Robot_other: 'Robots',
    Scanner_one: 'Scanner',
    Scanner_other: 'Scanners',
  },
  goods: {
    bean1: 'Bean1',
    bean2: 'Bean2',
    category: 'Category',
    powder: 'Chocolate',
    cup: 'Cup',
    extraStrong: 'extra strong',
    id: 'ID',
    milk: 'Milk',
    milk1: 'Milk1',
    milk2: 'Milk2',
    name: 'Name',
    noSyrup: 'no syrup',
    price: 'Price',
    print: 'Print',
    sirup1: 'Syrup1',
    sirup2: 'Syrup2',
    sirup3: 'Syrup3',
    sirup4: 'Syrup4',
    size: 'Size',
    syrup: 'Syrup',
  },
  serverStates: {
    FatalError: 'Fault',
    Maintenance: 'Maintenance',
    NeverInitialized: 'Not started',
    Okay: 'Okay',
    Paused: 'Paused',
    Pausing: 'Pausing...',
    Restarting: 'Restarting...',
    Starting: 'Starting...',
    Update: 'Update',
    Updating: 'Updating',
    closed: 'Not connected',
    continue: 'Continue',
    title: 'Current status:',
  },
};
const es = {
  deviceStates: {
    Unknown: 'Desconocido',
    Available: 'Disponible',
    AvailableAfterRestart: 'reinicio necesario',
    Disabled: 'Desactivado',
    Error: 'Disturbio',
    JobDone: 'Acabado',
    Maintenance: 'mantenimiento',
    ProcessingJob: 'empleado',
    ShutDown: 'Fuera de',
  },
  deviceTypes: {
    CoffeeMachine_WMF9000s_one: 'maquina de cafe',
    CoffeeMachine_WMF9000s_other: 'máquinas de café',
    CupHolder_one: 'posavasos',
    CupHolder_other: 'posavasos',
    DisplayDevice_one: 'pantalla',
    DisplayDevice_other: 'monitor',
    Gate_one: 'producción',
    Gate_other: 'gasto',
    PaymentTerminalAdyen_one: 'lector de tarjetas de crédito',
    PaymentTerminalAdyen_other: 'lectores de tarjetas de crédito',
    PaymentTerminalCastle_one: 'lector de tarjetas de crédito',
    PaymentTerminalCastle_other: 'lectores de tarjetas de crédito',
    PaymentTerminalDummy: 'Lector de tarjetas de crédito de marcador de posición',
    RippleMakerMkII_one: 'impresora de alimentos',
    RippleMakerMkII_other: 'impresora de alimentos',
    Robot_one: 'robot',
    Robot_other: 'robot',
    Scanner_one: 'escáner',
    Scanner_other: 'escáner',
  },
  serverStates: {
    FatalError: 'Disturbio',
    Maintenance: 'mantenimiento',
    NeverInitialized: 'No empezado',
    Okay: 'OK',
    Paused: 'Romper',
    Pausing: 'Deténgase...',
    Restarting: 'reinicios',
    Starting: 'Comenzando...',
    Update: 'actualizaciones',
    Updating: 'actualizaciones',
    closed: 'No conectado',
    continue: 'Continuar',
    title: 'Estado actual:',
  },
  goods: {
    bean1: 'frijol1',
    bean2: 'frijol2',
    category: 'categoría',
    powder: 'chocolate',
    cup: 'Una taza',
    extraStrong: 'Super fuerte',
    id: 'IDENTIFICACIÓN',
    milk: 'Leche',
    milk1: 'leche1',
    milk2: 'leche2',
    name: 'Apellido',
    noSyrup: 'sin jarabe',
    price: 'Precio',
    print: 'Impresión',
    sirup1: 'jarabe1',
    sirup2: 'jarabe2',
    sirup3: 'jarabe3',
    sirup4: 'jarabe4',
    size: 'Talla',
    syrup: 'jarabe',
  },
};
const fr = {
  deviceStates: {
    Unknown: 'Inconnu',
    Available: 'Disponible',
    AvailableAfterRestart: 'redémarrage nécessaire',
    Disabled: 'Handicapé',
    Error: 'Perturbation',
    JobDone: 'Achevé',
    Maintenance: 'maintenance',
    ProcessingJob: 'Employé',
    ShutDown: 'Hors de',
  },
  deviceTypes: {
    CoffeeMachine_WMF9000s_one: 'cafetière',
    CoffeeMachine_WMF9000s_other: 'machines à café',
    CupHolder_one: 'porte-gobelet',
    CupHolder_other: 'porte-gobelet',
    DisplayDevice_one: 'filtrer',
    DisplayDevice_other: 'affichage',
    Gate_one: 'production',
    Gate_other: 'dépense',
    PaymentTerminalAdyen_one: 'lecteur de carte de crédit',
    PaymentTerminalAdyen_other: 'lecteurs de cartes de crédit',
    PaymentTerminalCastle_one: 'lecteur de carte de crédit',
    PaymentTerminalCastle_other: 'lecteurs de cartes de crédit',
    PaymentTerminalDummy: 'Lecteur de carte de crédit à espace réservé',
    RippleMakerMkII_one: 'imprimante alimentaire',
    RippleMakerMkII_other: 'imprimante alimentaire',
    Robot_one: 'robot',
    Robot_other: 'robot',
    Scanner_one: 'scanner',
    Scanner_other: 'scanner',
  },
  goods: {
    bean1: 'haricot1',
    bean2: 'haricot2',
    category: 'Catégorie',
    powder: 'Chocolat',
    cup: 'Une tasse',
    extraStrong: 'extra fort',
    id: 'IDENTIFIANT',
    milk: 'Le Lait',
    milk1: 'lait1',
    milk2: 'lait2',
    name: 'Nom de famille',
    noSyrup: 'pas de sirop',
    price: 'Prix',
    print: 'Imprimer',
    sirup1: 'sirop1',
    sirup2: 'sirop2',
    sirup3: 'sirop3',
    sirup4: 'sirop4',
    size: 'Taille',
    syrup: 'sirop',
  },
  serverStates: {
    FatalError: 'Perturbation',
    Maintenance: 'maintenance',
    NeverInitialized: 'Pas commencé',
    Okay: "D'ACCORD",
    Paused: 'Casser',
    Pausing: 'Arrêt...',
    Restarting: 'Redémarrages',
    Starting: 'Départ...',
    Update: 'mises à jour',
    Updating: 'mises à jour',
    closed: 'Pas connecté',
    continue: 'Continuer',
    title: 'Statut actuel:',
  },
};

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
  // console.warn(`No translation found for PLU ${PLU} in locale ${locale}, falling back to German master.`);
  // return getProduct(PLU, 'de');
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
