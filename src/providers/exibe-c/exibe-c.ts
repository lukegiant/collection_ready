import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { Cadconsole } from '../console/console';

@Injectable()
export class ExibeCProvider {

  constructor(private dbProvider: DatabaseProvider) {
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from consoles where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let cadconsole = new Cadconsole();
              cadconsole.id = item.id;
              cadconsole.con_nome = item.con_nome;
              cadconsole.con_empre = item.con_empre;
              cadconsole.con_duedate = item.con_duedate;
              cadconsole.tipo_console_id = item.tipo_console_id;
              cadconsole.midia_id = item.midia_id;
              cadconsole.con_desc = item.con_desc;
              cadconsole.con_foto = item.con_foto;
 
              return cadconsole;
            }
 
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  
}
