import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {HelloIonicPage} from '../pages/hello-ionic/hello-ionic';
import {ItemDetailsPage} from '../pages/item-details/item-details';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Camera} from "@ionic-native/camera";
import {HistoryService, MessageService} from "../models/model.service";
import {HttpModule} from "@angular/http";
import {HTTP} from "@ionic-native/http";
import {ItemListPage} from "../pages/item-list/item-list";
import { File } from '@ionic-native/file';
import { IonicStorageModule } from '@ionic/storage';
import {HistoryListPage} from "../pages/history-list/history-list";


@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ItemListPage,
    HistoryListPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    HistoryListPage,
    ItemDetailsPage,
    ItemListPage,
  ],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    MessageService,
    HistoryService,
    HTTP,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {
}
