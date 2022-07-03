import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SignInPageComponent } from './sign-in-page.component';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { TitleI18nService } from 'src/app/shared/services/title-i18n.service';
import { SignInRequestDto } from '../../models/dtos/requests/sign-in-request-dto';
import { SignInResponseDto } from '../../models/dtos/responses/sign-in-response-dto';
import { UrlConst } from '../../constants/url-const';
import { of } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { By } from '@angular/platform-browser';
import { HtmlElementUtility } from 'src/app/testing/html-element-utility';

function createExpectedRequestDto(): SignInRequestDto {
  return { Username: 'Username', Password: 'Password' };
}

function createExpectedResponseDto(): SignInResponseDto {
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

function setupBrowserLanguage(language: string): void {
  const defineGetter = '__defineGetter__';
  (window as any).navigator[defineGetter]('language', () => language);
}

describe('SignInPageComponent', () => {
  const expectedSignInRequestDto = createExpectedRequestDto();
  const expectedSignInResponseDto = createExpectedResponseDto();

  let component: SignInPageComponent;
  let fixture: ComponentFixture<SignInPageComponent>;
  let accountServiceSpy: { signIn: jasmine.Spy; setUser: jasmine.Spy };
  let titleI18nServiceSpy: { setTitle: jasmine.Spy };
  let loadingServiceSpy: {
    startLoading: jasmine.Spy;
    stopLoading: jasmine.Spy;
  };
  let router: Router;

  beforeEach(async () => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', [
      'signIn',
      'setUser',
    ]);
    titleI18nServiceSpy = jasmine.createSpyObj('TitleI18nService', [
      'setTitle',
    ]);
    loadingServiceSpy = jasmine.createSpyObj('LoadingService', [
      'startLoading',
      'stopLoading',
    ]);

    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
        TranslateTestingModule.withTranslations({
          ja: require('src/assets/i18n/ja.json'),
        }),
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [
        FormBuilder,
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: TitleI18nService, useValue: titleI18nServiceSpy },
        { provide: LoadingService, useValue: loadingServiceSpy },
      ],
      declarations: [SignInPageComponent],
    }).compileComponents();

    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(SignInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    setupBrowserLanguage('ja');
  });

  describe('#constructor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('#ngAfterViewChecked', () => {
    it('should set title', () => {
      component.ngAfterViewChecked();
      expect(titleI18nServiceSpy.setTitle.calls.count()).toBeGreaterThan(1);
      expect(titleI18nServiceSpy.setTitle).toHaveBeenCalledWith(
        UrlConst.PATH_SIGN_IN
      );
    });
  });

  describe('#signIn', () => {
    it('should not sign in', () => {
      accountServiceSpy.signIn.and.returnValue(of(undefined));
      try {
        component.clickSignInButton();
        expect(accountServiceSpy.setUser.calls.count()).toEqual(0);
      } catch (error) {
        expect((error as Error).message).toBe('Failed to sign in!');
        console.error(error);
      }
    });

    it('should sign in', () => {
      accountServiceSpy.signIn.and.returnValue(of(expectedSignInResponseDto));
      spyOn(router, 'navigate');
      component.clickSignInButton();
      expect(accountServiceSpy.setUser.calls.count()).toEqual(1);
      expect(router.navigate).toHaveBeenCalledWith([
        UrlConst.SLASH + UrlConst.PATH_PRODUCT_LISTING,
      ]);
    });
  });

  describe('#getLanguage', () => {
    const privateMethodName = 'getLanguage';

    it('lang without hyphen', () => {
      const language = 'ja';
      const expectedLanguage = 'ja';
      expect(component[privateMethodName](language)).toEqual(expectedLanguage);
    });

    it('lnag with hypen', () => {
      const language = 'ja-JP';
      const expectedLanguage = 'ja';
      expect(component[privateMethodName](language)).toEqual(expectedLanguage);
    });
  });

  describe('DOM placeholder', () => {
    it('title', () => {
      const htmlDivElement: HTMLDivElement = fixture.debugElement.query(
        By.css('.sign-in-title-wrapper')
      ).nativeElement;
      expect(htmlDivElement.innerText).toContain('EXAMPLE SITE');
    });

    it('sign in user account', () => {
      const htmlInputElement: HTMLInputElement = fixture.debugElement.query(
        By.css('#signin-user-account')
      ).nativeElement;
      expect(htmlInputElement.dataset['placeholder']).toContain(
        'ユーザーアカウント'
      );
    });

    it('sign in user password', () => {
      const htmlInputElement: HTMLInputElement = fixture.debugElement.query(
        By.css('#signin-user-password')
      ).nativeElement;
      expect(htmlInputElement.dataset['placeholder']).toContain('パスワード');
    });

    it('sign in button', () => {
      const htmlButtonElement: HTMLButtonElement = fixture.debugElement.query(
        By.css('#sign-in-button')
      ).nativeElement;
      expect(htmlButtonElement.innerText).toContain('サインイン');
    });
  });

  describe('DOM input test', () => {
    it('sign in user account', () => {
      const expectedValue = 'Username';
      HtmlElementUtility.setValueToHTMLInputElement(
        fixture,
        '#signin-user-account',
        expectedValue
      );
      expect(component.signInUserAccount.value).toEqual(expectedValue);
    });

    it('sign in user password', () => {
      const expectedValue = 'Password';
      HtmlElementUtility.setValueToHTMLInputElement(
        fixture,
        '#signin-user-password',
        expectedValue
      );
      expect(component.signInUserPassword.value).toEqual(expectedValue);
    });
  });

  describe('DOM input validation test', () => {
    it('sign in user account', () => {
      HtmlElementUtility.setValueToHTMLInputElement(
        fixture,
        '#signin-user-account',
        ''
      );
      const validationErrorElement = fixture.debugElement.query(
        By.css('.validation-error')
      ).nativeElement;
      expect(validationErrorElement).toBeTruthy();
    });

    it('sign in user password', () => {
      HtmlElementUtility.setValueToHTMLInputElement(
        fixture,
        '#signin-user-password',
        ''
      );
      const validationErrorElement = fixture.debugElement.query(
        By.css('.validation-error')
      ).nativeElement;
      expect(validationErrorElement).toBeTruthy();
    });
  });

  describe('DOM input test', () => {
    it('should enter input and create request', () => {
      HtmlElementUtility.setValueToHTMLInputElement(
        fixture,
        '#signin-user-account',
        expectedSignInRequestDto.Username
      );
      HtmlElementUtility.setValueToHTMLInputElement(
        fixture,
        '#signin-user-password',
        expectedSignInRequestDto.Password
      );
      const privateMethodName = 'createSignInRequestDto';
      const signInRequestDto: SignInRequestDto = component[privateMethodName]();
      expect(signInRequestDto).toEqual(expectedSignInRequestDto);
    });
  });
});
