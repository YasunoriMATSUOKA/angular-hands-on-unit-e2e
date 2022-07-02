import { TestBed } from '@angular/core/testing';

import { TitleI18nService } from './title-i18n.service';

xdescribe('TitleI18nService', () => {
  let service: TitleI18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleI18nService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
