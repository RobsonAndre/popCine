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
  public comentarios;
  public cid;
  public tab1:boolean = false;
  public tab2:boolean = false;
  public foiComentado:boolean = true;
  public cdata;
  public cresposta;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    public configProvider: ConfigProvider,
    public utilProvider: UtilProvider,
    public popcineProvider: PopcineProvider
  ) {
  }


  //ativa aba
  public activeAba(aba){
    if(aba==1){
      this.verificaComentario(this.filme.id);
      this.comentarios = "";
      this.tab1 = true;
      this.tab2 = false;
    }else{
      this.utilProvider.abreLoading();
      this.verificaTodosComentarios(this.filme.id);
      this.tab1 = false;
      this.tab2 = true;
    }
  }
  //Fecha a janela Modal
  public closeModal() {
    //this.viewController.dismiss(this.tags.length);
    this.viewController.dismiss();
  }

  public enviarComentario() {
    /**/
    if (this.comentario) {
      return this.popcineProvider.gravaComentario(this.user.token, this.user.uid, this.user.social, this.filme.id, this.cid, this.comentario).subscribe(
        data => {
          let obj: any = data;
          if (obj.success) {
            this.utilProvider.showToast("Comentário gravado com sucesso!");
            //this.closeModal();
            this.activeAba(1);
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

  private verificaTodosComentarios(idFilme,cid=0){
    let tp = 0;//listar todos os comentarios
    return this.popcineProvider.listarComentarios(this.user.token, this.user.uid, this.user.social, this.filme.id, tp, cid).subscribe(
      data => {
        let obj: any = data;
        if (obj.success) {
          if(obj.linhas>0){
            //console.log(JSON.stringify(obj.comentarios[0].comentario));
            this.comentarios = obj.comentarios;
            console.log(JSON.stringify(this.comentarios));
            this.utilProvider.showToast("Todos os comentários!");
          }else{
            // nao tem comentario deste usuário
            this.utilProvider.showToast("Não tem comentarios!");
          }
          console.log('linhas: '+ obj.linhas);
        } else {
          this.utilProvider.showToast("Erro: " + obj.status_code + " - " + obj.status_message);
        }
        this.utilProvider.fechaLoading();
        //console.log('suc: ' + JSON.stringify(data));
      }, error => {
        this.utilProvider.fechaLoading();
        console.log('err: ' + JSON.stringify(error));
      }
    )
  }
  
  private verificaComentario(idFilme) {
    return this.popcineProvider.listarComentarios(this.user.token, this.user.uid, this.user.social, this.filme.id, 1).subscribe(
      data => {
        let obj: any = data;
        if (obj.success) {
          if(obj.linhas>0){
            console.log(JSON.stringify(obj));
            this.foiComentado = true;
            this.comentario = obj.comentarios[0].comentario;
            this.cdata      = obj.comentarios[0].data;
            this.cresposta  = obj.comentarios[0].resposta;
            //pegando as respostas
            if(this.cresposta>0){
              this.verificaTodosComentarios(this.filme.id, obj.comentarios[0].id);
            }else{
              this.utilProvider.fechaLoading();
            }
            this.utilProvider.showToast("Já foi Comentado!");
          }else{
            // nao tem comentario deste usuário
            this.foiComentado = false;
            this.utilProvider.showToast("Ainda nao foi Comentado!");
            this.utilProvider.fechaLoading();
          }
          console.log('linhas: '+ obj.linhas);
        } else {
          this.utilProvider.showToast("Erro: " + obj.status_code + " - " + obj.status_message);
          this.utilProvider.fechaLoading();
        }
        //console.log('suc: ' + JSON.stringify(data));
      }, error => {
        this.utilProvider.fechaLoading();
        console.log('err: ' + JSON.stringify(error));
      }
    )
  }

  ionViewDidEnter() {
    this.tab1 = false;
    this.tab2 = false;
    this.utilProvider.abreLoading();
    this.user = this.configProvider.getConfigUser();
    this.filme = this.navParams.get("arr");
    this.activeAba(1);
    //this.verificaComentario(this.filme.id);
    console.log('ModalComentarioPage Ok');
  }

}
