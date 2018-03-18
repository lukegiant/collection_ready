import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';


@Injectable()
export class VersaoProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public getAll() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
 
      return db.executeSql('select * from versao', [])
        .then((data: any) => {
          if (data.rows.length > 0) {
            let versoes: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
              var versao = data.rows.item(i);
              versoes.push(versao);
            }
            return versoes;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

}
