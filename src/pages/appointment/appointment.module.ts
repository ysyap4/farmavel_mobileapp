import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentPage } from './appointment';
import { DatePickerModule } from 'ion-datepicker';

@NgModule({
  declarations: [
    AppointmentPage,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentPage),
    DatePickerModule,
  ],
  exports: [
    AppointmentPage,
  ]
})
export class AppointmentPageModule {}
