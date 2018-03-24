import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PopcineProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PopcineProvider {

  //private baseApiPath = "http://papiroweb.com.br/popcine/etiqueta/"
  private baseApiPath = "http://papiroweb.com.br/popcine/etiqueta/"
  private token       = "a079b173f42a0ec8861f702eec3ae62417181796"

  constructor(public http: HttpClient) {
    console.log('PopcineProvider Ok');
  }


  gravaEtiqueta(uid, social, fid, etq, tk = this.token ) {
    
    let action = 1;
    /**/
    console.log("############ Params ############");
    console.log("uid: "+uid);
    console.log("soc: "+social);
    console.log("fid: "+fid);
    console.log("etq: "+etq);
    console.log("tok: "+tk);
    console.log("act: "+action);
    console.log("################################");
    /**/
    
    return this.http.get(this.baseApiPath+`?action=${action}&token=${this.token}&uid=${uid}&social=${social}&fid=${fid}&etiqueta=${etq}&`)

    //{responseType: 'text'}}
    /**  /
    console.log("############ Params ############");
    console.log("uid: "+uid);
    console.log("soc: "+social);
    console.log("fid: "+fid);
    console.log("etq: "+etq);
    console.log("tok: "+tk);
    console.log("################################");
    return this.http.post(this.baseApiPath,
                          {'action':1, 'token': tk, '&uid': uid, '&social': social,'&fid':fid+'&etiqueta='+etq+'&'},
                          {headers: {'Content-Type': 'application/json'}});                    
    /**/
  }

  removeEtiqueta(uid, social, fid, etq, tk = this.token ) {
    
    let action = 2;
    /**/
    console.log("'''''''''''' Params ''''''''''''");
    console.log("uid: "+uid);
    console.log("soc: "+social);
    console.log("fid: "+fid);
    console.log("etq: "+etq);
    console.log("tok: "+tk);
    console.log("act: "+action);
    console.log("''''''''''''''''''''''''''''''''");
    /**/
    
    return this.http.get(this.baseApiPath+`?action=${action}&token=${this.token}&uid=${uid}&social=${social}&fid=${fid}&etiqueta=${etq}&`)

  }
}
