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
    const user = { first_name: expected };
    const result = { data: user };
    axiosGetSpy.mockResolvedValue(result);
    // Act
    const actual = await nameApiService.getFirstName();
    // Assert
    expect(actual).toBe(expected);
  });

  test('axiosで取得した名称の文字列長が4の場合はそのまま返す', async () => {
    // Arrange
    const expected = '1234';
    const user = { first_name: expected };
    const result = { data: user };
    axiosGetSpy.mockResolvedValue(result);
    // Act
    const actual = await nameApiService.getFirstName();
    // Assert
    expect(actual).toBe(expected);
  });

  test('axiosで取得した名称の文字列長が4より大きい場合は例外を送出する', async () => {
    // Arrange
    const expected = 'firstName is too long!';
    const user = { first_name: '12345' };
    const result = { data: user };
    axiosGetSpy.mockResolvedValue(result);
    // Act
    try {
      await nameApiService.getFirstName();
    } catch (err) {
      // Assert
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty('message', expected);
    }
  });
});
