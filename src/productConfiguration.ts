export enum Season {
  Spring = 'Spring',
  Summer = 'Summer',
  Autumn = 'Autumn',
  Winter = 'Winter',
}
export enum ProductCategory {
  hot = 'hot',
  ice = 'ice',
  special = 'special',
}
export enum ExtraCategory {
  strength = 'strength',
  milk = 'milk',
  syrup = 'syrup',
  print = 'print',
}
export enum SizeName {
  Short = 'Short',
  Small = 'Small',
  Regular = 'Regular',
  Grande = 'Grande',
}
export enum Coffeemachine_SML {
  S = 'S',
  M = 'M',
  L = 'L',
}

export interface ButtonNumberCondition {
  condition: number[];
  a_iBtnNbr: number;
}

export interface ProductConfiguration {
  name: string;
  category: ProductCategory;
  season: Season[];
  isNamingSeasonal: boolean;
  isDisabled: boolean;
  hasPrint: boolean;
  hasChoco: boolean;
  hasMilk: boolean;
  hasSyrup: boolean;
  hasExtrashot: boolean;
  hotColdSwitch?: number;
  baseId: number;
  hasIce: boolean;
  img: string;
  a_iBtnNbr: number;
  special_a_iBtnNbr?: ButtonNumberCondition[];
  sizes: BeverageSize[];
}

export interface BeverageSize {
  sizeName: SizeName;
  id: number;
  cupSize: CupSize;
  builtInExtra?: number[];
  price: number;
  milk?: number[];
  numSyrup: number;
  a_iSML: Coffeemachine_SML;
  recipe: Recipe;

  extrashot?: number[];
  syrup?: number[];
}

export interface Recipe {
  bean1: number;
  bean2: number;
  powder: number;
  milk1: number;
  milk2: number;
  sugar: number;
  lidM: number;
  lidL: number;
  cupM: number;
  cupL: number;
  cupXL: number;
  cupXXL: number;
  syrup1: number;
  syrup2: number;
  syrup3: number;
  syrup4: number;
  water: number;
  franchiseTax: number;
}

export enum CupSize {
  Small = 8,
  Medium = 12,
  Large = 16,
  ExtraLarge = 20,
}

export class BeverageConfigurationBase {
  productId!: number;
  extra: number[] = [];
  printImage: string | undefined;
}
export class BeverageConfiguration extends BeverageConfigurationBase {
  id!: string;
  price!: number;
}

export interface ExtraConfiguration {
  name: string;
  category: ExtraCategory;
  season: Season[];
  isNamingSeasonal: boolean;
  id: number;
  isAnalyzed: boolean;
  isDisabled: boolean;
  price: number;
  img: string;
  recipe: Recipe;
}

export type Unit = 'mg' | 'g' | 'kg' | 'ml' | 'l' | 'lb' | 'oz' | 'pt' | 'gal' | 'currency' | 'count';
export interface RecipeUnit {
  amount: number;
  unit: Unit;
}
export interface RecipeWithUnit {
  bean1: RecipeUnit;
  bean2: RecipeUnit;
  powder: RecipeUnit;
  milk1: RecipeUnit;
  milk2: RecipeUnit;
  sugar: RecipeUnit;
  lidM: RecipeUnit;
  lidL: RecipeUnit;
  cupM: RecipeUnit;
  cupL: RecipeUnit;
  cupXL: RecipeUnit;
  cupXXL: RecipeUnit;
  syrup1: RecipeUnit;
  syrup2: RecipeUnit;
  syrup3: RecipeUnit;
  syrup4: RecipeUnit;
  water: RecipeUnit;
  franchiseTax: RecipeUnit;
}
export function convertRecipeUnit(amount: number, key: keyof Recipe, unit: Unit): number {
  switch (key) {
    case 'bean1':
    case 'bean2':
    case 'powder':
      if (key === 'bean1' || key === 'bean2') {
        amount = amount / 10;
      }
      if (unit === 'g') {
        return amount;
      } else if (unit === 'mg') {
        return amount * 1000;
      } else if (unit === 'kg') {
        return amount;
      } else if (unit === 'lb') {
        return amount * 0.0022046226;
      } else if (unit === 'oz') {
        return amount * 0.0321507466;
      } else {
        throw new Error('invalid unit');
      }
    case 'sugar':
    case 'lidM':
    case 'lidL':
    case 'cupM':
    case 'cupL':
    case 'cupXL':
    case 'cupXXL':
      return amount;
    case 'franchiseTax':
      return amount;
    case 'milk1':
    case 'milk2':
    case 'syrup1':
    case 'syrup2':
    case 'syrup3':
    case 'syrup4':
    case 'water':
      if (unit === 'ml') {
        return amount;
      } else if (unit === 'l') {
        return amount / 1000;
      } else if (unit === 'gal') {
        return amount * 0.0002641721;
      } else if (unit === 'pt') {
        return amount * 0.0021133764;
      } else if (unit === 'oz') {
        return amount / 29.57;
      } else {
        throw new Error('invalid unit');
      }
    default:
      throw new Error('invalid key');
  }
}
export function convert(recipe: Recipe): RecipeWithUnit {
  return {
    bean1: { amount: recipe.bean1 / 10, unit: 'g' },
    bean2: { amount: recipe.bean2 / 10, unit: 'g' },
    powder: { amount: recipe.powder, unit: 'g' },
    milk1: { amount: recipe.milk1, unit: 'ml' },
    milk2: { amount: recipe.milk2, unit: 'ml' },
    sugar: { amount: recipe.sugar, unit: 'count' },
    lidM: { amount: recipe.lidM, unit: 'count' },
    lidL: { amount: recipe.lidL, unit: 'count' },
    cupM: { amount: recipe.cupM, unit: 'count' },
    cupL: { amount: recipe.cupL, unit: 'count' },
    cupXL: { amount: recipe.cupXL, unit: 'count' },
    cupXXL: { amount: recipe.cupXXL, unit: 'count' },
    syrup1: { amount: recipe.syrup1, unit: 'ml' },
    syrup2: { amount: recipe.syrup2, unit: 'ml' },
    syrup3: { amount: recipe.syrup3, unit: 'ml' },
    syrup4: { amount: recipe.syrup4, unit: 'ml' },
    water: { amount: recipe.water, unit: 'ml' },
    franchiseTax: { amount: recipe.franchiseTax, unit: 'currency' },
  };
}
export function convertToLargeMetricUnits(recipe: Recipe): RecipeWithUnit {
  return {
    bean1: { amount: recipe.bean1 / 10000, unit: 'kg' },
    bean2: { amount: recipe.bean2 / 10000, unit: 'kg' },
    powder: { amount: recipe.powder / 1000, unit: 'kg' },
    milk1: { amount: recipe.milk1 / 1000, unit: 'l' },
    milk2: { amount: recipe.milk2 / 1000, unit: 'l' },
    sugar: { amount: recipe.sugar, unit: 'count' },
    lidM: { amount: recipe.lidM, unit: 'count' },
    lidL: { amount: recipe.lidL, unit: 'count' },
    cupM: { amount: recipe.cupM, unit: 'count' },
    cupL: { amount: recipe.cupL, unit: 'count' },
    cupXL: { amount: recipe.cupXL, unit: 'count' },
    cupXXL: { amount: recipe.cupXXL, unit: 'ml' },
    syrup1: { amount: recipe.syrup1 / 1000, unit: 'l' },
    syrup2: { amount: recipe.syrup2 / 1000, unit: 'l' },
    syrup3: { amount: recipe.syrup3 / 1000, unit: 'l' },
    syrup4: { amount: recipe.syrup4 / 1000, unit: 'l' },
    water: { amount: recipe.water / 1000, unit: 'l' },
    franchiseTax: { amount: recipe.franchiseTax, unit: 'currency' },
  };
}

