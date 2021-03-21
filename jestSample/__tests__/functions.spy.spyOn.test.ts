import * as functions from '../functions.spy';
import { DatabaseMock } from '../util/index';

describe('spyOnを使ったSpyの使い方を学ぶ', (): void => {
  describe('Diを使用しないバージョン', (): void => {
    let spy: jest.SpyInstance;

    beforeEach((): void => {
      spy = jest.spyOn(DatabaseMock.prototype, 'save');
    });

    afterEach((): void => {
      // spyして記録した入出力情報をクリアする
      spy.mockClear();
    });

    test('正常ケース', async (): Promise<void> => {
      // Arrange
      const expected = 2;
      const testData = [1, 1];
      spy.mockImplementation((): void => {});
      // Act
      const actual = await functions.asyncSumOfArraySometimesZeroWithoutDependancies(
        testData,
      );
      // Assert
      expect(spy.mock.calls[0][0]).toEqual(testData);
      expect(actual).toBe(expected);
    });

    test('異常ケース', async (): Promise<void> => {
      // Arrange
      const expected = 0;
      const testData = [1, 1];
      spy.mockImplementationOnce((): void => {
        throw new Error('fail!');
      });
      // Act
      const actual = await functions.asyncSumOfArraySometimesZeroWithoutDependancies(
        testData,
      );
      // Assert
      expect(spy.mock.calls[0][0]).toEqual(testData);
      expect(actual).toBe(expected);
    });
  });
});
