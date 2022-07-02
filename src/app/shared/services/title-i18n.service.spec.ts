import { TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { TitleI18nService } from './title-i18n.service';

describe('TitleI18nService', () => {
  let service: TitleI18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule.withTranslations({
          ja: require('src/assets/i18n/ja.json'),
        }),
      ],
    });
    service = TestBed.inject(TitleI18nService);
  });

  describe('#constructor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('#setTitle', () => {
    it('should set title', () => {
      const screenName = 'sign-in';
      const expectedTitleSystem = '【Example Site】';
      const expectedTitleSub = 'ログイン';

      service.setTitle(screenName);
      expect(service.title.getTitle()).toBe(
        expectedTitleSystem + expectedTitleSub
      );
    });
  });
});
