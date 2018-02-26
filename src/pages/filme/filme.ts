import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FilmesProvider } from '../../providers/filmes/filmes';

/**
 * Generated class for the FilmePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme',
  templateUrl: 'filme.html',
  providers:[FilmesProvider]
})
export class FilmePage {

  public filme;
  public idFilme;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public filmesProvider: FilmesProvider
  ) {

  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad FilmePage');
    this.idFilme = this.navParams.get("id");
    this.filmesProvider.mostrarFilme(this.idFilme).subscribe(data=>{
      let returno = (data as any)._body;
      this.filme = JSON.parse(returno);
      console.log(this.filme);
    },error=>{
      console.log(error);
    })
  }

}
