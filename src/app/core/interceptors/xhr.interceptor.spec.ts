import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { XhrInterceptor } from './xhr.interceptor';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

describe('XhrInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  describe('#intercept', () => {
    const headerName = 'X-Requested-With';
    const expectedValue = 'XMLHttpRequest';

    it('should intercept get method', () => {
      httpClient.get('/test').subscribe((res) => expect(res).toBeTruthy());
      const req = httpTestingController.expectOne({ method: 'GET' });
      expect(req.request.headers.get(headerName)).toBe(expectedValue);
    });

    it('should intercept post method', () => {
      httpClient
        .post('/test', null)
        .subscribe((res) => expect(res).toBeTruthy());
      const req = httpTestingController.expectOne({ method: 'POST' });
      expect(req.request.headers.get(headerName)).toBe(expectedValue);
    });
  });
});
