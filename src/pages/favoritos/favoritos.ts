import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { UtilProvider } from '../../providers/util/util';
import { FavoritoListaPage } from '../favorito-lista/favorito-lista';

/**
 * Generated class for the FavoritosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
})
export class FavoritosPage {
  public lista: any[] = [];
  public etiquetas: any[] = [];
  public filmes: any[] = [];
  public poster: any[] = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dbProvider: DatabaseProvider,
    public utilProvider: UtilProvider,
  ) {

  }

  public abreListaFilme(id) {
    this.navCtrl.push(FavoritoListaPage, { id: id });
    console.log(id);
  }

  //Pegando todas as tags - etiquetas
  public tagsFavorito() {

    this.utilProvider.abreLoading();

    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = " SELECT * FROM filmes_favoritos ORDER BY etiqueta";
        let data = [];
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                let fav = data.rows.item(i);
                this.lista.push(fav);
              }
              //console.log(this.etiquetas);
              this.montaLista();
              this.utilProvider.fechaLoading();
              return this.lista;
            } else {
              this.utilProvider.fechaLoading();
              return [];
            }
          })
          .catch(e => {
            this.utilProvider.showToast("#1 err: " + e);
            this.utilProvider.fechaLoading();
          });
      })
      .catch(e => {
        this.utilProvider.showToast("#2 err: " + e);
        this.utilProvider.fechaLoading();
      });
  }

  public montaLista() {
    for (let i = 0; i < this.lista.length; i++) {
      //console.log("*** "+this.lista[i].etiqueta+" ***");
      /**/
      if (this.etiquetas.indexOf(this.lista[i].etiqueta) == -1) {
        this.etiquetas.push(this.lista[i].etiqueta);
        this.filmes[this.lista[i].etiqueta] = 1;
        this.poster[this.lista[i].etiqueta] = this.lista[i].poster;
      } else {
        this.filmes[this.lista[i].etiqueta]++;
        //console.log("### "+this.etiquetas.indexOf(this.lista[i].etiqueta+" ###"));
      }
      /**/
    }
    //console.log("=== " + this.etiquetas.length + " ===");
  }

  ionViewDidEnter() {
    this.lista = [];
    this.etiquetas = [];
    this.tagsFavorito();


    console.log('ionViewDidLoad FavoritosPage');
  }
}