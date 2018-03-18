import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database'; 


@Injectable()
export class MidiaProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public getAll() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
 
      return db.executeSql('select * from midia', [])
        .then((data: any) => {
          if (data.rows.length > 0) {
            let midias: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
              var midia = data.rows.item(i);
              midias.push(midia);
            }
            return midias;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

}
