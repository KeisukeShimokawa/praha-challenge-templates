import { DatabaseMock } from './util';

export const sumOfArray = (numbers: number[]): number => {
  return numbers.reduce((a: number, b: number): number => {
    return a + b;
  }, 0);
};

export const asyncSumOfArraySometimesZeroWithoutDependancies = (
  numbers: number[],
): Promise<number> => {
  return new Promise((resolve): void => {
    try {
      const database = new DatabaseMock();
      database.save(numbers);
      resolve(sumOfArray(numbers));
    } catch (error) {
      resolve(0);
    }
  });
};

export const asyncSumOfArraySometimesZeroWithDependancies = (
  numbers: number[],
  database: DatabaseMock = new DatabaseMock(),
): Promise<number> => {
  return new Promise((resolve): void => {
    try {
      database.save(numbers);
      resolve(sumOfArray(numbers));
    } catch (error) {
      resolve(0);
    }
  });
};
