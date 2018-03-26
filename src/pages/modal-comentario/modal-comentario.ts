import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { UtilProvider } from '../../providers/util/util';

/**
 * Generated class for the ModalComentarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-comentario',
  templateUrl: 'modal-comentario.html',
})
export class ModalComentarioPage {
  public user;
  public filme;
  public comentario;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewController: ViewController,
    public configProvider: ConfigProvider,
    public utilProvider: UtilProvider
  ) {
  }

  //Fecha a janela Modal
  public closeModal() {
    //this.viewController.dismiss(this.tags.length);
    this.viewController.dismiss({"qtde": 1});
  }

  private selectComentario(idFilme){

  }

  ionViewDidEnter() {
    this.user = this.configProvider.getConfigUser();
    this.filme = this.navParams.get("arr");
    this.comentario = this.selectComentario(this.filme.id);
    console.log('ModalComentarioPage Ok');
  }

}
