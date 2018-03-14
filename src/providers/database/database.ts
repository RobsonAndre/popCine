import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { UtilProvider } from '../util/util';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(
    public http: HttpClient,
    public sqlite: SQLite,
    public utilProvider: UtilProvider
  ) {
    //console.log('Hello DatabaseProvider Provider');
  }

  public getDB() {

    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    });

  }
 
  public createDataBase() {
    
    return this.getDB()
    .then((db: SQLiteObject) =>{
        this.createTables(db);
    })
    .catch(e => {
      this.utilProvider.showToast('sqLite getDB err: ' + e);
      //console.log(e)
    });
  }

  private createTables(db:SQLiteObject){
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS filmes_favoritos (id integer primary key AUTOINCREMENT NOT NULL, id_filme integer, titulo_filme TEXT, data_lancamento TEXT, imagem TEXT, poster TEXT, etiqueta TEXT) ']
    ])
    .then(
      data => {
        //.utilProvider.showToast('sqLite createTables Ok');
        //alert("Tabela Existe ou foi criada: "+ data)
        //console.log("Tabela Existe ou foi criada: "+ data)
      }
    )
    .catch(
      err => {
        this.utilProvider.showToast('sqLte createTables Err: ' + err);
        //alert("Erro sqLite: " + err)
        //console.log("Erro ao criar a tabela: " + err)
      }
    );
  }


  
  
  
}
