import {Injectable} from '@angular/core';
import {HTTP} from '@ionic-native/http'
import {about, history, item} from './model';
import {Storage} from '@ionic/storage'

const url = 'http://photo.gqmms.wang';

@Injectable()
export class HistoryService {
  constructor(private storage: Storage) {
  }

  saveHistory(information: item[],Img:string): void {
    this.getHistory().then(val =>{
      if (val === null){
        val = [];
      }
      let h = new history(information,Img);
      val.push(h);
      this.storage.set("history", val)
    });
    this.getHistory().then(val =>{
      console.log(val)
    })
  }

  getHistory(): Promise<history[]> {
    return this.storage.get("history")
      .then((val) => val as history[]);
  }

  delHistory(index?: number): void {
    if (index) {
      this.storage.get("history")
        .then(val => {
          val.splice(index, 1);
          this.storage.remove("history");
          this.storage.set("history", val)
        })
    } else {
      this.storage.remove("history")
    }
  }
}

@Injectable()
export class MessageService {
  constructor(private Http: HTTP,
              private hs: HistoryService) {
  }

  predictImg(Img: string): Promise<item[]> {
    return this.Http.post(`${url}/image`, {'img': Img}, {})
      .then(response => {
        let data = JSON.parse(response.data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].Precent !== 0) {
            console.log(`${data[i].Name}.json`);
          } else {
            console.log(data.splice(i));
            i--;
          }
        }
        this.hs.saveHistory(data,Img);
        return data
      })
      .catch(error =>{
        console.log(error)
      })
  }

  getMessage(item: string): Promise<about> {
    return this.Http.get(`${url}/information/${item}.json`, {}, {"Content-Type":"json"})
      .then(response => {
        console.log(typeof response.data);
        return new about(response.data)
      })
      .catch(error =>{
        console.log(error)
      })
  }
}

