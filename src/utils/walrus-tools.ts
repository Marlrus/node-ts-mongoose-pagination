/*=======================
Utilities IMPURE
=======================*/

export const hmm = (vars?: any) => {
   if (vars === undefined || vars === null) {
      console.log(`ಠ_ಠ`);
   } else {
      console.log(vars);
   }
};

export const err = (message?: string) => {
   if (message === undefined) {
      throw new Error(`¯\_(ツ)_/¯`);
   } else {
      throw new Error(message);
   }
};

export const logger = <T>(x: T) => {
   hmm(x);
   return x;
};

export const startT = (name: string) => console.time(name);

export const stopT = (name: string) => console.timeEnd(name);

export const table = (tabularData: any, properties?: string[]) =>
   properties
      ? console.table(tabularData, properties)
      : console.table(tabularData);

/*===========================
Iterable and Array Creators
============================*/

//Remove keys part (OBSOLETE do with Array()) moved Fnality to Range and pyRange
// export const iter = (loops: number) => [...Array(loops).keys()];

export const range = (end: number, start?: number, step = 1) => {
   if (!start) return [...Array(end).keys()];

   if (end < 0) err('End param cannot be a negative integer.');
   if (start > end) err('Start cannot be after end param.');
   if (start < 0) err('Start has to be a positive integer.');
   if (step <= 0) err('Step has to be a positive integer greater than 0.');

   const length = Math.ceil((end - start) / step);

   const arr = [...Array(length).keys()];

   return arr.map((x) => x + start + x * (step - 1));
};

export const pyRange = (start: number, end?: number, step = 1) => {
   if (!end) return [...Array(start).keys()];

   if (end < 0) err('End param cannot be a negative integer.');
   if (start > end) err('Start cannot be after end param.');
   if (start < 0) err('Start has to be a positive integer.');
   if (step <= 0) err('Step has to be a positive integer greater than 0.');

   const length = Math.ceil((end - start) / step);

   const arr = [...Array(length).keys()];

   return arr.map((x) => x + start + x * (step - 1));
};

/*=====================
 Basic array Transformations
 =====================*/

export const head = <T>(arr: T[]) => arr.slice(0, 1)[0];

export const first = head;

export const last = <T>(arr: T[]) => arr.slice(arr.length - 1)[0];

export const tail = <T>(arr: T[]) => arr.slice(1, arr.length);

export const initial = <T>(arr: T[]) => arr.slice(0, arr.length - 1);

export const decoupleHead = <T>(arr: T[]): [T, T[]] => [head(arr), tail(arr)];

export const decoupleTail = <T>(arr: T[]): [T, T[]] => [
   last(arr),
   initial(arr),
];

/*========================
Basic Obj Utils
=========================*/

export const mapObj = (fn: Function) => <T extends Object>(obj: T): T => {
   let processedObj = {};
   for (const key in obj) {
      processedObj = {
         ...processedObj,
         [key]: fn(obj[key]),
      };
   }
   return processedObj as T;
};

/*======================
 STRING and DATE Utils
========================*/

//Tolowercase
export const toLowercase = (words: string) =>
   typeof words === 'string' ? words.toLocaleLowerCase() : words;

// split words
export const splitWords = (sentence: string) => sentence.split(' ');

//Capitalize
export const capitalize = (word: string) => {
   const lcWord = word.toLowerCase();
   return `${lcWord[0].toUpperCase()}${lcWord.slice(1, lcWord.length)}`;
};
// Catpizalize first word
export const capitalizeFirst = (sentence: string) => {
   const [first, rest] = decoupleHead(sentence.toLowerCase().split(' '));
   return `${capitalize(first)} ${rest.join(' ')}`;
};

// Capitalize all add exceptions
export const capitalizeAll = (sentence: string, ...exceptions: string[]) =>
   sentence
      .toLowerCase()
      .split(' ')
      .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
      .join(' ');

