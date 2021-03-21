/* eslint-disable jest/no-disabled-tests */
import * as functions from '../functions.spy';
import { DatabaseMock } from '../util/index';

jest.mock('../util/index');

describe('spyOnを使ったSpyの使い方を学ぶ', (): void => {
  describe('Diを使用しないバージョン', (): void => {
    const databaseMockMock = DatabaseMock as jest.MockedClass<
      typeof DatabaseMock
    >;

    beforeEach((): void => {
      databaseMockMock.mockClear();
    });

    test('正常ケース', async (): Promise<void> => {
      // Arrange
      const expected = 2;
      const testData = [1, 1];
      databaseMockMock.prototype.save.mockImplementationOnce((): void => {});
      // Act
      const actual = await functions.asyncSumOfArraySometimesZeroWithoutDependancies(
        testData,
      );
      // Assert
      expect(databaseMockMock.prototype.save.mock.calls[0][0]).toEqual(
        testData,
      );
      expect(actual).toBe(expected);
    });

    test('異常ケース', async (): Promise<void> => {
      // Arrange
      const expected = 0;
      const testData = [1, 1];
      databaseMockMock.prototype.save.mockImplementationOnce((): void => {
        throw new Error('fail!');
      });
      // Act
      const actual = await functions.asyncSumOfArraySometimesZeroWithoutDependancies(
        testData,
      );
      // Assert
      expect(databaseMockMock.prototype.save.mock.calls[0][0]).toEqual(
        testData,
      );
      expect(actual).toBe(expected);
    });
  });

  describe('Diを使用するバージョン', (): void => {
    const databaseMockMock = DatabaseMock as jest.MockedClass<
      typeof DatabaseMock
    >;

    beforeEach((): void => {
      databaseMockMock.mockClear();
    });

    test('正常ケース', async (): Promise<void> => {
      // Arrange
      const expected = 2;
      const testData = [1, 1];
      databaseMockMock.prototype.save.mockImplementationOnce((): void => {});
      // Act
      const actual = await functions.asyncSumOfArraySometimesZeroWithDependancies(
        testData,
        databaseMockMock.prototype,
      );
      // Assert
      expect(databaseMockMock.prototype.save.mock.calls[0][0]).toEqual(
        testData,
      );
      expect(actual).toBe(expected);
    });

    test.skip('正常ケース。検証方法が不明なためスキップする', async (): Promise<
      void
    > => {
      // Arrange
      const expected = 2;
      const testData = [1, 1];
      databaseMockMock.mockImplementationOnce(
        (): DatabaseMock => {
          return {
            save: (): void => {},
          };
        },
      );
      // Act
      const actual = await functions.asyncSumOfArraySometimesZeroWithDependancies(
        testData,
        databaseMockMock.prototype,
      );
      // Assert
      expect(
        databaseMockMock.prototype.save.mock.results[0].value.save,
      ).toEqual(testData);
      expect(actual).toBe(expected);
    });

    test('異常ケース', async (): Promise<void> => {
      // Arrange
      const expected = 0;
      const testData = [1, 1];
      databaseMockMock.prototype.save.mockImplementationOnce((): void => {
        throw new Error('fail!');
      });
      // Act
      const actual = await functions.asyncSumOfArraySometimesZeroWithDependancies(
        testData,
        databaseMockMock.prototype,
      );
      // Assert
      expect(databaseMockMock.prototype.save.mock.calls[0][0]).toEqual(
        testData,
      );
      expect(actual).toBe(expected);
    });
  });
});
