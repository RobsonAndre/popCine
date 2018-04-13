import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PopcineProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class PopcineProvider {

  private baseTokenPath      = "http://papiroweb.com.br/popcine/token/";
  private baseEtiquetaPath   = "http://papiroweb.com.br/popcine/etiqueta/";
  private baseAssistiPath    = "http://papiroweb.com.br/popcine/assisti/";
  private baseGosteiPath     = "http://papiroweb.com.br/popcine/gostei/";
  private baseRecomendoPath  = "http://papiroweb.com.br/popcine/recomendo/";
  private baseDocumentosPath = "http://papiroweb.com.br/popcine/documentos/";
  private baseComentarioPath = "http://papiroweb.com.br/popcine/comentario/";
  
  constructor(public http: HttpClient) {
    console.log('PopcineProvider Ok');
  }
  
  getToken(uid,social,email,nome,imagem,sexo,cover,pnome,snome,fidade,link,localidade,timezone,atualizado,verificado){
    
    return this.http.get(this.baseTokenPath+`?uid=${uid}&social=${social}&email=${email}&nome=${nome}&imagem=${imagem}&sexo=${sexo}&cover=${cover}&pnome=${pnome}&snome=${snome}&fidade=${fidade}&link=${link}&localidade=${localidade}&timezone=${timezone}&atualizado=${atualizado}&verificado=${verificado}&`);
  
  }

  gravaEtiqueta(tk, uid, social, fid, etq) {
    
    let action = 1;
    return this.http.get(this.baseEtiquetaPath+`?action=${action}&token=${tk}&uid=${uid}&social=${social}&fid=${fid}&etiqueta=${etq}&`)

    /** /
    return this.http.post(this.baseApiPath,
                          {'action':1, 'token': tk, '&uid': uid, '&social': social,'&fid':fid+'&etiqueta='+etq+'&'},
                          {headers: {'Content-Type': 'application/json'}});                    
    /**/
  }

  removeEtiqueta(tk, uid, social, fid, etq) {
    
    let action = 2;
    return this.http.get(this.baseEtiquetaPath+`?action=${action}&token=${tk}&uid=${uid}&social=${social}&fid=${fid}&etiqueta=${etq}&`)

  }
  //Assisti
  marcarAssisti(tk, uid, social, fid){
    
    let action = 1;
    return this.http.get(this.baseAssistiPath + `?action=${action}&token=${tk}&uid=${uid}&fid=${fid}&social=${social}&`);
  
  }

  desmarcarAssisti(tk, uid, social, fid){
    
    let action = 2;
    return this.http.get(this.baseAssistiPath + `?action=${action}&token=${tk}&uid=${uid}&fid=${fid}&social=${social}&`);
  
  }

  verificarMarcaAssisti(tk, uid, social, fid){
    let action = 3;
    return this.http.get(this.baseAssistiPath + `?action=${action}&token=${tk}&uid=${uid}&fid=${fid}&social=${social}&`);
  
  }

  marcarGostei(tk, uid, social, fid, nota){
    
    let action = 1;
    return this.http.get(this.baseGosteiPath + `?action=${action}&token=${tk}&uid=${uid}&fid=${fid}&social=${social}&nota=${nota}&`);
  
  }

  desmarcarGostei(tk, uid, social, fid){
    
    let action = 2;
    return this.http.get(this.baseGosteiPath + `?action=${action}&token=${tk}&uid=${uid}&fid=${fid}&social=${social}&`);
  
  }

  verificarMarcaGostei(tk, uid, social, fid){
    
    let action = 3;
    return this.http.get(this.baseGosteiPath + `?action=${action}&token=${tk}&uid=${uid}&fid=${fid}&social=${social}&`);
  
  }


  marcarRecomendo(tk, uid, social, fid){
    
    let action = 1;
    return this.http.get(this.baseRecomendoPath + `?action=${action}&token=${tk}&uid=${uid}&fid=${fid}&social=${social}&`);
  
  }

  desmarcarRecomendo(tk, uid, social, fid){
    
    let action = 2;
    return this.http.get(this.baseRecomendoPath + `?action=${action}&token=${tk}&uid=${uid}&fid=${fid}&social=${social}&`);
  
  }

  verificarMarcaRecomendo(tk, uid, social, fid){
    
    let action = 3;
    return this.http.get(this.baseRecomendoPath + `?action=${action}&token=${tk}&uid=${uid}&fid=${fid}&social=${social}&`);
  
  }

  pegarDocumento(tp){
    
    let action = 3;
    console.log("Tipo:"+tp);
    return this.http.get(this.baseDocumentosPath + `?action=${action}&tipo=${tp}`);
  
  }

  gravaComentario(tk, uid, social, fid, cid, comentario){
    
    let action = 1;
    return this.http.get(this.baseComentarioPath + `?action=${action}&token=${tk}&uid=${uid}&fid=${fid}&social=${social}&cid=${cid}&comentario=${comentario}&`);
    //http://papiroweb.com.br/popcine/comentario/?action=1&token=8cb18ba0c557af5aedcfb16083f99411214acbdd&uid=999&fid=888&social=facebook&comentario=completoAjudacompletoAjudacompletoAjudacompletoAjudacompletoAjudacompletoAjudacompletoAjudacompletoAjudacompletoAjudacompletoAjudacompletoAjudacompletoAjudacompletoAjuda&cid=0

  }

  contarComentarios(tk, uid, social, fid){
    let action = 4;
    return this.http.get(this.baseComentarioPath + `?action=${action}&token=${tk}&uid=${uid}&fid=${fid}&social=${social}&`);
  
  }

  listarComentarios(tk, uid, social, fid, tp=0, cid=0){
    /**
     * tp = define de consulta 
     *    ==0 - pegar todos
     *    !=0 - pegar o meu
     */
    let action = 5;
    let order = (cid)?'ASC':'DESC';
    return this.http.get(this.baseComentarioPath + `?action=${action}&token=${tk}&uid=${uid}&fid=${fid}&social=${social}&tipo=${tp}&cid=${cid}&order=${order}&`);
  }
}