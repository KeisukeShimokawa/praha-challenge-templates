/* eslint-disable jest/no-try-expect */
/* eslint-disable jest/no-conditional-expect */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';
import { NameApiService } from '../nameApiService';

jest.mock('axios');

describe('nameApiService test suite', () => {
  let nameApiService: NameApiService;
  const axiosGetSpy = jest.spyOn(axios, 'get');

  beforeEach(() => {
    nameApiService = new NameApiService();
  });

  test('axiosで取得した名称の文字列長が4よりも短い場合はそのまま返す', async () => {
    // Arrange
    const expected = '123';
    const testData = {
      data: {
        first_name: expected,
      },
    };
    axiosGetSpy.mockResolvedValue(testData);
    // Act
    const actual = await nameApiService.getFirstName();
    // Assert
    expect(actual).toBe(expected);
  });

  test('axiosで取得した名称の文字列長が4の場合はそのまま返す', async () => {
    // Arrange
    const expected = '1234';
    const testData = {
      data: {
        first_name: expected,
      },
    };
    axiosGetSpy.mockResolvedValue(testData);
    // Act
    const actual = await nameApiService.getFirstName();
    // Assert
    expect(actual).toBe(expected);
  });

  test('axiosで取得した名称の文字列長が4より大きい場合は例外を送出する', async () => {
    // Arrange
    const expectedErrorMsg = 'firstName is too long!';
    const first_name = '12345';
    const testData = {
      data: {
        first_name: first_name,
      },
    };
    axiosGetSpy.mockResolvedValue(testData);
    // Act & Assert
    await expect(nameApiService.getFirstName()).rejects.toThrow(
      new Error(expectedErrorMsg),
    );
  });

  test('axiosで取得した名称の文字列長が4より大きい場合は例外を送出する。no-try-catch', async () => {
    // Arrange
    const expected = 'firstName is too long!';
    const user = { first_name: '12345' };
    const result = { data: user };
    axiosGetSpy.mockResolvedValue(result);

    // Act && Assert
    await expect(nameApiService.getFirstName()).rejects.toThrow(expected);
  });
});
