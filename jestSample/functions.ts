import { NameApiService } from './nameApiService';
import { DatabaseMock } from './util';

// 変更前の関数
// export const sumOfArray = (numbers: number[]): number => {
//   return numbers.reduce((a: number, b: number): number => a + b);
// };

export const sumOfArray = (numbers: number[]): number => {
  return numbers.reduce((a: number, b: number): number => {
    return a + b;
  }, 0);
};

export const asyncSumOfArray = (numbers: number[]): Promise<number> => {
  return new Promise((resolve): void => {
    resolve(sumOfArray(numbers));
  });
};

export const asyncSumOfArraySometimesZero = (
  numbers: number[],
  database: DatabaseMock = new DatabaseMock(),
): Promise<number> => {
  return new Promise((resolve): void => {
    // try {
    //   database.save(numbers);
    //   resolve(sumOfArray(numbers));
    // } catch (error) {
    //   resolve(0);
    // }
    database.save(numbers);
    resolve(sumOfArray(numbers));
  });
};

export const getFirstNameThrowIfLong = async (
  maxNameLength: number,
  nameApiSerivce: NameApiService = new NameApiService(),
): Promise<string> => {
  const firstName = await nameApiSerivce.getFirstName();

  if (firstName.length > maxNameLength) {
    throw new Error('first_name too long');
  }
  return firstName;
};
