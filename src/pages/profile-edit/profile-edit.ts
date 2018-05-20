import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { FarmavelProvider } from '../../providers/farmavel';

/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {
  token: any;
  profileForm: FormGroup;
  get_user: any;
  image_link: any;
  display_taken_image: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private farmavelProvider: FarmavelProvider, private formBuilder: FormBuilder, private camera: Camera) {
    this.farmavelProvider.getSessionData("token").then((val) => {
      this.token = val;
    });
  
    this.profileForm = this.formBuilder.group
    ({
      password: ['', Validators.compose([
        Validators.required,
      ])],

      c_password: ['', Validators.compose([
        Validators.required,
      ])],

      name: ['', Validators.required],
      phone: ['', Validators.required],
    });

    this.get_user = navParams.get('get_user');
    this.image_link = navParams.get('image_link');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
  }

  capture_image() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 720,
      correctOrientation: true,
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.display_taken_image = base64Image;
    }, (err) => {
     // Handle error
    });
  }

  edit_profile(get_user, display_taken_image)
  {
    this.farmavelProvider.showProgress();

    let params = {
      "token" : this.token,
      "name" : this.profileForm.get("name").value,
      "email" : this.get_user.email,
      "phone" : this.profileForm.get("phone").value,
      "password" : this.profileForm.get("password").value,
      "c_password" : this.profileForm.get("c_password").value,
      "image" : this.display_taken_image,
    }
 
    this.farmavelProvider.postData(params, "edit_profile").then((result) => {
      let response: any = result;
      console.log(response);

      this.farmavelProvider.dismissProgress();

      if (response.status == "success") {
        this.get_user = response.data;
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

  goback() {
    this.navCtrl.pop();
    console.log('Click on button Test Console Log');
  }

}
