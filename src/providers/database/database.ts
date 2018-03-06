import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(
    public http: HttpClient,
    public sqlite: SQLite
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
      //console.log(e)
    });
 
  }

  private createTables(db:SQLiteObject){
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS favoritos (id integer primary key AUTOINCREMENT NOT NULL, id_filme integer, titulo_filme TEXT, data_lancamento TEXT, imagem TEXT, poster TEXT) ']
    ])
    .then(
      data => {
        alert("Tabela Existe ou foi criada: "+ data)
        //console.log("Tabela Existe ou foi criada: "+ data)
      }
    )
    .catch(
      err => {
        alert("Erro ao criar a tabela: " + err)
        //console.log("Erro ao criar a tabela: " + err)
      }
    );
  }
  
}
