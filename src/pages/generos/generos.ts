import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FilmesProvider } from '../../providers/filmes/filmes';
import { GeneroFilmePage } from '../genero-filme/genero-filme';
import { UtilProvider } from '../../providers/util/util';

/**
 * Generated class for the GenerosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-generos',
  templateUrl: 'generos.html',
})
export class GenerosPage {
  private generos;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public filmeProvider: FilmesProvider,
    public utilProvider: UtilProvider
  ) {
  }

  public listaFilmes(id,name){
    this.navCtrl.push(GeneroFilmePage, {id:id, name:name});
  }

  ionViewDidLoad() {
    this.generos = this.filmeProvider.listarGeneros();
    
    this.generos.sort(function (a, b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    });

    console.log(this.generos);
    
    console.log('ionViewDidLoad GenerosPage');
  }

}
