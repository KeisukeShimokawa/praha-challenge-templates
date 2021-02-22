/* eslint-disable jest/no-try-expect */
/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/no-disabled-tests */
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

// デフォルト引数のテストを実行するために必要
jest.mock('../util');
jest.mock('../nameApiService');

describe('Jestで単体テストを書こう', () => {
  describe('sumOfArray', () => {
    test('[1, 1]を渡すと2が返ってくる', () => {
      // Arrange
      const expected = 2;
      const testData = [1, 1];
      // Act
      const actual = sumOfArray(testData);
      // Assert
      expect(actual).toBe(expected);
    });

    test.skip('空の配列を渡した際の挙動を例外送出から0を返すように変更したためスキップ', () => {
      // Arrange
      const testData: number[] = [];
      // Act & Assert
      expect(() => {
        sumOfArray(testData);
      }).toThrow(Error);
    });

    test('空の配列を渡すと0が返ってくる', () => {
      // Arrange
      const expected = 0;
      const testData: number[] = [];
      // Act
      const actual = sumOfArray(testData);
      // Assert
      expect(actual).toBe(expected);
    });

    test('[1]を渡すと1が返ってくる', () => {
      // Arrange
      const expected = 1;
      const testData = [1];
      // Act
      const actual = sumOfArray(testData);
      // Assert
      expect(actual).toBe(expected);
    });

    test('[-2, 2]を渡すと0が返ってくる', () => {
      // Arrange
      const expected = 0;
      const testData = [-2, 2];
      // Act
      const actual = sumOfArray(testData);
      // Assert
      expect(actual).toBe(expected);
    });

    test('[0.2, 0.1]を渡すと0.3が返ってくる', () => {
      // Arrange
      const expected = 0.3;
      const testData = [0.2, 0.1];
      // Act
      const actual = sumOfArray(testData);
      // Assert
      // expect(actual).toBe(expected) --> fails
      expect(actual).toBeCloseTo(expected);
    });
  });

  describe('asyncSumOfArray', () => {
    test('[1, 1]を渡すと2が返ってくる', async () => {
      // Arrange
      const expected = 2;
      const testData = [1, 1];
      // Act
      const actual = await asyncSumOfArray(testData);
      // Assert
      expect(actual).toBe(expected);
    });

    test.skip('空の配列を渡した際の挙動を例外送出から0を返すように変更したためスキップ', async () => {
      await expect(asyncSumOfArray([])).rejects.toThrow(Error);
    });

    test('空の配列を渡すと0が返ってくる', async () => {
      // Arrange
      const expected = 0;
      const testData: number[] = [];
      // Act
      const actual = await asyncSumOfArray(testData);
      // Assert
      expect(actual).toBe(expected);
    });

    test('[1]を渡すと1が返ってくる', async () => {
      // Arrange
      const expected = 1;
      const testData = [1];
      // Act
      const actual = await asyncSumOfArray(testData);
      // Assert
      expect(actual).toBe(expected);
    });

    test('[-2, 2]を渡すと0が返ってくる', async () => {
      // Arrange
      const expected = 0;
      const testData = [-2, 2];
      // Act
      const actual = await asyncSumOfArray(testData);
      // Assert
      expect(actual).toBe(expected);
    });

    test('[0.2, 0.1]を渡すと0.3が返ってくる', async () => {
      // Arrange
      const expected = 0.3;
      const testData = [0.2, 0.1];
      // Act
      const actual = await asyncSumOfArray(testData);
      // Assert
      // expect(actual).toBe(expected) --> fails
      expect(actual).toBeCloseTo(expected);
    });
  });

  describe('asyncSumOfArraySometimesZero', () => {
    const databaseMock: DatabaseMock = {
      save: jest.fn(),
    };

    test('デフォルト引数のコンストラクタ', async () => {
      // Arrange
      const testData = [1, 1];
      // Act
      await asyncSumOfArraySometimesZero(testData);
      // Arrange
      expect(DatabaseMock).toHaveBeenCalled();
    });

    test('DI: [1, 1]を渡せば2が返ってくる', async () => {
      // Arrange
      const expected = 2;
      const testData = [1, 1];
      // Act
      const actual = await asyncSumOfArraySometimesZero(testData, databaseMock);
      // Arange
      expect(databaseMock.save).toBeCalledWith(testData);
      expect(actual).toBe(expected);
    });

    test('DI: []を渡せば0が返ってくる', async () => {
      // Arrange
      const expected = 0;
      const testData: number[] = [];
      // Act
      const actual = await asyncSumOfArraySometimesZero(testData, databaseMock);
      // Arange
      expect(databaseMock.save).toBeCalledWith([]);
      expect(actual).toBe(expected);
    });
  });

  describe('getFirstNameThrowIfLong', () => {
    /**
     * クロージャを活用して動的にテスト用の関数を生成する
     *
     * @param firstName テスト実行時の返り値
     */
    const nameAppServiceMockFactory = (firstName: string): NameApiService => {
      const nameApiServiceMock = jest.fn().mockImplementation(() => {
        return {
          MAX_LENGTH: 4,
          getFirstName: jest.fn().mockImplementation(() => {
            return firstName;
          }),
        };
      });
      return nameApiServiceMock();
    };

    test('デフォルト引数のコンストラクタ', async () => {
      jest
        .spyOn(NameApiService.prototype, 'getFirstName')
        .mockResolvedValueOnce('1234');
      await getFirstNameThrowIfLong(5);
      expect(NameApiService).toHaveBeenCalled();
    });

    test('取得した名前の長さが指定した最大値よりも短い場合はそのまま返す', async () => {
      // Arrange
      const expected = '1234';
      const maxNameLength = 5;
      const nameApiServiceMock = nameAppServiceMockFactory(expected);
      // Act
      const actual = await getFirstNameThrowIfLong(
        maxNameLength,
        nameApiServiceMock,
      );
      // Assert
      expect(actual).toBe(expected);
    });

    test('取得した名前の長さが指定した最大値よりも長い場合に例外送出', async () => {
      // Arrange
      const expectedErrorMsg = 'first_name too long';
      const firstName = '1234567';
      const maxNameLength = 5;
      const nameApiServiceMock = nameAppServiceMockFactory(firstName);
      // Act & Assert
      await expect(
        getFirstNameThrowIfLong(maxNameLength, nameApiServiceMock),
      ).rejects.toThrow(new Error(expectedErrorMsg));
    });
  });
});
