import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FarmavelProvider } from '../providers/farmavel';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private farmavelProvider: FarmavelProvider
    ) {
      platform.ready().then(() => {

        statusBar.styleDefault();
        splashScreen.hide();
        
        this.farmavelProvider.getSessionData("token").then((val) => {
          if(val && val != null) {
            this.rootPage = 'TabsPage';
          }
          else {
            this.rootPage = 'LoginPage';
          }
        });
      });
    }
}
