import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the FilmePopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme-popover',
  templateUrl: 'filme-popover.html',
})
export class FilmePopoverPage {
  public opts;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilmePopoverPage');
    this.opts = [
      { title: 'Em Exibição',         component: HomePage, tipo: 'now_playing' },
      { title: 'Filmes em Destaque',  component: HomePage, tipo: 'populares' },
      { title: 'Lançamentos',         component: HomePage, tipo: 'upcoming' },
      { title: 'Melhor Avaliados',    component: HomePage, tipo: 'top_rated' },
      /**/
    ];
  }

  openPage(page) {
    if(this.close()){
      this.navCtrl.push(page.component, {tipo:page.tipo});
    }
    
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.navCtrl.push(page.component, {tipo:page.tipo});
    /** /
    console.log(page);
    this.viewCtrl.dismiss();
    this.navCtrl.setRoot(page.component, { tipo: page.tipo });
    this.navCtrl.popToRoot();
    /**/
  }

  close() {
    console.log("popOver Close");
    this.viewCtrl.dismiss();
    return true;
  }


}
