import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessagingService {
  private messageProperty: string;

  constructor() {
    this.messageProperty = '';
  }

  getMessageProperty(): string {
    return this.messageProperty;
  }

  setMessageProperty(messageProperty: string): void {
    this.messageProperty = messageProperty;
  }

  clearMessageProperty(): void {
    this.messageProperty = '';
  }

  setupPageErrorMessageFromResponse(error: HttpErrorResponse | Error): void {
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 400:
          this.setMessageProperty('errMessage.http.badRequest');
          break;
        case 401:
          this.setMessageProperty('errMessage.http.unAuthorized');
          break;
        case 404:
          this.setMessageProperty('errMessage.http.notFound');
          break;
        case 500:
          if ('Duplicated key.' === error.error.message) {
            this.setMessageProperty('errMessage.http.duplicateKeyException');
          } else if ('Exclusive error occurred.' === error.error.message) {
            this.setMessageProperty(
              'errMessage.http.exclusiveProcessingException'
            );
          } else if ('There is no stock.' === error.error.message) {
            this.setMessageProperty('errMessage.http.outOfStockException');
          } else if ('Data not found.' === error.error.message) {
            this.setMessageProperty('errMessage.http.datNotFoundException');
          } else {
            this.setMessageProperty('errMessage.http.internalServerError');
          }
          break;
        default:
          this.setMessageProperty('errMessage.http.GenericError');
          break;
      }
    } else if (error instanceof Error) {
      this.setMessageProperty('errMessage.common.unknown');
    }
  }
}