// const phrase = 'HELLO THERE FELLOW TRAVELLER.';

// hmm(capitalizeAll(phrase, 'there'));
// Remove Hour
// Get Hour
// toLocaleString ?
// Price utils ?

/*=====================
	NUMBER Utils
======================*/

export const randomInt = (end: number, start = 0) =>
   Math.round(Math.random() * (end - start) + start);

export const percentChance = (percent: number) => {
   if (percent > 100 || percent < 0)
      err('percent must be a number between 0 - 100');
   return Math.random() * 100 <= percent ? true : false;
};

/*=====================
	Getters
======================*/

export const dirProp = <T extends keyof U, U>(key: T, obj: U): U[T] => obj[key];

export const prop = (key: string) => (obj: any) => obj[key];

export const pluck = <T extends keyof U, U>(keys: T[], obj: U) =>
   keys.map((k) => dirProp(k, obj));

export const pfPluck = (keys: string[], obj: any) =>
   keys.map((k) => dirProp(k, obj));

/*==================
	POINTFREE
==================*/

export const pfPipe = (...fns: Function[]) => (x: any): any => {
   const [head, ...tail] = fns;
   const res = head(x);

   return tail.length > 0 ? pipe(...tail)(res) : res;
};

export const pipe = <In, Out>(...fns: Function[]) => (x: In): Out => {
   const [head, ...tail] = fns;
   const res = head(x);

   return tail.length > 0 ? pipe(...tail)(res) : res;
};

export const dirPipe = <In, Out>(x: In, ...fns: Function[]): Out => {
   const [head, ...tail] = fns;
   const res = head(x);

   return tail.length > 0 ? pipe(...tail)(res) : res;
};

export const pfCompose = (...fns: Function[]) => (x: any): any => {
   const [last, initial] = decoupleTail(fns);
   const res = last(x);

   return initial.length > 0 ? compose(...initial)(res) : res;
};

export const compose = <In, Out>(...fns: Function[]) => (x: In): Out => {
   const [last, initial] = decoupleTail(fns);
   const res = last(x);

   return initial.length > 0 ? compose(...initial)(res) : res;
};

export const dirCompose = <In, Out>(x: In, ...fns: Function[]): Out => {
   const [last, initial] = decoupleTail(fns);
   const res = last(x);

   return initial.length > 0 ? compose(...initial)(res) : res;
};

type MapCBFn<T, U> = (value: T, index: number, array: T[]) => U;

export const dirMap = <T, U>(fn: MapCBFn<T, U>, x: T[]): U[] => x.map(fn);
/**
 * Curried Function.
 *
 * TS Typing: map: <T, U>(fn: MapCBFn<T, U>) => (x: T[]) => U[]
 *
 * First Execution: Takes a Map Callback Fn as its first argument.
 *
 * Second Execution: Takes a value to be mapped over.
 */
export const map = <T, U>(fn: MapCBFn<T, U>) => (x: T[]): U[] => x.map(fn);

export const pfMap = (fn: Function) => (x: any) => x.map(fn);

type FilterCBFn<T> = (value: T, index?: number, array?: T[]) => boolean;

export const evalPredicates = <T>(...fns: FilterCBFn<T>[]) => (
   x: T
): boolean => {
   const [head, tail] = decoupleHead(fns);
   return tail.length === 0
      ? head(x)
      : head(x)
      ? evalPredicates(...tail)(x)
      : false;
};

export const dirFilter = <T>(x: T[], ...fns: FilterCBFn<T>[]) => {
   return fns.length === 1
      ? x.filter(fns[0])
      : x.filter(evalPredicates(...fns));
};

export const filter = <T>(...fns: FilterCBFn<T>[]) => (x: T[]) => {
   return fns.length === 1
      ? x.filter(fns[0])
      : x.filter(evalPredicates(...fns));
};

