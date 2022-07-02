export type TUser = {
  userAccount: string;
  userName: string;
  userLocale: string;
  userLanguage: string;
  userTimezone: string;
  userTimezoneOffset: string;
  userCurrency: string;
};

export interface IUser {
  userAccount: string;
  userName: string;
  userLocale: string;
  userLanguage: string;
  userTimezone: string;
  userTimezoneOffset: string;
  userCurrency: string;
}

export class User {
  userAccount: string;
  userName: string;
  userLocale: string;
  userLanguage: string;
  userTimezone: string;
  userTimezoneOffset: string;
  userCurrency: string;

  constructor(iUser: IUser) {
    this.userAccount = iUser.userAccount;
    this.userName = iUser.userName;
    this.userLocale = iUser.userLocale;
    this.userLanguage = iUser.userLanguage;
    this.userTimezone = iUser.userTimezone;
    this.userTimezoneOffset = iUser.userTimezoneOffset;
    this.userCurrency = iUser.userCurrency;
  }
}

export const USER: IUser = {
  userAccount: 'user01',
  userCurrency: 'JPY',
  userLanguage: 'ja',
  userLocale: 'ja-JP',
  userName: 'テストユーザ０１',
  userTimezone: 'Asia/Tokyo',
  userTimezoneOffset: '+0900',
};
