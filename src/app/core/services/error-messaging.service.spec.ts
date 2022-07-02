import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ErrorMessagingService } from './error-messaging.service';

describe('ErrorMessagingService', () => {
  let service: ErrorMessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorMessagingService);
  });

  describe('#constructor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('#getMessageProperty, #setMessageProperty', () => {
    it('should return expected response', () => {
      const expectedValue = 'message';
      service.setMessageProperty(expectedValue);
      expect(service.getMessageProperty()).toEqual(expectedValue);
    });
  });

  describe('#clearMessageProperty', () => {
    it('should clear property', () => {
      const expectedValue = 'message';
      service.setMessageProperty(expectedValue);
      expect(service.getMessageProperty()).toEqual(expectedValue);
      service.clearMessageProperty();
      expect(service.getMessageProperty()).toEqual('');
    });
  });

  describe('#setupPageErrorMessageFromResponse', () => {
    const testCases = [
      {
        description: 'should set property when error status is 400',
        error: { status: 400 },
        expectedValue: 'errMessage.http.badRequest',
      },
      {
        description: 'should set property when error status is 401',
        error: { status: 401 },
        expectedValue: 'errMessage.http.unAuthorized',
      },
      {
        description: 'should set property when error status is 404',
        error: { status: 404 },
        expectedValue: 'errMessage.http.notFound',
      },
      {
        description:
          'should set property when error status is 500 _ Duplicated key.',
        error: { status: 500, error: { message: 'Duplicated key.' } },
        expectedValue: 'errMessage.http.duplicateKeyException',
      },
      {
        description:
          'should set property when error status is 500 _ Exclusive error occurred.',
        error: { status: 500, error: { message: 'Exclusive error occurred.' } },
        expectedValue: 'errMessage.http.exclusiveProcessingException',
      },
      {
        description:
          'should set property when error status is 500 _ There is no stock.',
        error: { status: 500, error: { message: 'There is no stock.' } },
        expectedValue: 'errMessage.http.outOfStockException',
      },
      {
        description:
          'should set property when error status is 500 _ Data not found.',
        error: { status: 500, error: { message: 'Data not found.' } },
        expectedValue: 'errMessage.http.datNotFoundException',
      },
      {
        description:
          'should set property when error status is 500 _ Another message',
        error: { status: 500, error: { message: 'Another message' } },
        expectedValue: 'errMessage.http.internalServerError',
      },
      {
        description: 'should set property when error status is 501',
        error: { status: 501 },
        expectedValue: 'errMessage.http.GenericError',
      },
      {
        description:
          "should set property when error is instanceof Error _ 'Unknown error'",
        error: { status: undefined, message: 'Unknown error' },
        expectedValue: 'errMessage.common.unknown',
      },
    ];

    testCases.forEach((testCase) => {
      it(testCase.description, () => {
        let error: HttpErrorResponse | Error;
        if (testCase.error.status) {
          error = new HttpErrorResponse({
            status: testCase.error.status,
            error: new Error(testCase.error.error?.message),
          });
        } else {
          error = new Error(testCase.error.message);
        }
        service.setupPageErrorMessageFromResponse(error);
        expect(service.getMessageProperty()).toEqual(testCase.expectedValue);
      });
    });
  });
});
