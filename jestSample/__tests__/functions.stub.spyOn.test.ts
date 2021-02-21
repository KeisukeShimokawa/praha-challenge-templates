/**
 * Stubとは、テスト対象に外部メソッドから任意の間接入力が出力されるように、
 * テストコード上で事前に関節入力値を設定できるようなTest Doubleに該当する
 *
 * 今回の課題では `getFirstNameThrowIfLong` に該当する。
 */
import * as functions from '../functions.stub';
import { NameApiService } from '../nameApiService';

describe('spyOnを使ったStubの使い方を学ぶ', (): void => {
  describe('DIを使用しないバージョン', (): void => {
    let spy: jest.SpyInstance;

    beforeEach((): void => {
      spy = jest.spyOn(NameApiService.prototype, 'getFirstName');
    });

    afterEach((): void => {
      spy.mockRestore();
    });

    test('正常ケース', async (): Promise<void> => {
      // Arrange
      const expected = '1234';
      const maxNameLength = 5;
      spy.mockResolvedValueOnce(expected);
      // Act
      const actual = await functions.getFirstNameThrowIfLongWithoutDependancies(
        maxNameLength,
      );
      // Assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(actual).toBe(expected);
    });

    test('異常ケース', async (): Promise<void> => {
      // Arrange
      const expected = 'first_name too long';
      const testData = '123456';
      const maxNameLength = 5;
      spy.mockResolvedValueOnce(testData);
      // Act
      // Assert
      await expect(
        functions.getFirstNameThrowIfLongWithoutDependancies(maxNameLength),
      ).rejects.toThrow(new Error(expected));
    });
  });
});
