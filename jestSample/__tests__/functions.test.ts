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
      // Act
      const result = sumOfArray([1]);
      // Assert
      expect(result).toBe(1);
    });

    test('[-2, 2]を渡すと0が返ってくる', () => {
      // Act
      const result = sumOfArray([-2, 2]);
      // Assert
      expect(result).toBe(0);
    });

    test('[0.2, 0.1]を渡すと0.3が返ってくる', () => {
      // Act
      const result = sumOfArray([0.2, 0.1]);
      // Assert
      // expect(result).toBe(0.3) // fails
      expect(result).toBeCloseTo(0.3);
    });
  });

  describe('asyncSumOfArray', () => {
    test('[1, 1]を渡すと2が返ってくる', async () => {
      // act
      const result = await asyncSumOfArray([1, 1]);
      // assert
      expect(result).toBe(2);
    });

    test('空の配列を渡すと例外が送出される', async () => {
      await expect(asyncSumOfArray([])).rejects.toThrow(Error);
    });

    test('[1]を渡すと1が返ってくる', async () => {
      // Act
      const result = await asyncSumOfArray([1]);
      // Assert
      expect(result).toBe(1);
    });

    test('[-2, 2]を渡すと0が返ってくる', async () => {
      // Act
      const result = await asyncSumOfArray([-2, 2]);
      // Assert
      expect(result).toBe(0);
    });

    test('[0.2, 0.1]を渡すと0.3が返ってくる', async () => {
      // Act
      const result = await asyncSumOfArray([0.2, 0.1]);
      // Assert
      // expect(result).toBe(0.3) // fails
      expect(result).toBeCloseTo(0.3);
    });
  });

  describe('asyncSumOfArraySometimesZero', () => {
    const databaseMock: DatabaseMock = {
      save: jest.fn(),
    };

    test('DI: [1, 1]を渡せば2が返ってくる', async () => {
      // Arrange

      // Act
      const result = await asyncSumOfArraySometimesZero([1, 1], databaseMock);
      // Arange
      expect(databaseMock.save).toBeCalledWith([1, 1]);
      expect(result).toBe(2);
    });

    test('DI: []を渡せば0が返ってくる', async () => {
      // Arrange

      // Act
      const result = await asyncSumOfArraySometimesZero([], databaseMock);
      // Arange
      expect(databaseMock.save).toBeCalledWith([]);
      expect(result).toBe(0);
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

    test('取得した名前の長さが指定した最大値よりも短い場合はそのまま返す', async () => {
      // Arrange
      const firstName = '1234';
      const nameApiServiceMock = nameAppServiceMockFactory(firstName);
      // Act
      const actual = await getFirstNameThrowIfLong(5, nameApiServiceMock);
      // Assert
      expect(actual).toBe(firstName);
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
        expect(e).toThrow(Error);
      }
    });
  });
});