export const pfFilter = (...fns: FilterCBFn<any>[]) => (x: any) => {
   return fns.length === 1
      ? x.filter(fns[0])
      : x.filter(evalPredicates(...fns));
};

// export const dirFilter = <T>(fn: FilterCBFn<T>, x: T[]) => x.filter(fn);

// export const filter = <T>(fn: FilterCBFn<T>) => (x: T[]) => x.filter(fn);

// export const pfFilter = (fn: Function) => (x: any) => x.filter(fn);

//Reduce

export function reduce<T>(
   callbackFn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
   ) => T
): (x: T[]) => T;
export function reduce<T>(
   callbackFn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
   ) => T,
   initialValue: T
): (x: T[]) => T;
export function reduce<T, U>(
   callbackFn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
   ) => U,
   initialValue: U
): (x: T[]) => U;
export function reduce(fn: any, initialValue?: any) {
   return function (x: any[]) {
      return initialValue ? x.reduce(fn, initialValue) : x.reduce(fn);
   };
}

export const pfReduce = (fn: any, initialValue?: any) => (x: any[]) =>
   initialValue ? x.reduce(fn, initialValue) : x.reduce(fn);

export function dirReduce<T>(
   x: T[],
   callbackFn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
   ) => T
): T;
export function dirReduce<T>(
   x: T[],
   callbackFn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
   ) => T,
   initialValue: T
): T;
export function dirReduce<T, U>(
   x: T[],
   callbackFn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
   ) => U,
   initialValue: U
): U;
export function dirReduce(x: any[], fn: any, initialValue?: any) {
   return initialValue ? x.reduce(fn, initialValue) : x.reduce(fn);
}

/*========================
Object and Array Utilities
=========================*/

export const dataEquals = (x: any, y: any) => {
   if (typeof x && typeof y) {
      return typeof x === 'object'
         ? JSON.stringify(sortIterable(x)) === JSON.stringify(sortIterable(y))
         : x === y;
   }
   return false;
};

export const copyValues = <T>(x: T): T => JSON.parse(JSON.stringify(x));

interface AnyIterable {
   [key: string]: any;
}

export const sortIterable = <T extends AnyIterable>(obj: T): T => {
   const keys = Object.keys(obj).sort();
   return obj.length
      ? keys.reduce((sorted: any, key: string) => {
           const node =
              typeof obj[key] === 'object' ? sortIterable(obj[key]) : obj[key];
           return (sorted[key] = node), sorted;
        }, [])
      : keys.reduce((sorted: any, key: string) => {
           const node =
              typeof obj[key] === 'object' ? sortIterable(obj[key]) : obj[key];
           return (sorted[key] = node), sorted;
        }, {});
};

export const deepCopy = <T extends AnyIterable>(obj: T): T => {
   const keys = Object.keys(obj);
   return obj.length
      ? keys.reduce((copy: any, key: string) => {
           const node =
              typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
           return (copy[key] = node), copy;
        }, [])
      : keys.reduce((copy: any, key: string) => {
           const node =
              typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
           return (copy[key] = node), copy;
        }, {});
};

const primitiveEquals = (x: any, y: any) => {
   const [typeX, typeY] = [typeof x, typeof y];
   if (typeX !== typeY) return false;
   if (typeX !== 'function' && typeX !== 'object' && x !== y) return false;
   if (typeX === 'function' && x.toString() !== y.toString()) return false;
   return true;
};

export const equals = (x: any, y: any) => {
   if (!primitiveEquals(x, y)) return false;
   if (typeof x === 'object') {
      const [xKeys, yKeys] = [Object.keys(x).sort(), Object.keys(y).sort()];
      if (xKeys.toString() !== yKeys.toString()) return false;
      for (const key of xKeys) {
         if (!primitiveEquals(x[key], y[key])) return false;
         if (typeof x[key] === 'object') {
            const deepReturn = equals(x[key], y[key]);
            if (!deepReturn) return false;
         }
      }
   }
   return true;
};
