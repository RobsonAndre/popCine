import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PopcineProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PopcineProvider {
  
  private baseApiPath = "http://papiroweb.com.br/popcine/etiqueta/?"
  private token       = "04e4908277300ccf134ec0014cff4df3a70c7931"

  constructor(public http: HttpClient) {
    console.log('PopcineProvider Ok');
  }


  gravaEtiqueta(uid, social, fid, etq){
    return this.http.get(this.baseApiPath+`action=1&token=${this.token}&uid=${uid}&social=${social}&fid=${fid}&etiqueta=${etq}&`)
  }

}
