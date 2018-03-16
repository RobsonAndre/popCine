import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let CFGKEY = "config"
@Injectable()
export class ConfigProvider {

  private config = {
    showSlide: false
  }

  constructor(public http: HttpClient) {
    console.log('Hello ConfigProvider Provider');
  }

  public getConfigData(): any{
    //recupenrando
    return localStorage.getItem(CFGKEY);
  }

  public setConfigData(showSlide:boolean = true): any{
    this.config.showSlide = showSlide;
    //Gravando
    localStorage.setItem(CFGKEY, JSON.stringify(this.config));
  }

}
