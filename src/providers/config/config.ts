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

  public getConfigData(): any{
    //recupenrando
    return localStorage.getItem(CFGKEY);
  }

  public getConfigUser(): any{
    //recupenrando os dados do usuario
    let user = JSON.parse(localStorage.getItem(USRKEY));
    console.log("+++++++++++++++++++++++++++++");
    console.log(user); 
    console.log("+++++++++++++++++++++++++++++");
    return user;
    //return localStorage.getItem(CFGKEY);
  }

  public setConfigData(showSlide:boolean = true): any{
    this.config.showSlide = showSlide;
    //Gravando no local storage
    localStorage.setItem(CFGKEY, JSON.stringify(this.config));
  }

}
