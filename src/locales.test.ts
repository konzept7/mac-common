import { describe, expect, it } from 'vitest';
import de from './locales/de';
import en from './locales/en';
import fr from './locales/fr';
import es from './locales/es';

/**
 * Tests if the keys of the master object are also in the test object.
 *
 * @param masterObj - The master object to compare to.
 * @param testObj - The object to compare.
 * @param keyName - The name of the locale or the key.
 */
function compareObjects(masterObj: object, testObj: object, keyName: string) {
  for (const key in masterObj) {
    it(`should have the key ${key} in locale ${keyName}`, () => {
      expect(key in testObj).toBe(true);
    });

    if (!(key in testObj)) {
      continue;
    }
    if (typeof masterObj[key] === 'object' && masterObj[key] !== null) {
      compareObjects(masterObj[key], testObj[key], keyName + '.' + key);
    }
  }
}

/**
 * Test if all locales have the same keys.
 *
 * This test is to ensure that all locales have the same keys. If a key is missing in one locale, the test will fail.
 * The test also includes nested keys.
 */
describe('testing locales', () => {
  compareObjects(de, en, 'en');
  compareObjects(de, fr, 'fr');
  compareObjects(de, es, 'es');
});
