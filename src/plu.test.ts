import { describe, expect, it } from 'vitest';
import { productTranslations, translateDeviceState, getProduct } from './translate';
import { Locale } from './locales';
import { sampleBoxConfig } from './sample-data/sampleBox';

const PLUs: number[] = Object.keys(productTranslations.de).map((PLU) => parseInt(PLU, 10));
const drinks = PLUs.filter((p) => p % 50 === 0 && p !== 2300); // 2300 is a special case, legacy product
const locales: Locale[] = ['de', 'en', 'es', 'fr'];
describe('product translations', () => {
  it('should return the correct translation for a product', () => {
    expect(productTranslations.de[300].name).toBe('Cappuccino');
    expect(productTranslations.en[300].name).toBe('Cappuccino');
    expect(productTranslations.fr[300].name).toBe('Cappuccino');
    expect(productTranslations.es[300].name).toBe('Cappuccino');
  });

  PLUs.forEach((PLU: number) => {
    locales.forEach((l) => {
      it(`${PLU} should have a name in ${l}`, () => {
        expect(productTranslations[l][PLU]).toBeDefined();
        expect(productTranslations[l][PLU].name).toBeDefined();
        expect(productTranslations[l][PLU].name.length).toBeGreaterThan(0);
      });
    });
  });

  PLUs.forEach((PLU: number) => {
    locales.forEach((l) => {
      it(`${PLU} should be translated properly with function in ${l}`, () => {
        const product = getProduct(PLU, l);
        expect(product).toBeDefined();
        expect(product?.name).toEqual(productTranslations[l][PLU].name);
        expect(product?.description).toEqual(productTranslations[l][PLU].description);
      });
    });
  });

  drinks.forEach((PLU: number) => {
    locales.forEach((l) => {
      it(`${PLU} should return an image on get product ${l}`, () => {
        const product = getProduct(PLU, l);
        expect(product).toBeDefined();
        expect(product?.img).toBeDefined();
        expect(product?.img?.length ?? 0).toBeGreaterThan(0);
        expect(product?.img).toMatch(/^<svg/);
      });
    });
  });

  drinks.forEach((PLU: number) => {
    locales.forEach((l) => {
      it(`${PLU} is a drink and should have a description in ${l}`, () => {
        expect(productTranslations[l][PLU].description).toBeDefined();
        expect(productTranslations[l][PLU].description?.length ?? 0).toBeGreaterThan(0);
      });
    });
  });

  drinks.forEach((PLU: number) => {
    locales.forEach((l) => {
      it(`${PLU} is a drink and should have an image in ${l}`, () => {
        expect(productTranslations[l][PLU].img).toBeDefined();
        expect(productTranslations[l][PLU].img?.length ?? 0).toBeGreaterThan(0);
        expect(productTranslations[l][PLU].img).toContain('svg');
      });
    });
  });
});

describe('testing device state translations with sample values', () => {
  const box = sampleBoxConfig;

  // test that all device state values are defined
  box.devices.forEach((device) => {
    locales.forEach((l) => {
      it(`should have a translation in ${l} for every device state ${device.State}`, () => {
        const t = translateDeviceState(l, device.State);
        expect(t).toBeDefined();
        expect(t.length).toBeGreaterThan(0);
      });
    });
  });
});

// describe('testing that all keys in german translation file are translated in other locales', () => {
//   const deviceStateMaster = Object.keys(de.deviceStates);
//   it('english should have the same device state keys as german', () => {
//     const x = Object.keys(en.deviceStates);
//     deviceStateMaster.forEach((s) => {
//       expect(x.includes(s)).toBeTruthy();
//     });
//   });

//   it('french should have the same device state keys as german', () => {
//     const x = Object.keys(fr.deviceStates);
//     deviceStateMaster.forEach((s) => {
//       expect(x.includes(s)).toBeTruthy();
//     });
//   });

//   it('spanish should have the same device state keys as german', () => {
//     const x = Object.keys(es.deviceStates);
//     deviceStateMaster.forEach((s) => {
//       expect(x.includes(s)).toBeTruthy();
//     });
//   });
//   const deviceTypeMaster = Object.keys(de.deviceTypes);
//   it('english should have the same device type keys as german', () => {
//     const x = Object.keys(en.deviceTypes);
//     deviceTypeMaster.forEach((s) => {
//       expect(x.includes(s)).toBeTruthy();
//     });
//   });

//   it('french should have the same device type keys as german', () => {
//     const x = Object.keys(fr.deviceTypes);
//     deviceTypeMaster.forEach((s) => {
//       expect(x.includes(s)).toBeTruthy();
//     });
//   });

//   it('spanish should have the same device type keys as german', () => {
//     const x = Object.keys(es.deviceTypes);
//     deviceTypeMaster.forEach((s) => {
//       expect(x.includes(s)).toBeTruthy();
//     });
//   });

//   const goodsMaster = Object.keys(de.goods);
//   it('english should have the same goods keys as german', () => {
//     const x = Object.keys(en.goods);
//     goodsMaster.forEach((s) => {
//       expect(x.includes(s)).toBeTruthy();
//     });
//   });

//   it('french should have the same goods keys as german', () => {
//     const x = Object.keys(fr.goods);
//     goodsMaster.forEach((s) => {
//       expect(x.includes(s)).toBeTruthy();
//     });
//   });

//   it('spanish should have the same goods keys as german', () => {
//     const x = Object.keys(es.goods);
//     goodsMaster.forEach((s) => {
//       expect(x.includes(s)).toBeTruthy();
//     });
//   });

//   const serverStatesMaster = Object.keys(de.serverStates);
//   it('english should have the same server state keys as german', () => {
//     const x = Object.keys(en.serverStates);
//     serverStatesMaster.forEach((s) => {
//       expect(x.includes(s)).toBeTruthy();
//     });
//   });

//   it('french should have the same server state keys as german', () => {
//     const x = Object.keys(fr.serverStates);
//     serverStatesMaster.forEach((s) => {
//       expect(x.includes(s)).toBeTruthy();
//     });
//   });

//   it('spanish should have the same server state keys as german', () => {
//     const x = Object.keys(es.serverStates);
//     serverStatesMaster.forEach((s) => {
//       expect(x.includes(s)).toBeTruthy();
//     });
//   });
// });