export function convertToSmallUsUnits(recipe: Recipe): RecipeWithUnit {
  return {
    bean1: { amount: recipe.bean1 * 0.00321507466, unit: 'oz' },
    bean2: { amount: recipe.bean2 * 0.00321507466, unit: 'oz' },
    powder: { amount: recipe.powder * 0.0321507466, unit: 'oz' },
    milk1: { amount: recipe.milk1 * 0.0021133764, unit: 'pt' },
    milk2: { amount: recipe.milk2 * 0.0021133764, unit: 'pt' },
    sugar: { amount: recipe.sugar, unit: 'count' },
    lidM: { amount: recipe.lidM, unit: 'count' },
    lidL: { amount: recipe.lidL, unit: 'count' },
    cupM: { amount: recipe.cupM, unit: 'count' },
    cupL: { amount: recipe.cupL, unit: 'count' },
    cupXL: { amount: recipe.cupXL, unit: 'count' },
    cupXXL: { amount: recipe.cupXXL, unit: 'count' },
    syrup1: { amount: recipe.syrup1 * 0.0021133764, unit: 'pt' },
    syrup2: { amount: recipe.syrup2 * 0.0021133764, unit: 'pt' },
    syrup3: { amount: recipe.syrup3 * 0.0021133764, unit: 'pt' },
    syrup4: { amount: recipe.syrup4 * 0.0021133764, unit: 'pt' },
    water: { amount: recipe.water * 0.0021133764, unit: 'pt' },
    franchiseTax: { amount: recipe.franchiseTax, unit: 'currency' },
  };
}

export function convertToLargeUsUnits(recipe: Recipe): RecipeWithUnit {
  return {
    bean1: { amount: recipe.bean1 * 0.00022046, unit: 'lb' },
    bean2: { amount: recipe.bean2 * 0.00022046, unit: 'lb' },
    powder: { amount: recipe.powder * 0.00022046, unit: 'lb' },
    milk1: { amount: recipe.milk1 * 0.000264172, unit: 'gal' },
    milk2: { amount: recipe.milk2 * 0.000264172, unit: 'gal' },
    sugar: { amount: recipe.sugar, unit: 'count' },
    lidM: { amount: recipe.lidM, unit: 'count' },
    lidL: { amount: recipe.lidL, unit: 'count' },
    cupM: { amount: recipe.cupM, unit: 'count' },
    cupL: { amount: recipe.cupL, unit: 'count' },
    cupXL: { amount: recipe.cupXL, unit: 'count' },
    cupXXL: { amount: recipe.cupXXL, unit: 'count' },
    syrup1: { amount: recipe.syrup1 * 0.000264172, unit: 'gal' },
    syrup2: { amount: recipe.syrup2 * 0.000264172, unit: 'gal' },
    syrup3: { amount: recipe.syrup3 * 0.000264172, unit: 'gal' },
    syrup4: { amount: recipe.syrup4 * 0.000264172, unit: 'gal' },
    water: { amount: recipe.water * 0.000264172, unit: 'gal' },
    franchiseTax: { amount: recipe.franchiseTax, unit: 'currency' },
  };
}
