import {Component} from '@angular/core';

import {NavParams} from 'ionic-angular';
import {about, item} from "../../models/model";
import {MessageService} from "../../models/model.service";


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: item;
  txt: about;

  constructor(public navParams: NavParams, private Ms: MessageService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.Ms.getMessage(this.selectedItem.Name)
      .then(val => {
        this.txt = val;
        console.log(this.txt)
      });
  }

}
