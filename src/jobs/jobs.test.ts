import { describe, expect, it } from 'vitest';

import jobs from './jobs.json';
import de from '../locales/de.json';

/**
 * Test jobs.
 *
 * Every job should have a description and a name. Also, every job should have at least one step.
 * Every job option should also have a key, as well as every named parameter.
 */
describe('Test that job names are unique', () => {
  const names = jobs.map((job) => job.name);
  const uniqueNames = [...new Set(names)];
  it(`should have ${names.length} unique names`, () => {
    expect(names.length).toBe(uniqueNames.length);
  });
});
describe('Test that all jobs have a name and a description, and also at least one step. ', () => {
  for (const job of jobs) {
    it(`should have a name translation key ${job.name}`, () => {
      expect(de.jobs.names[job.name]).toBeDefined();
    });
    it(`should have a description translation key ${job.name}}`, () => {
      expect(de.jobs.descriptions[job.name]).toBeDefined();
    });
  }
});
describe('Test that all job options have a key, and all named parameters have a key', () => {
  const allOptions = jobs.flatMap(
    (job) =>
      job.options?.map((option) => {
        return { job: job.name, option: option.name };
      }) ?? [],
  );
  allOptions.forEach((option) => {
    it(`should have a translation key for option ${option.job}.${option.option}`, () => {
      expect(de.jobs.options[option.job][option.option]).toBeDefined();
    });
  });
});
