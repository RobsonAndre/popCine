import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FilmesProvider } from '../../providers/filmes/filmes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[
    FilmesProvider
  ]
})
export class HomePage {

  public filmes = new Array<any>();

  public debug = [
    {title: "Titulo do Filme 01", img:"assets/imgs/debug/debug.png", nota:7.3},
    {title: "Titulo do Filme 02", img:"assets/imgs/debug/debug.png", nota:7.2},
    {title: "Titulo do Filme 03", img:"assets/imgs/debug/debug.png", nota:7.1},
    {title: "Titulo do Filme 04", img:"assets/imgs/debug/debug.png", nota:7.0},
    {title: "Titulo do Filme 05", img:"assets/imgs/debug/debug.png", nota:6.9},
    {title: "Titulo do Filme 06", img:"assets/imgs/debug/debug.png", nota:6.8},
    {title: "Titulo do Filme 07", img:"assets/imgs/debug/debug.png", nota:6.7}
  ];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private filmesProvider: FilmesProvider
  ) {

  }

  ionViewDidLoad(){
    console.log("AQUI");
    /** /
    this.filmesProvider.listarFilmes().subscribe(
      data=>{
        const resp = (data as any);
        const obj_resp = JSON.parse(resp._body);
        this.filmes = obj_resp.results;
        console.log(this.filmes); 
      },error=>{
        console.log(error);
      }
    );
    /**/
    console.log("ALI");
  }

}
