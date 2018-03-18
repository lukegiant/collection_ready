import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class AcessorioProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(cadace: Cadace) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into acessorios (ace_nome, ace_fabri, ace_duedate, tipo_id, ace_plat, ace_desc) values (?, ?, ?, ?, ?, ?)';
        let data = [cadace.ace_nome, cadace.ace_fabri, cadace.ace_duedate, cadace.tipo_id, cadace.ace_plat, cadace.ace_desc];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(cadace: Cadace) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update acessorios set ace_nome = ?, ace_fabri = ?, ace_duedate = ?, tipo_id = ?, ace_plat = ?, ace_desc = ? where id = ?';
        let data = [cadace.ace_nome, cadace.ace_fabri, cadace.ace_duedate, cadace.tipo_id, cadace.ace_plat, cadace.ace_desc, cadace.id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from acessorios where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from acessorios where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let cadace = new Cadace();
              cadace.id = item.id;
              cadace.ace_nome = item.ace_nome;
              cadace.ace_fabri = item.ace_fabri;
              cadace.ace_duedate = item.ace_duedate;
              cadace.tipo_id = item.tipo_id;
              cadace.ace_plat = item.ace_plat;
              cadace.ace_desc = item.ace_desc;
 
              return cadace;
            }
 
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public getAll(ace_nome: string = null) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * from acessorios';
        var data: any[] = [];
 
        // filtrando pelo nome
        if (ace_nome) {
          sql += ' and ace_nome like ?'
          data.push('%' + ace_nome + '%');
        }
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let aces: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var acessorio = data.rows.item(i);
                aces.push(acessorio);
              }
              return aces;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}
 
export class Cadace {
  id: number;
  ace_nome: string;
  ace_fabri: string;
  ace_duedate: Date;
  tipo_id: number;
  ace_plat: string;
  ace_desc: string


}
