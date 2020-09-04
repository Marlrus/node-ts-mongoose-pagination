import {
   hmm,
   randomInt,
   range,
   percentChance,
   splitWords,
} from '../../utils/walrus-tools';
import {
   CreatureInterface,
   maleFirstNames,
   femaleFirstNames,
   creatureTypes,
   temepraments,
   creatureFeatures,
   hobbies,
   americanLastNames,
   foods,
} from './creature.types';

const selectGender = () => (randomInt(1) === 0 ? 'male' : 'female');

const selectRandomItem = <T>(arr: T[]) => () =>
   arr.slice()[randomInt(arr.length - 1)];

const selectMaleName = selectRandomItem(maleFirstNames);

const selectFemaleName = selectRandomItem(femaleFirstNames);

const selectLastName = selectRandomItem(americanLastNames);

const selectType = selectRandomItem(creatureTypes);

const selectTemperament = selectRandomItem(temepraments);

const generateEmail = (fullName: string) => {
   const splitName = splitWords(fullName);
   return `${splitName[0].slice(0, 4)}.${splitName[1].slice(0, 4)}${randomInt(
      9999,
      1000
   ).toString()}@creaturemail.com`;
};

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

const createFoodArr = createPropArray(foods, selectRandomItem);

const createHobbieArr = createPropArray(hobbies, selectRandomItem);

const createCreature = (): CreatureInterface => {
   const gender = selectGender();
   const firstName =
      gender === 'female' ? selectFemaleName() : selectMaleName();
   const name = `${firstName} ${selectLastName()}`;
   return {
      name,
      gender,
      email: generateEmail(name),
      type: selectType(),
      temperament: selectTemperament(),
      features: createFeatureArr(),
      favorite_foods: createFoodArr(),
      hobbies: createHobbieArr(),
      friends: [],
   };
};

export const test = () => {
   for (const _ of range(1)) {
      hmm(createCreature());
   }
};
