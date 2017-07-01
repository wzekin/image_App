export class item{
  Name:string;
  Precent:number;
  Information:string;
}

export class about{
  constructor(string:string){
    let data = JSON.parse(string);
    this.book1 = data["中国植物志"];
    this.book2 = data["中国高等植物"];
    this.book3 = data["中国高等植物图鉴"];
    this.type["key"] = [];
    this.type["value"] = [];
    for(let key in data["形态特征"]){
      if(!data["形态特征"].hasOwnProperty(key)){
        continue;
      }
      if (data["形态特征"][key] === "no"){
        continue;
      }
      this.type["key"].push(key);
      this.type["value"].push(data["形态特征"][key]);
    }
  }
  book1:string;
  book2:string;
  book3:string;
  type = {};
}

export class history{
  constructor(items:item[],Img:string){
    this.items = items;
    let time = new Date();
    this.time = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;
    this.Img = "data:image/png;base64," + Img;
  }
  items:item[];
  time:string;
  Img:string;
}
