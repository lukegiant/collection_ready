import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';


@Injectable()
export class RegiaoProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public getAll() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
 
      return db.executeSql('select * from regiao', [])
        .then((data: any) => {
          if (data.rows.length > 0) {
            let regioes: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
              var regiao = data.rows.item(i);
              regioes.push(regiao);
            }
            return regioes;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

}
