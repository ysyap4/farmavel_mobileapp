import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { FarmavelProvider } from '../../providers/farmavel';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  type = "password";
  signupForm: FormGroup;

  onLogin() {
    this.navCtrl.push(LoginPage);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private farmavelProvider: FarmavelProvider, private formBuilder: FormBuilder) 
  {
    this.signupForm = this.formBuilder.group
    ({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ]),  this.checkUniqueEmail.bind(this)],
      
      password: ['', Validators.compose([
        Validators.required,
      ])],

      c_password: ['', Validators.compose([
        Validators.required,
      ])],

      name: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  checkUniqueEmail(AC: AbstractControl): Promise<any> {
    const promise = new Promise<any>((resolve, reject)=>{
        setTimeout(()=>{
            let params = {
              "email": AC.value 
            };
            this.farmavelProvider.postData(params, "checkUniqueEmail").then((result) => {
                let response: any = result;
                console.log(response);

                if(response.status == "fail")
                    resolve({ 'unique' : true });
                else
                    resolve(null);
            },
            (err) => {
                console.log("API error: " + err);
                resolve(null);
            });
        }, 500);
    });
    return promise;
  }

  onSignup() {

    this.farmavelProvider.showProgress();

    let params = {
      "name" : this.signupForm.get("name").value,
      "email" : this.signupForm.get("email").value,
      "phone" : this.signupForm.get("phone").value,
      "password" : this.signupForm.get("password").value,
      "c_password" : this.signupForm.get("c_password").value
    };

    this.farmavelProvider.postData(params, "signup").then((result) => {
      let response: any = result;
      console.log(response);

      this.farmavelProvider.dismissProgress();

      if(response.status == "success") {
        this.farmavelProvider.setSessionData('token', response.data.remember_token);
        this.navCtrl.setRoot('TabsPage');
      }
      else {
        this.farmavelProvider.showAlertDialog("Sign Up Fail", response.message);
      }

    }, (err) => {
      this.farmavelProvider.dismissProgress();
      this.farmavelProvider.showServerErrorDialog();
    });
  }

}
