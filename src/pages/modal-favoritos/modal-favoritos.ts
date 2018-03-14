import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';
import { DatabaseProvider } from '../../providers/database/database';
import { SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the ModalFavoritosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-favoritos',
  templateUrl: 'modal-favoritos.html',
})
export class ModalFavoritosPage {
  public filme;
  public favtag;
  public tags = new Array();
  public favoritos;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utilProvider: UtilProvider,
    public viewController: ViewController,
    public dbProvider: DatabaseProvider,
    public alertController: AlertController
  ) {

  }

  //alert confirm
  public confirmaRemove(tag) {
    let confirm = this.alertController.create({
      title: 'Remover Etiqueta?',
      message: 'Deseja remover esta estique do filme?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceitar',
          handler: () => {
            //console.log('Agree clicked');
            this.removeFavoritos(tag);
          }
        }
      ]
    });
    confirm.present();
  }

  public removeFavoritos(etiqueta) {
    //console.log(etiqueta);
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "DELETE FROM filmes_favoritos WHERE id_filme = ? AND etiqueta = ? ";
        let data = [this.filme.id, etiqueta];
        return db.executeSql(sql, data)
          .then(() => {
            //this.utilProvider.showToast("suc: delete no favoritos.");
            this.tags.splice(this.tags.indexOf(etiqueta),1);
          })
          .catch(
            e => {
              this.utilProvider.showToast("err: " + e);
            }
          );
      })
      .catch(
        e => {
          console.log(e)
        }
      );
  }
  
  //Fecha a janela Modal
  public closeModal() {
    //this.viewController.dismiss(this.tags.length);
    this.viewController.dismiss({"qtde": this.tags.length});
  }

  //verifica se a etiqueta já não foi digitada
  private verificaTag(str) {
    console.log((this.tags.indexOf(str) > -1));
    return (this.tags.indexOf(str) > -1)
  }

  //
  public selectFavoritos(id) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "SELECT * FROM filmes_favoritos WHERE id_filme = ?";
        let data = [id];
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let arr: any[] = [];
              for (let i = 0; i < data.rows.length; i++) {
                let favorito = data.rows.item(i);
                console.log("row: " + favorito['etiqueta']);
                this.tags.push(favorito['etiqueta']);
                arr.push(favorito);
              }
              return [];
            } else {
              //this.utilProvider.showToast("Favoritos esta vazio");
              return [];
            }
          })
          .catch();
      })
      .catch(e => {
        this.utilProvider.showToast("err: " + e);
      });
  }

  //insert na base de dados
  public insertFavoritos(filme, etiqueta) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = "INSERT INTO filmes_favoritos (id_filme, titulo_filme, data_lancamento, imagem, poster, etiqueta) VALUES (?, ?, ?, ?, ?, ?)";
        let data = [filme.id, filme.title, filme.release_date, filme.backdrop_path, filme.poster_path, etiqueta];
        return db.executeSql(sql, data)
          .then(() => {
            //this.utilProvider.showToast("suc: insert no favoritos.");
          })
          .catch(
            e => {
              this.utilProvider.showToast("err: " + e);
            }
          );
      })
      .catch(
        e => {
          console.log(e)
        }
      );
  }

  //Prepara a gravaçao do item na tabela de favoritos
  public gravaFavotiros() {
    if (this.favtag == "") {
      this.utilProvider.showToast('Digite uma etiqueta para adicionar aos favoritos');
    } else {
      let t = "#" + this.favtag;
      if (!this.verificaTag(t)) {
        this.tags.push(t);
        this.insertFavoritos(this.filme, t);
        this.utilProvider.showToast('Etiqueta adicionada com sucesso');
      } else {
        this.utilProvider.showToast('Etiqueta já foi adicionada');
      }
      this.favtag = ""
    }
  }

  ionViewDidEnter() {

    this.favtag = "";
    this.filme = this.navParams.get("arr");
    this.favoritos = this.selectFavoritos(this.filme.id);
    console.log('ionViewDidLoad ModalFavoritosPage');
  }

}
