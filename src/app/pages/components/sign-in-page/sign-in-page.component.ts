import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { RoutingService } from 'src/app/core/services/routing.service';
import { TitleI18nService } from 'src/app/shared/services/title-i18n.service';
import { UrlConst } from '../../constants/url-const';
import { SignInRequestDto } from '../../models/dtos/requests/sign-in-request-dto';
import { SignInResponseDto } from '../../models/dtos/responses/sign-in-response-dto';
import { IUser, User } from '../../models/user';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
})
export class SignInPageComponent implements OnInit, AfterViewChecked {
  signInUserAccount = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  signInUserPassword = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  signInForm = this.formBuilder.group({
    signInUserAccount: this.signInUserAccount,
    signInUserPassword: this.signInUserPassword,
  });

  constructor(
    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private routingService: RoutingService,
    private loadingService: LoadingService,
    private titleI18nService: TitleI18nService
  ) {}

  ngOnInit(): void {
    this.setupLanguage();
  }

  ngAfterViewChecked(): void {
    this.titleI18nService.setTitle(UrlConst.PATH_SIGN_IN);
  }

  clickSignInButton() {
    const signInRequestDto = this.createSignInRequestDto();
    this.signIn(signInRequestDto);
  }

  private signIn(signInRequestDto: SignInRequestDto) {
    this.loadingService.startLoading();

    const signInResponseDto$: Observable<SignInResponseDto | undefined> =
      this.accountService.signIn(signInRequestDto);
    signInResponseDto$.subscribe((signInResponseDto) => {
      if (!signInResponseDto) {
        this.loadingService.stopLoading();
        throw Error('Failed to sign in!');
      }
      this.setUpUserAccount(signInResponseDto);
      this.routingService.navigate(UrlConst.PATH_PRODUCT_LISTING);

      this.loadingService.stopLoading();
    });
  }

  private createSignInRequestDto(): SignInRequestDto {
    return {
      Username: this.signInUserAccount.value,
      Password: this.signInUserPassword.value,
    };
  }

  private setupLanguage() {
    this.translateService.setDefaultLang(this.getLanguage(navigator.language));
    this.translateService.use(this.getLanguage(navigator.language));
  }

  private getLanguage(language: string): string {
    const CHAR_HYPHEN = '-';
    if (language.indexOf(CHAR_HYPHEN) > 0) {
      const splittedLanguage: string[] = language.split(CHAR_HYPHEN);
      return splittedLanguage[0];
    }
    return language;
  }

  private setUpUserAccount(responseDto: SignInResponseDto) {
    const userData: IUser = {
      userAccount: responseDto.userAccount,
      userName: responseDto.userName,
      userLocale: responseDto.userLocale,
      userLanguage: responseDto.userLanguage,
      userTimezone: responseDto.userTimezone,
      userTimezoneOffset: responseDto.userTimezoneOffset,
      userCurrency: responseDto.userCurrency,
    };
    const user: User = new User(userData);
    this.accountService.setUser(user);
  }
}
