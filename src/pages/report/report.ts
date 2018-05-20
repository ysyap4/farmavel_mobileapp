import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FarmavelProvider } from '../../providers/farmavel';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  token: any;
  reportForm: FormGroup;
  get_medicine: any;
  get_report: any;
  base64Image: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private farmavelProvider: FarmavelProvider, private formBuilder: FormBuilder, private camera: Camera) {
    
    this.farmavelProvider.getSessionData("token").then((val) => {
      this.token = val;
    });
  
    this.reportForm = this.formBuilder.group
    ({
      rep_medicine: ['', Validators.required],
      rep_location: ['', Validators.required],
      rep_info: ['']
    });

    this.get_medicine = navParams.get('get_medicine');
    //this.base64Image = navParams.get('base64Image');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

  goback() {
    this.navCtrl.pop();
    console.log('Click on button Test Console Log');
 }

 submit_report()
 {
    console.log("click");
    console.log(this.reportForm.get('rep_medicine').value);
    console.log(this.reportForm.get('rep_location').value);
    console.log(this.reportForm.get('rep_info').value);

    this.farmavelProvider.showProgress();

    let params = {
      "token" : this.token,
      "rep_medicine" : this.reportForm.get("rep_medicine").value,
      "rep_location" : this.reportForm.get("rep_location").value,
      "rep_info" : this.reportForm.get("rep_info").value
    }
 
    this.farmavelProvider.postData(params, "submit_report").then((result) => {
      let response: any = result;
      console.log(response);

      this.farmavelProvider.dismissProgress();

      if (response.status == "success") {
        this.get_report = response.data;
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
