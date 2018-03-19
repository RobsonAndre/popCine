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
  public cast;
  public crew;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public filmesProvider: FilmesProvider,
    public utilProvider: UtilProvider
  ) {
  }

  public abreFilme(id) {
    this.navCtrl.push(FilmePage, { id: id });
    //console.log(id);
  }

  public abrePage(page, filme, arr) {
    this.navCtrl.push(page, { filme: filme, arr: arr });
    //console.log("AbreFilme no Filme: " + id);
  }
  
  ionViewDidEnter() {

    console.log("PessoaPage Ok");

    this.utilProvider.abreLoading();
    this.idPessoa = this.navParams.get('id');
    this.filmesProvider.pegarPessoa(this.idPessoa).subscribe(data => {
      let retorno = (data as any)._body;
      this.pessoa = JSON.parse(retorno);
      this.cast = this.pessoa.credits.cast;
      //Cast Ordenado
      this.cast.sort(function (a, b) {
        if (a.release_date > b.release_date)
          return -1;
        if (a.release_date < b.release_date)
          return 1;
        return 0;
      });

      //Equipe Tecnica Ordenada
      this.crew = this.pessoa.credits.crew;

      this.crew.sort(function (a, b) {
        if (a.release_date > b.release_date)
          return -1;
        if (a.release_date < b.release_date)
          return 1;
        return 0;
      });

      
      //console.log(this.pessoa);

      this.utilProvider.fechaLoading();

    }, error => {
      console.log(error);

      this.utilProvider.fechaLoading();

    });
  }
}
