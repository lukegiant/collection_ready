import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class PlataformaProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public getAll() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
 
      return db.executeSql('select * from plataforma', [])
        .then((data: any) => {
          if (data.rows.length > 0) {
            let plataformas: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
              var plataforma = data.rows.item(i);
              plataformas.push(plataforma);
            }
            return plataformas;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

}
