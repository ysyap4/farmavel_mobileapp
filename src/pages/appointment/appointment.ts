import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FarmavelProvider } from '../../providers/farmavel';
import { DatePickerDirective } from 'ion-datepicker';


/**
 * Generated class for the AppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html',
})
export class AppointmentPage {
  app_location: any;
  token: any;
  appointmentForm: FormGroup;
  app_medicine: any;
  get_medicine: any;
  get_user: any;
  get_date = new Date();
  get_appointment: any;
  location: any;

  @ViewChild(DatePickerDirective) private datepickerDirective:DatePickerDirective;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private farmavelProvider: FarmavelProvider, private formBuilder: FormBuilder) {
    
    this.farmavelProvider.getSessionData("token").then((val) => {
      this.token = val;
    });
  
    this.appointmentForm = this.formBuilder.group
    ({
      app_medicine: ['', Validators.required],
      app_location: ['', Validators.required],
      app_method: ['', Validators.required],
      app_time: ['', Validators.required]
    });

    this.get_medicine = navParams.get('get_medicine');
    this.location = navParams.get('location');
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppointmentPage');
    this.app_location = this.location;
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter AppointmentPage');
    console.log("click");

    this.farmavelProvider.showProgress();

    let params = {
      "token" : this.token
    }
 
    this.farmavelProvider.postData(params, "get_user").then((result) => {
      let response: any = result;
      console.log(response);

      this.farmavelProvider.dismissProgress();

      if (response.status == "success") {
        this.get_user = response.data;
      }
      else if (response.status == "invalid") {
        this.farmavelProvider.showAlertDialog("Fail", response.message);
      }
      else {
        this.farmavelProvider.showAlertDialog("Fail", response.message);
      }

    }, (err) => {
      this.farmavelProvider.dismissProgress();
      this.farmavelProvider.showServerErrorDialog();
    });
    
  }

  goback() {
    this.navCtrl.pop();
    console.log('Click on button Test Console Log');
  }

 show_date($event)
 {
   this.get_date = $event;
 }

  public closeDatepicker(){
    this.datepickerDirective.modal.dismiss();
  }

  make_appointment(get_user, get_date)
 {
    console.log("click");
    console.log(this.appointmentForm.get('app_medicine').value);
    console.log(this.appointmentForm.get('app_location').value);
    console.log(this.appointmentForm.get('app_method').value);
    console.log(this.appointmentForm.get('app_time').value);
    // if ((this.get_date.getMonth()+1) < 10) 
    // {
    //   get_date = this.get_date.getDate().toString()+'/0'+(this.get_date.getMonth()+1).toString()+'/'+this.get_date.getFullYear().toString();
    // }
    // else
    // {
    //   get_date = this.get_date.getDate().toString()+'/'+(this.get_date.getMonth()+1).toString()+'/'+this.get_date.getFullYear().toString();
    // }

    get_date = this.get_date.getDate().toString()+'/'+(this.get_date.getMonth()+1).toString()+'/'+this.get_date.getFullYear().toString();
    

    this.farmavelProvider.showProgress();

    let params = {
      "token" : this.token,
      "app_medicine" : this.appointmentForm.get("app_medicine").value,
      "app_location" : this.appointmentForm.get("app_location").value,
      "app_method" : this.appointmentForm.get("app_method").value,
      "app_date" : get_date,
      "app_time" : this.appointmentForm.get("app_time").value,
    }
 
    this.farmavelProvider.postData(params, "make_appointment").then((result) => {
      let response: any = result;
      console.log(response);

      this.farmavelProvider.dismissProgress();

      if (response.status == "success") {
        this.get_appointment = response.data;
        this.farmavelProvider.showAlertDialog("Success", response.message);
      }
      else if (response.status == "invalid") {
        this.farmavelProvider.showAlertDialog("Fail", response.message);
      }
      else {
        this.farmavelProvider.showAlertDialog("Fail", response.message);
      }

    }, (err) => {
      this.farmavelProvider.dismissProgress();
      this.farmavelProvider.showServerErrorDialog();
    });
  }
}
