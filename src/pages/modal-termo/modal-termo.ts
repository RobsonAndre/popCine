import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PopcineProvider } from '../../providers/popcine/popcine';
import { UtilProvider } from '../../providers/util/util';

/**
 * Generated class for the ModalTermoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-termo',
  templateUrl: 'modal-termo.html',
})
export class ModalTermoPage {
  
  public doc;
  public documento;
  public texto;
  public versao;
  public data;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewController: ViewController,
    public popcineProvider: PopcineProvider,
    public utilProvider: UtilProvider
  ) {
  }


  //Fecha a janela Modal
  public closeModal() {
    //this.viewController.dismiss(this.tags.length);
    this.viewController.dismiss();
  }

  pegarDoc(doc){
    return this.popcineProvider.pegarDocumento(doc).subscribe(
      data => {
        let obj: any = data;
        if(obj.success){
          this.versao = obj.versao; 
          this.data   = obj.data; 
          this.texto  = obj.texto; 
        }
        console.log('suc: ' + JSON.stringify(obj));
        this.utilProvider.fechaLoading();
      }, error => {
        this.utilProvider.fechaLoading();
        console.log('err: ' + JSON.stringify(error));
      });
  }

  ionViewDidLoad() {
    this.utilProvider.abreLoading();
    this.doc = this.navParams.get("tp");
    this.documento = this.doc=='t'? 'Termo de Uso':'Política de Privacidade';
    this.pegarDoc(this.doc);
    console.log('ionViewDidLoad ModalTermoPage');
  }

}
