import { describe, it, expect } from 'vitest';
import {
  convertToLargeUsUnits,
  convertToLargeMetricUnits,
  convertToSmallUsUnits,
  convertToSmallMetricUnits,
  Recipe,
} from './product';
const smallRecipe: Recipe = {
  bean1: 10,
  bean2: 10,
  powder: 1,
  milk1: 1,
  milk2: 1,
  sugar: 0,
  lidM: 0,
  lidL: 0,
  cupM: 0,
  cupL: 0,
  cupXL: 0,
  cupXXL: 0,
  syrup1: 1,
  syrup2: 1,
  syrup3: 1,
  syrup4: 1,
  water: 1,
  franchiseTax: 0,
};

describe('testing recipe conversion with small recipe', () => {
  it('converts to small metric units', () => {
    const result = convertToSmallMetricUnits(smallRecipe);
    expect(result.bean1.amount).toBeCloseTo(1);
    expect(result.bean1.unit).toBe('g');
    expect(result.bean2.amount).toBeCloseTo(1);
    expect(result.bean2.unit).toBe('g');
    expect(result.powder.amount).toBeCloseTo(1);
    expect(result.powder.unit).toBe('g');
    expect(result.milk1.amount).toBeCloseTo(1);
    expect(result.milk1.unit).toBe('ml');
    expect(result.milk2.amount).toBeCloseTo(1);
    expect(result.milk2.unit).toBe('ml');
    expect(result.syrup1.amount).toBeCloseTo(1);
    expect(result.syrup1.unit).toBe('ml');
    expect(result.syrup2.amount).toBeCloseTo(1);
    expect(result.syrup2.unit).toBe('ml');
    expect(result.syrup3.amount).toBeCloseTo(1);
    expect(result.syrup3.unit).toBe('ml');
    expect(result.syrup4.amount).toBeCloseTo(1);
    expect(result.syrup4.unit).toBe('ml');
    expect(result.water.amount).toBeCloseTo(1);
    expect(result.water.unit).toBe('ml');
  });
  it('converts to large metric units', () => {
    const result = convertToLargeMetricUnits(smallRecipe);
    expect(result.bean1.amount).toBeCloseTo(0.001);
    expect(result.bean1.unit).toBe('kg');
    expect(result.bean2.amount).toBeCloseTo(0.001);
    expect(result.bean2.unit).toBe('kg');
    expect(result.powder.amount).toBeCloseTo(0.001);
    expect(result.powder.unit).toBe('kg');
    expect(result.milk1.amount).toBeCloseTo(0.001);
    expect(result.milk1.unit).toBe('l');
    expect(result.milk2.amount).toBeCloseTo(0.001);
    expect(result.milk2.unit).toBe('l');
    expect(result.syrup1.amount).toBeCloseTo(0.001);
    expect(result.syrup1.unit).toBe('l');
    expect(result.syrup2.amount).toBeCloseTo(0.001);
    expect(result.syrup2.unit).toBe('l');
    expect(result.syrup3.amount).toBeCloseTo(0.001);
    expect(result.syrup3.unit).toBe('l');
    expect(result.syrup4.amount).toBeCloseTo(0.001);
    expect(result.syrup4.unit).toBe('l');
  });
  it('converts to small us units', () => {
    const result = convertToSmallUsUnits(smallRecipe);
    expect(result.bean1.amount).toBeCloseTo(0.0321507466);
    expect(result.bean1.unit).toBe('oz');
    expect(result.bean2.amount).toBeCloseTo(0.0321507466);
    expect(result.bean2.unit).toBe('oz');
    expect(result.powder.amount).toBeCloseTo(0.0321507466);
    expect(result.powder.unit).toBe('oz');
    expect(result.milk1.amount).toBeCloseTo(0.0021133764);
    expect(result.milk1.unit).toBe('pt');
    expect(result.milk2.amount).toBeCloseTo(0.0021133764);
    expect(result.milk2.unit).toBe('pt');
    expect(result.syrup1.amount).toBeCloseTo(0.0021133764);
    expect(result.syrup1.unit).toBe('pt');
    expect(result.syrup2.amount).toBeCloseTo(0.0021133764);
    expect(result.syrup2.unit).toBe('pt');
    expect(result.syrup3.amount).toBeCloseTo(0.0021133764);
    expect(result.syrup3.unit).toBe('pt');
    expect(result.syrup4.amount).toBeCloseTo(0.0021133764);
    expect(result.syrup4.unit).toBe('pt');
    expect(result.water.amount).toBeCloseTo(0.0021133764);
    expect(result.water.unit).toBe('pt');
  });
  it('converts to large imperial units', () => {
    const result = convertToLargeUsUnits(smallRecipe);
    expect(result.bean1.amount).toBeCloseTo(0.0022046226);
    expect(result.bean1.unit).toBe('lb');
    expect(result.bean2.amount).toBeCloseTo(0.0022046226);
    expect(result.bean2.unit).toBe('lb');
    expect(result.powder.amount).toBeCloseTo(0.0022046226);
    expect(result.powder.unit).toBe('lb');
    expect(result.milk1.amount).toBeCloseTo(0.000033814);
    expect(result.milk1.unit).toBe('gal');
    expect(result.milk2.amount).toBeCloseTo(0.000033814);
    expect(result.milk2.unit).toBe('gal');
    expect(result.syrup1.amount).toBeCloseTo(0.000033814);
    expect(result.syrup1.unit).toBe('gal');
    expect(result.syrup2.amount).toBeCloseTo(0.000033814);
    expect(result.syrup2.unit).toBe('gal');
    expect(result.syrup3.amount).toBeCloseTo(0.000033814);
    expect(result.syrup3.unit).toBe('gal');
    expect(result.syrup4.amount).toBeCloseTo(0.000033814);
    expect(result.syrup4.unit).toBe('gal');
  });
});
