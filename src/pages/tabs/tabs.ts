import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
 
  tab1Root: any = 'HomePage';
  tab2Root: any = 'AuthenticationPage';
  tab3Root: any = 'AvailabilityPage';
  tab4Root: any = 'AppointmentPage';
  tab5Root: any = 'ReportPage';
  tab6Root: any = 'ProfilePage';
  myIndex: number;
 
  constructor(navParams: NavParams) {
    // Set the active tab based on the passed index from menu.ts
    this.myIndex = navParams.data.tabIndex || 0;
  }
}
