import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class HomeProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public getAllItens(con_nome: string = null) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT c.*, t.tipo_console_nome as tipo_console_nome FROM consoles c inner join tipo_console t on c.tipo_console_id = t.id ORDER BY id DESC LIMIT 2';
        var data: any[] = [];
 
        // filtrando pelo nome
        if (con_nome) {
          sql += ' and con_nome like ?'
          data.push('%' + con_nome + '%');
        } 
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let itens: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var item = data.rows.item(i);
                itens.push(item);
              }
              return itens;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
    }
  }
