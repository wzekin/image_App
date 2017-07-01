/**
 * Created by zekin on 17-4-29.
 */
import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {item} from "../../models/model";
import {ItemDetailsPage} from "../item-details/item-details";


@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html'
})
export class ItemListPage {
  Items: item[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.Items = navParams.get('item');
  }

  JumpTo(index: string) {
    console.log(index);
    console.log(this.Items[index])
    this.navCtrl.push(ItemDetailsPage, {
      item: this.Items[index]
    })
  }
}
