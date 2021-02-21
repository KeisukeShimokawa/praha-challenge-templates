import { NameApiService } from './nameApiService';

export const getFirstNameThrowIfLongWithoutDependancies = async (
  maxNameLength: number,
): Promise<string> => {
  const nameApiSerivce = new NameApiService();
  const firstName = await nameApiSerivce.getFirstName();

  if (firstName.length > maxNameLength) {
    throw new Error('first_name too long');
  }
  return firstName;
};

export const getFirstNameThrowIfLongWithDependancies = async (
  maxNameLength: number,
  nameApiSerivce: NameApiService = new NameApiService(),
): Promise<string> => {
  const firstName = await nameApiSerivce.getFirstName();

  if (firstName.length > maxNameLength) {
    throw new Error('first_name too long');
  }
  return firstName;
};
