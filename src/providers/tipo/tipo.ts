import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class TipoProvider {

  constructor(private dbProvider: DatabaseProvider) {  }

  public getAll() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
 
      return db.executeSql('select * from tipo', [])
        .then((data: any) => {
          if (data.rows.length > 0) {
            let tipos: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
              var tipo = data.rows.item(i);
              tipos.push(tipo);
            }
            return tipos;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

}
