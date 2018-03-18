import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';


@Injectable()
export class GeneroProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public getAll() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
 
      return db.executeSql('select * from genero', [])
        .then((data: any) => {
          if (data.rows.length > 0) {
            let generos: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
              var genero = data.rows.item(i);
              generos.push(genero);
            }
            return generos;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

}
