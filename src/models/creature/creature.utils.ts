import { hmm, randomInt, range } from '../../utils/walrus-tools';
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

const selectFeature = selectRandomItem(creatureFeatures);

const createFeatureArr = () => {
   const featureArr: string[] = [];
   while (true) {
      let counter = 0;
      counter === 0
         ? featureArr.push(selectFeature())
         : counter > 0 && counter < 3 && randomInt(10) < 9
         ? featureArr.push(selectFeature())
         : counter > 3 && counter < 6 && randomInt(10) < 8
         ? featureArr.push(selectFeature())
         : counter > 6 && counter < 9 && randomInt(10) < 7
         ? featureArr.push(selectFeature())
         : counter > 9 && counter < 12 && randomInt(10) < 6
         ? featureArr.push(selectFeature())
         : counter > 12 && counter < 15 && randomInt(10) < 5
         ? featureArr.push(selectFeature())
         : counter > 15 && counter < 18 && randomInt(10) < 4
         ? featureArr.push(selectFeature())
         : counter > 18 && counter < 21 && randomInt(10) < 3
         ? featureArr.push(selectFeature())
         : counter > 21 && counter < 24 && randomInt(10) < 2
         ? featureArr.push(selectFeature())
         : counter > 24 && counter < 26 && randomInt(10) < 1
         ? featureArr.push(selectFeature())
         : featureArr;
      break;
   }
   return featureArr;
};

// const generateCreatureName = (mNames: string [], fNames: string[])

export const test = () => {
   for (const _ of range(1)) {
      console.log(createFeatureArr());
   }
};
