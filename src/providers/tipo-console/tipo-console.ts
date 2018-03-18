import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class TipoConsoleProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public getAll() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
 
      return db.executeSql('select * from tipo_console', [])
        .then((data: any) => {
          if (data.rows.length > 0) {
            let tipo_consoles: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
              var tipo_console = data.rows.item(i);
              tipo_consoles.push(tipo_console);
            }
            return tipo_consoles;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

}
