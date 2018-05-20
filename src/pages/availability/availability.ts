import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FarmavelProvider } from '../../providers/farmavel';

/**
 * Generated class for the AvailabilityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-availability',
  templateUrl: 'availability.html',
})
export class AvailabilityPage {
  token: any;
  availabilityForm: FormGroup;
  pushed: any;
  medicine: any;
  location: any;
  get_medicine: any;
  get_vas: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private farmavelProvider: FarmavelProvider, private formBuilder: FormBuilder) 
  {
    this.farmavelProvider.getSessionData("token").then((val) => {
      this.token = val;
    });
  
    this.availabilityForm = this.formBuilder.group
    ({
      medicine: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvailabilityPage');
  }

  check_medicine_availability() {

    console.log("click");
    console.log(this.availabilityForm.get('medicine').value);
    console.log(this.availabilityForm.get('location').value);

    this.farmavelProvider.setSessionData("check_medicine_availability", this.availabilityForm.get('medicine').value);

    this.farmavelProvider.showProgress();

    let params = {
      "token" : this.token,
      "medicine" : this.availabilityForm.get("medicine").value,
      "location" : this.availabilityForm.get("location").value
    }
 
    this.farmavelProvider.postData(params, "check_medicine_availability").then((result) => {
      let response: any = result;
      console.log(response);

      this.farmavelProvider.dismissProgress();

      if(response.status == "success") {
        this.get_medicine = response.medicine_data;
        this.get_vas = response.vas_data;
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

  make_appointment(get_medicine) {
    this.pushed = true;
    this.navCtrl.push('AppointmentPage', {
      get_medicine: get_medicine,
      location: this.availabilityForm.get("location").value
    });
  }

}
