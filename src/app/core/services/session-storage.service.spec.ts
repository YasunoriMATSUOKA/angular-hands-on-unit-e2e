import { TestBed } from '@angular/core/testing';
import { AppConst } from 'src/app/pages/constants/app-const';
import { User } from 'src/app/pages/models/user';

import { SessionStorageService } from './session-storage.service';

function createUser(): User {
  return new User({
    userAccount: 'userAccount',
    userName: 'userName',
    userLocale: 'ja-JP',
    userLanguage: 'ja',
    userTimezone: 'Asia/Tokyo',
    userTimezoneOffset: '+09:00',
    userCurrency: 'JPY',
  });
}

describe('SessionStorageService', () => {
  let service: SessionStorageService;
  let expectedUser: User;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageService);
    expectedUser = createUser();
  });

  describe('#constructor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('#setItem, #getItem', () => {
    it('should set and get item', () => {
      SessionStorageService.setItem<User>(
        AppConst.STORAGE_KEY_USER,
        expectedUser
      );
      const resultUser = SessionStorageService.getItem<User>(
        AppConst.STORAGE_KEY_USER
      );
      expect(resultUser.userAccount).toEqual(expectedUser.userAccount);
      expect(resultUser.userName).toEqual(expectedUser.userName);
      expect(resultUser.userLocale).toEqual(expectedUser.userLocale);
      expect(resultUser.userLanguage).toEqual(expectedUser.userLanguage);
      expect(resultUser.userTimezone).toEqual(expectedUser.userTimezone);
      expect(resultUser.userTimezoneOffset).toEqual(
        expectedUser.userTimezoneOffset
      );
      expect(resultUser.userCurrency).toEqual(expectedUser.userCurrency);
    });
  });

  describe('#removeItem', () => {
    it('should remove item', () => {
      SessionStorageService.setItem<User>(
        AppConst.STORAGE_KEY_USER,
        expectedUser
      );
      SessionStorageService.removeItem(AppConst.STORAGE_KEY_USER);
      const errorFunction = () => {
        SessionStorageService.getItem<User>(AppConst.STORAGE_KEY_USER);
      };
      expect(errorFunction).toThrow(new Error('key USER not found!'));
    });
  });
});
