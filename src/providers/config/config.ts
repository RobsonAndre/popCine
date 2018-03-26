import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let CFGKEY = "config";
let USRKEY = "user";

@Injectable()
export class ConfigProvider {

  private config = {
    showSlide: false
  }

  constructor(public http: HttpClient) {
    console.log('ConfigProvider Ok');
  }

  /**
   * User
   */

  public getConfigUser(): any{
    //recupenrando os dados do usuario
    //console.log("config.ts->getConfigUser")
    let user = JSON.parse(localStorage.getItem(USRKEY));
    return user;
  }

  public setConfigUser(user): any{
    //Gravando no local storage
    localStorage.setItem(USRKEY, JSON.stringify(user));
  }

   /**
   * Config
   */

  public getConfigData(): any{
    //recupenrando
    return localStorage.getItem(CFGKEY);
  }

  public setConfigData(showSlide:boolean = true): any{
    this.config.showSlide = showSlide;
    //Gravando no local storage
    localStorage.setItem(CFGKEY, JSON.stringify(this.config));
  }

}
