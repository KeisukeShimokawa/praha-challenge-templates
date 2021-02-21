/**
 * Stubとは、テスト対象に外部メソッドから任意の間接入力が出力されるように、
 * テストコード上で事前に関節入力値を設定できるようなTest Doubleに該当する
 *
 * 今回の課題では `getFirstNameThrowIfLong` に該当する。
 */
import * as functions from '../functions.stub';
import { NameApiService } from '../nameApiService';

jest.mock('../nameApiService');

describe('Mockを使ったStubの使い方を学ぶ', (): void => {
  describe('DIを使用しないバージョン', (): void => {
    const nameApiServiceMock = NameApiService as jest.MockedClass<
      typeof NameApiService
    >;

    beforeEach((): void => {
      nameApiServiceMock.mockClear();
    });

    test('正常ケース', async (): Promise<void> => {
      // Arrange
      const expected = '1234';
      const maxNameLength = 5;
      nameApiServiceMock.prototype.getFirstName.mockResolvedValueOnce(expected);
      // Act
      const actual = await functions.getFirstNameThrowIfLongWithoutDependancies(
        maxNameLength,
      );
      // Assert
      expect(nameApiServiceMock).toHaveBeenCalledTimes(1);
      expect(actual).toBe(expected);
    });

    test('異常ケース', async (): Promise<void> => {
      // Arrange
      const expected = 'first_name too long';
      const testData = '123456';
      const maxNameLength = 5;
      nameApiServiceMock.prototype.getFirstName.mockResolvedValueOnce(testData);
      // Act
      expect.assertions(1);
      await expect(
        functions.getFirstNameThrowIfLongWithoutDependancies(maxNameLength),
      ).rejects.toThrow(new Error(expected));
    });
  });

  describe('DIを使用するバージョン', (): void => {
    const nameApiServiceMock = NameApiService as jest.MockedClass<
      typeof NameApiService
    >;

    afterEach((): void => {
      nameApiServiceMock.mockClear();
    });

    test('デフォルト引数', async (): Promise<void> => {
      // Arrange
      const maxNameLength = 5;
      nameApiServiceMock.prototype.getFirstName.mockResolvedValueOnce('some');
      // Act
      await functions.getFirstNameThrowIfLongWithDependancies(maxNameLength);
      // Assert
      expect(nameApiServiceMock).toHaveBeenCalled();
    });

    test('正常ケース', async (): Promise<void> => {
      // Arrange
      const expected = '1234';
      const maxNameLength = 5;
      nameApiServiceMock.prototype.getFirstName.mockResolvedValueOnce(expected);
      // Act
      const actual = await functions.getFirstNameThrowIfLongWithDependancies(
        maxNameLength,
        nameApiServiceMock.prototype,
      );
      // Assert
      expect(actual).toBe(expected);
    });

    test('異常ケース', async (): Promise<void> => {
      // Arrange
      const expected = 'first_name too long';
      const testData = '123456';
      const maxNameLength = 5;
      nameApiServiceMock.prototype.getFirstName.mockResolvedValueOnce(testData);
      // Act
      expect.assertions(1);
      await expect(
        functions.getFirstNameThrowIfLongWithDependancies(
          maxNameLength,
          nameApiServiceMock.prototype,
        ),
      ).rejects.toThrow(new Error(expected));
    });
  });
});
