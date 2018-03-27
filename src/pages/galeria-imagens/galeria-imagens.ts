import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';
import { FilmesProvider } from '../../providers/filmes/filmes';

/**
 * Generated class for the GaleriaImagensPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-galeria-imagens',
  templateUrl: 'galeria-imagens.html',
})
export class GaleriaImagensPage {
  public filme:any;
  public imgs;
  public opcao;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public utilProvider: UtilProvider,
    public filmesProvider: FilmesProvider
  ) {

  }

  public pegarImagens(idFilme){
    this.filmesProvider.pegarImagens(idFilme).subscribe(data => {
      let res = (data as any)._body;
      let obj = JSON.parse(res);
      this.imgs = obj[this.opcao];
      console.log(this.imgs);
    }, error => {
      console.log("Error Cretitos: " + error);
    })
  }

  ionViewDidLoad() {

    this.filme = this.navParams.get('filme');
    console.log(this.filme.id);
    this.opcao = this.navParams.get('arr');
    console.log(this.opcao);
    this.pegarImagens(this.filme.id);
    console.log('ionViewDidLoad GaleriaImagensPage');
  }

}