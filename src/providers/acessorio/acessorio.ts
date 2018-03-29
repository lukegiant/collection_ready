import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class AcessorioProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(cadace: Cadace) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into acessorios (ace_nome, ace_fabri, ace_duedate, tipo_id, plataforma_id, ace_desc) values (?, ?, ?, ?, ?, ?)';
        let data = [cadace.ace_nome, cadace.ace_fabri, cadace.ace_duedate, cadace.tipo_id, cadace.plataforma_id, cadace.ace_desc];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(cadace: Cadace) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update acessorios set ace_nome = ?, ace_fabri = ?, ace_duedate = ?, tipo_id = ?, plataforma_id = ?, ace_desc = ? where id = ?';
        let data = [cadace.ace_nome, cadace.ace_fabri, cadace.ace_duedate, cadace.tipo_id, cadace.plataforma_id, cadace.ace_desc, cadace.id];
 
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
              cadace.plataforma_id = item.plataforma_id;
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
        let sql = 'SELECT a.*, p.plataforma_nome as plataforma_nome from acessorios a inner join plataforma p on a.plataforma_id = p.id ORDER BY id DESC';
        var data: any[] = [];
 
        // filtrando pelo nome
        if (ace_nome) {
          sql += ' and ace_nome like ?'
          data.push('%' + ace_nome + '%');
        } 
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let acessorios: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var acess = data.rows.item(i);
                acessorios.push(acess);
              }
              return acessorios;
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
  plataforma_id: number;
  ace_desc: string


}
