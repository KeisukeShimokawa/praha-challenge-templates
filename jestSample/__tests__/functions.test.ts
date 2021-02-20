/* eslint-disable jest/no-try-expect */
/* eslint-disable jest/no-conditional-expect */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// todo: ここに単体テストを書いてみましょう！
import {
  sumOfArray,
  asyncSumOfArray,
  asyncSumOfArraySometimesZero,
  getFirstNameThrowIfLong,
} from '../functions';
import { DatabaseMock } from '../util';
import { NameApiService } from '../nameApiService';

jest.mock('../util');
jest.mock('../nameApiService');

describe('Jestで単体テストを書こう', () => {
  describe('sumOfArray', () => {
    test('[1, 1]を渡すと2が返ってくる', () => {
      // Arrange
      const expected = 2;
      // Act
      const actual = sumOfArray([1, 1]);
      // Assert
      expect(actual).toBe(expected);
    });

    test('空の配列を渡すと例外が送出される', () => {
      expect(() => {
        sumOfArray([]);
      }).toThrow(Error);
    });

    test('[1]を渡すと1が返ってくる', () => {
      // Arrange
      const expected = 1;
      // Act
      const actual = sumOfArray([1]);
      // Assert
      expect(actual).toBe(expected);
    });

    test('[-2, 2]を渡すと0が返ってくる', () => {
      // Arrange
      const expected = 0;
      // Act
      const actual = sumOfArray([-2, 2]);
      // Assert
      expect(actual).toBe(expected);
    });

    test('[0.2, 0.1]を渡すと0.3が返ってくる', () => {
      // Arrange
      const expected = 0.3;
      // Act
      const actual = sumOfArray([0.2, 0.1]);
      // Assert
      // expect(actual).toBe(expected) --> fails
      expect(actual).toBeCloseTo(expected);
    });
  });

  describe('asyncSumOfArray', () => {
    test('[1, 1]を渡すと2が返ってくる', async () => {
      // Arrange
      const expected = 2;
      // Act
      const actual = await asyncSumOfArray([1, 1]);
      // Assert
      expect(actual).toBe(expected);
    });

    test('空の配列を渡すと例外が送出される', async () => {
      await expect(asyncSumOfArray([])).rejects.toThrow(Error);
    });

    test('[1]を渡すと1が返ってくる', async () => {
      // Arrange
      const expected = 1;
      // Act
      const actual = await asyncSumOfArray([1]);
      // Assert
      expect(actual).toBe(expected);
    });

    test('[-2, 2]を渡すと0が返ってくる', async () => {
      // Arrange
      const expected = 0;
      // Act
      const actual = await asyncSumOfArray([-2, 2]);
      // Assert
      expect(actual).toBe(expected);
    });

    test('[0.2, 0.1]を渡すと0.3が返ってくる', async () => {
      // Arrange
      const expected = 0.3;
      // Act
      const actual = await asyncSumOfArray([0.2, 0.1]);
      // Assert
      // expect(actual).toBe(expected) --> fails
      expect(actual).toBeCloseTo(expected);
    });
  });

  describe('asyncSumOfArraySometimesZero', () => {
    const databaseMock: DatabaseMock = {
      save: jest.fn(),
    };

    test('デフォルト引数の検証', async () => {
      await asyncSumOfArraySometimesZero([1, 1]);
      expect(DatabaseMock).toHaveBeenCalled();
    });

    test('DI: [1, 1]を渡せば2が返ってくる', async () => {
      // Arrange
      const expected = 2;
      // Act
      const actual = await asyncSumOfArraySometimesZero([1, 1], databaseMock);
      // Arange
      expect(databaseMock.save).toBeCalledWith([1, 1]);
      expect(actual).toBe(expected);
    });

    test('DI: []を渡せば0が返ってくる', async () => {
      // Arrange
      const expected = 0;
      // Act
      const actual = await asyncSumOfArraySometimesZero([], databaseMock);
      // Arange
      expect(databaseMock.save).toBeCalledWith([]);
      expect(actual).toBe(expected);
    });
  });

  describe('getFirstNameThrowIfLong', () => {
    const nameAppServiceMockFactory = (firstName: string): NameApiService => {
      const nameApiServiceMock = jest.fn().mockImplementation(() => {
        return {
          MAX_LENGTH: 4,
          getFirstName: () => firstName,
        };
      });
      return nameApiServiceMock();
    };

    test('デフォルト引数の検証', async () => {
      jest
        .spyOn(NameApiService.prototype, 'getFirstName')
        .mockResolvedValueOnce('1234');
      await getFirstNameThrowIfLong(5);
      expect(NameApiService).toHaveBeenCalled();
    });

    test('取得した名前の長さが指定した最大値よりも短い場合はそのまま返す', async () => {
      // Arrange
      const expected = '1234';
      const nameApiServiceMock = nameAppServiceMockFactory(expected);
      // Act
      const actual = await getFirstNameThrowIfLong(5, nameApiServiceMock);
      // Assert
      expect(actual).toBe(expected);
    });

    test('取得した名前の長さが指定した最大値よりも長い場合に例外送出', async () => {
      // Arrange
      const firstName = '1234567';
      const nameApiServiceMock = nameAppServiceMockFactory(firstName);
      // Act
      try {
        await getFirstNameThrowIfLong(5, nameApiServiceMock);
      } catch (e) {
        // Assert
        expect(e).toBeInstanceOf(Error);
        expect(e).toHaveProperty('message', 'first_name too long');
      }
    });
  });
});
