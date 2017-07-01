import {Component} from '@angular/core';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {ActionSheetController, LoadingController, NavController} from "ionic-angular";
import {HistoryService, MessageService} from "../../models/model.service";
import {ItemListPage} from "../item-list/item-list";
import {HistoryListPage} from "../history-list/history-list";

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(public actionSheetCtrl: ActionSheetController,
              public navCtrl:NavController,
              public loadingCtrl:LoadingController,
              private hs:HistoryService,
              private camera: Camera,
              private messageService: MessageService,) {
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '设置',
      buttons: [
        {
          text: '拍照',
          handler: () => {
            this.takephoto();
          }
        }, {
          text: '从相册选择',
          handler: () => {
            this.choosePhoto();
          }
        }
      ]
    });
    actionSheet.present();
  }

  takephoto() {
    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth:350,
      targetHeight:350,
      allowEdit:true,
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let loading = this.loadingCtrl.create({
        content:"Please wait..."
      });
      loading.present();
      this.messageService.predictImg(imageData)
        .then(message =>{
          loading.dismiss();
          this.navCtrl.push(ItemListPage,{
            item:message
          })
        })
    }, (err) => {
      // Handle error
      console.log(err)
    });
  }

  choosePhoto() {
    let options:CameraOptions = {
      // Some common settings are 20, 50, and 100
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: 0,//0对应的值为PHOTOLIBRARY ，即打开相册
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth:350,
      targetHeight:350,
      allowEdit:true,
      correctOrientation: true  //Corrects Android orientation quirks
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let loading = this.loadingCtrl.create({
        content:"Please wait..."
      });
      loading.present();
      this.messageService.predictImg(imageData)
        .then(message =>{
          loading.dismiss();
          this.navCtrl.push(ItemListPage,{
            item:message
          })
        })
    }, (err) => {
      console.log(err)
    });
  }

  history(){
    this.hs.getHistory().then(value => {
      this.navCtrl.push(HistoryListPage,{
        history:value
      })
    })
  }
}
