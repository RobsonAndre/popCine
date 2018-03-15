import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FilmesProvider } from '../../providers/filmes/filmes';
import { UtilProvider } from '../../providers/util/util';
import { FilmePage } from '../filme/filme';

/**
 * Generated class for the ModalColecaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-colecao',
  templateUrl: 'modal-colecao.html',
})
export class ModalColecaoPage {
  public filme;
  public colecao;
  public detalhes;
  public titulos;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public viewController: ViewController,
      public filmesProvider:FilmesProvider,
      public utilProvider: UtilProvider
    ) {
  }

  public closeModal(){
    this.viewController.dismiss();
  }

  public abreFilme(id){
    this.navCtrl.push(FilmePage, {id:id});
  }

  private pegaColecao(){
    /**/
    this.filmesProvider.pegarColecao(this.colecao.id).subscribe(data => {
      let retorno = (data as any)._body;
      this.detalhes = JSON.parse(retorno);
      //console.log(this.detalhes);
      this.titulos = this.detalhes.parts;
      this.titulos.sort(function (a, b) {
        if (a.release_date < b.release_date)
          return -1;
        if (a.release_date > b.release_date)
          return 1;
        return 0;
      });
      this.utilProvider.fechaLoading();
    }, error => {
      console.log(error);
      this.utilProvider.fechaLoading();
    })
    /**/
  }

  ionViewDidLoad() {
    this.utilProvider.abreLoading();
    this.filme   = this.navParams.get('arr');
    this.colecao = this.filme.belongs_to_collection;
    this.pegaColecao();
    console.log(this.colecao);

    console.log('ionViewDidLoad ModalColecaoPage');
  }

}
