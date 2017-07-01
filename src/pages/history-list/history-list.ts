/**
 * Created by zekin on 17-5-10.
 */
import {Component} from '@angular/core';

import {ActionSheetController, AlertController, NavController, NavParams} from 'ionic-angular';
import {history, item} from "../../models/model";
import {ItemListPage} from "../item-list/item-list";
import {HistoryService} from "../../models/model.service";

@Component({
  selector: 'page-history-list',
  templateUrl: 'history-list.html'
})
export class HistoryListPage {
  histories: history[];

  constructor(public navCtrl: NavController,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public navP:NavParams,
              private hs: HistoryService,
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.histories = this.navP.get("history");
    console.log(this.histories)
  }

  JumpTo(items: item[]) {
    this.navCtrl.push(ItemListPage, {
      item: items
    })
  }

  deleteOne(index: number) {
    this.hs.delHistory(index);
    this.histories.splice(index, 1)
  }

  deleteAll() {
    this.histories = null;
    this.hs.delHistory()
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '清除历史记录',
          handler: () => {
            let alert = this.alertCtrl.create({
              title: '确认',
              subTitle: '确定要删除历史记录吗?',
              buttons: [{
                text: '确定',
                handler: () => {
                  this.deleteAll();
                  console.log('确定 clicked');
                }
              },
                {
                  text: '取消',
                  handler: () => {
                    console.log('取消 clicked');
                  }
                }]
            });
            alert.present();
          }
        }
      ]
    });
    actionSheet.present();
  }
}
