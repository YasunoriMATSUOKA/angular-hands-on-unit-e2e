import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { ApiConst } from '../constants/api-const';
import { SignInRequestDto } from '../models/dtos/requests/sign-in-request-dto';
import { SignInResponseDto } from '../models/dtos/responses/sign-in-response-dto';
import { User } from '../models/user';

import { AccountService } from './account.service';

function createSignInRequestDto(): SignInRequestDto {
  return {
    Username: 'Username',
    Password: 'Password',
  };
}

function createExpectedSignInResponseDto(): SignInResponseDto {
  return {
    userAccount: 'userAccount',
    userName: 'userName',
    userLocale: 'ja-JP',
    userLanguage: 'ja',
    userTimezone: 'Asia/Tokyo',
    userTimezoneOffset: '+0900',
    userCurrency: 'JPY',
  };
}

function createUser(): User {
  return new User({
    userAccount: 'userAccount',
    userName: 'userName',
    userLocale: 'ja-JP',
    userLanguage: 'ja',
    userTimezone: 'Asia/Tokyo',
    userTimezoneOffset: '+0900',
    userCurrency: 'JPY',
  });
}

function assertUser(accountService: AccountService, user: User): void {
  expect(accountService.getUser().userAccount).toEqual(user.userAccount);
  expect(accountService.getUser().userName).toEqual(user.userName);
  expect(accountService.getUser().userLocale).toEqual(user.userLocale);
  expect(accountService.getUser().userLanguage).toEqual(user.userLanguage);
  expect(accountService.getUser().userTimezone).toEqual(user.userTimezone);
  expect(accountService.getUser().userTimezoneOffset).toEqual(
    user.userTimezoneOffset
  );
  expect(accountService.getUser().userCurrency).toEqual(user.userCurrency);
}

describe('AccountService', () => {
  let service: AccountService;
  let httpTestingController: HttpTestingController;
  let errorMessagingServiceSpy: {
    setupPageErrorMessageFromResponse: jasmine.Spy;
  };

  beforeEach(() => {
    errorMessagingServiceSpy = jasmine.createSpyObj('ErrorMessagingService', [
      'setupPageErrorMessageFromResponse',
    ]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ErrorMessagingService, useValue: errorMessagingServiceSpy },
      ],
    });
    service = TestBed.inject(AccountService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#constructor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('#signIn', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_SIGN_IN;

    it('should return expected response', () => {
      const signInRequestDto: SignInRequestDto = createSignInRequestDto();
      const expectedSignInResponseDto: SignInResponseDto =
        createExpectedSignInResponseDto();

      service.signIn(signInRequestDto).subscribe((signInResponseDto) => {
        expect(signInResponseDto).toEqual(expectedSignInResponseDto);
        expect(
          errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()
        ).toBe(0);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('POST');
      req.flush(expectedSignInResponseDto);
    });

    it('should return undefined when response is 401 Unauthorized error', () => {
      const signInRequestDto: SignInRequestDto = createSignInRequestDto();
      const errorStatus = 401;
      const errorMessage = '401 Unauthorized';

      service.signIn(signInRequestDto).subscribe((signInResponseDto) => {
        expect(signInResponseDto).toBeUndefined();
        expect(
          errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()
        ).toBe(1);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('POST');
      req.flush(errorMessage, {
        status: errorStatus,
        statusText: errorMessage,
      });
    });
  });

  describe('#setUser, #getUser', () => {
    it('should return expected data', () => {
      const user: User = createUser();
      service.setUser(user);
      assertUser(service, service.getUser());
    });
  });

  describe('#removeUser', () => {
    it('should remove user', () => {
      const user: User = createUser();
      service.setUser(user);
      assertUser(service, service.getUser());
      service.removeUser();
      const errorFunction = () => {
        service.getUser();
      };
      expect(errorFunction).toThrowError('key USER not found!');
    });
  });
});
