import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UtilProvider } from '../../providers/util/util';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  //Propriedades
  public slides = [
    {
      title: "Pop Cine",
      description: "Bem vindo, esta é aplição uma de cinéfilos para cinéfilos.",
      image: "assets/imgs/logo.png",
    },
    {
      title: "Cinema",
      description: "Confira as estreias do cimena e fique por dentro das novidades.",
      image: "assets/imgs/slide/cinema.png",
    },
    {
      title: "Séries",
      description: "Saiba tudo sobre a sua série favorita, fatos e curiosidades.",
      image: "assets/imgs/slide/television.png",
    },
    {
      title: "Atores",
      description: "Tudo sobre as principais estrela do cinema e televisão.",
      image: "assets/imgs/slide/mask.png",
    }
  ];
  
  //Metodos
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public utilProvider: UtilProvider
  ) {

  }

  public goToHomePage() {
    //console.log('HomePage');
    this.navCtrl.push(HomePage);
  }

  public ionViewDidLoad() {

    this.utilProvider.verificaConexao();
    console.log('IntroPage Ok');

  }

}
