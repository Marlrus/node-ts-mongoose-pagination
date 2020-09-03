import { hmm, randomInt, range, percentChance } from '../../utils/walrus-tools';
import {
   CreatureInterface,
   maleFirstNames,
   femaleFirstNames,
   creatureTypes,
   temepraments,
   creatureFeatures,
   hobbies,
   americanLastNames,
} from './creature.types';

const selectGender = () => (randomInt(1) === 0 ? 'male' : 'female');

const selectRandomItem = <T>(arr: T[]) => () =>
   arr.slice()[randomInt(arr.length - 1)];

const selectMaleName = selectRandomItem(maleFirstNames);

const selectFemaleName = selectRandomItem(femaleFirstNames);

const selectLastName = selectRandomItem(americanLastNames);

const selectType = selectRandomItem(creatureTypes);

const selectTemperament = selectRandomItem(temepraments);

type SelectorFn = <T>(arr: T[]) => () => T;

const createPropArray = <T>(arr: T[], selectFn: SelectorFn) => () => {
   const newArr: T[] = [];
   const selector = selectFn(arr);
   for (const i in range(arr.length)) {
      const diminishingChance = (100 / (arr.length - 1)) * +i;
      if (percentChance(100 - diminishingChance)) {
         newArr.push(selector());
      } else {
         break;
      }
   }
   return Array.from(new Set(newArr));
};

const createFeatureArr = createPropArray(creatureFeatures, selectRandomItem);

const createHobbieArr = createPropArray(hobbies, selectRandomItem);

// const createFoodsArr = createPropArray(foo, selectRandomItem);

export const test = () => {
   for (const _ of range(1)) {
      console.log(createHobbieArr());
   }
};
