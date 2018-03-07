import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FilmesProvider } from '../../providers/filmes/filmes';
import { UtilProvider } from '../../providers/util/util';
import { FilmePage } from '../filme/filme';

/**
 * Generated class for the PessoaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pessoa',
  templateUrl: 'pessoa.html',
})
export class PessoaPage {
  public idPessoa;
  public pessoa;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public filmesProvider: FilmesProvider,
    public utilProvider: UtilProvider
  ) {
  }

  public abreFilme(id){
    this.navCtrl.push(FilmePage, {id:id});
    console.log(id);
  }

  ionViewDidEnter() {
    this.idPessoa = this.navParams.get('id');
    
    this.filmesProvider.pegarPessoa(this.idPessoa).subscribe(data => {
      let retorno = (data as any)._body;
      this.pessoa = JSON.parse(retorno);
      console.log(this.pessoa);
    },error=>{
      console.log(error);
    });
    console.log(this.idPessoa);
  }

}
