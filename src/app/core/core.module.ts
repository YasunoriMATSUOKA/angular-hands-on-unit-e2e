import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorMessagingComponent } from './components/error-messaging/error-messaging.component';
import { MaterialModule } from '../material/material.module';
import { NgxTranslateModule } from '../ngx-translate/ngx-translate.module';

@NgModule({
  declarations: [LoadingComponent, ErrorMessagingComponent],
  imports: [CommonModule, MaterialModule, NgxTranslateModule],
  exports: [LoadingComponent, ErrorMessagingComponent],
})
export class CoreModule {}
