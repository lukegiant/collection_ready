import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class JogosProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(cadjogo: Cadjogo) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into jogos (jog_nome, jog_desen, jog_dist, jog_duedate, jog_plat, midia_id, versao_id, genero_id, regiao_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let data = [cadjogo.jog_nome, cadjogo.jog_desen, cadjogo.jog_dist, cadjogo.jog_duedate, cadjogo.jog_plat, cadjogo.midia_id, cadjogo.versao_id, cadjogo.genero_id, cadjogo.regiao_id];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(cadjogo: Cadjogo) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update jogos set jog_nome = ?, jog_desen = ?, jog_dist = ?, jog_duedate = ?, jog_plat = ?, midia_id = ?, versao_id = ?, genero_id = ?, regiao_id = ? where id = ?';
        let data = [cadjogo.jog_nome, cadjogo.jog_desen, cadjogo.jog_dist, cadjogo.jog_duedate, cadjogo.jog_plat, cadjogo.midia_id, cadjogo.versao_id, cadjogo.genero_id, cadjogo.regiao_id, cadjogo.id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from jogos where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from jogos where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let cadjogo = new Cadjogo();
              cadjogo.id = item.id;
              cadjogo.jog_nome = item.jog_nome;
              cadjogo.jog_desen = item.jog_desen;
              cadjogo.jog_dist = item.jog_dist;
              cadjogo.jog_duedate = item.jog_duedate;
              cadjogo.jog_plat = item.jog_plat;
              cadjogo.midia_id = item.midia_id;
              cadjogo.versao_id = item.versao_id;
              cadjogo.genero_id = item.genero_id;
              cadjogo.regiao_id = item.regiao_id;

              return cadjogo;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll(jog_nome: string = null) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * from jogos';
        var data: any[] = [];

        // filtrando pelo nome
        if (jog_nome) {
          sql += ' and jog_nome like ?'
          data.push('%' + jog_nome + '%');
        }

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let jogos: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var jogo = data.rows.item(i);
                jogos.push(jogo);
              }
              return jogos;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}

export class Cadjogo {
  id: number;
  jog_nome: string;
  jog_desen: string;
  jog_dist: string;
  jog_duedate: Date;
  jog_plat: string;
  midia_id: number;
  versao_id: number;
  genero_id: number;
  regiao_id: number
}

