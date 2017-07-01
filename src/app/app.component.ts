import {Component} from '@angular/core';

import {Platform} from 'ionic-angular';

import {HelloIonicPage} from '../pages/hello-ionic/hello-ionic';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  // make HelloIonicPage the root (or first) page
  rootPage = HelloIonicPage;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
