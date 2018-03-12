import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../../providers/database/database';
import { UtilProvider } from '../../providers/util/util';
import { FilmePage } from '../filme/filme';

/**
 * Generated class for the FavoritoListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorito-lista',
  templateUrl: 'favorito-lista.html',
})
export class FavoritoListaPage {
  public etiqueta;
  public lista: any[] = [];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dbProvider: DatabaseProvider,
    public utilProvider: UtilProvider,
  ) {
  }
  public abreFilme(id){
    //console.log(id);
    this.navCtrl.push(FilmePage, {id:id});
  }

  public pegafilmes(etiqueta) {
    
    this.utilProvider.abreLoading();

    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = " SELECT * FROM filmes_favoritos WHERE etiqueta = ? ORDER BY titulo_filme";
      let data = [etiqueta];
      return db.executeSql(sql, data)
        .then((data: any) => {
          if(data.rows.length>0){
            for(let i=0; i < data.rows.length; i++){
              let fav = data.rows.item(i);
              this.lista.push(fav);
            }
            this.utilProvider.fechaLoading();
            return this.lista;
          }else{
            this.utilProvider.fechaLoading();
            return [];
          }
        })
        .catch(e => {
          this.utilProvider.showToast("err: " + e);
        });
    })
    .catch(e => {
      this.utilProvider.showToast("err: " + e);
    });

  }

  ionViewDidEnter() {
    
    this.lista = [];
    this.etiqueta = this.navParams.get("id");
    this.pegafilmes(this.etiqueta);
    console.log('ionViewDidLoad FavoritoListaPage');
  }

}
