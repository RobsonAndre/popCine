import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { UtilProvider } from '../../providers/util/util';
import { PopcineProvider } from '../../providers/popcine/popcine';

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
  public cid;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    public configProvider: ConfigProvider,
    public utilProvider: UtilProvider,
    public popcineProvider: PopcineProvider
  ) {
  }

  //Fecha a janela Modal
  public closeModal(item=0) {
    //this.viewController.dismiss(this.tags.length);
    this.viewController.dismiss({'item':item});
  }

  public enviarComentario() {
    /**/
    if (this.comentario) {
      return this.popcineProvider.gravaComentario(this.user.token, this.user.uid, this.user.social, this.filme.id, this.cid, this.comentario).subscribe(
        data => {
          let obj: any = data;
          if (obj.success) {
            this.utilProvider.showToast("Comentário gravado com sucesso!");
            this.closeModal(2);
          } else {
            this.utilProvider.showToast("Erro: " + obj.status_code + " - " + obj.status_message);
          }
          console.log('suc: ' + JSON.stringify(data));
        }, error => {
          console.log('err: ' + JSON.stringify(error));
        }
      )
    } else {
      this.utilProvider.showToast("Digite seu comentário antes de enviar!");
    }
    /**/
  }

  private selectComentario(idFilme) {
    this.comentario = ""
  }

  ionViewDidEnter() {
    this.user = this.configProvider.getConfigUser();
    this.filme = this.navParams.get("arr");
    this.selectComentario(this.filme.id);
    console.log('ModalComentarioPage Ok');
  }

}
