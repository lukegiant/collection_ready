import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class AcessorioProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(cadace: Cadace) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into acessorios (ace_nome, ace_fabri, ace_duedate, tipo_id, plataforma_id, ace_desc, foto) values (?, ?, ?, ?, ?, ?, ?)';
        let data = [cadace.ace_nome, cadace.ace_fabri, cadace.ace_duedate, cadace.tipo_id, cadace.plataforma_id, cadace.ace_desc, cadace.foto];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(cadace: Cadace) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update acessorios set ace_nome = ?, ace_fabri = ?, ace_duedate = ?, tipo_id = ?, plataforma_id = ?, ace_desc = ?, foto = ? where id = ?';
        let data = [cadace.ace_nome, cadace.ace_fabri, cadace.ace_duedate, cadace.tipo_id, cadace.plataforma_id, cadace.ace_desc, cadace.foto, cadace.id];
 
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
              cadace.plataforma_id = item.plataforma_id;
              cadace.tipo_id = item.tipo_id;
              cadace.ace_desc = item.ace_desc;
              cadace.foto = item.foto;
              
              
 
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
        let sql = 'SELECT a.*, p.plataforma_nome as plataforma_nome from acessorios a inner join plataforma p on a.plataforma_id = p.id';
        var data: any[] = [];
 
        // filtrando pelo nome
        if (ace_nome) {
          sql += ' and a.ace_nome like ? '
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
  plataforma_id: number;
  tipo_id: number;
  ace_desc: string;
  foto: string;


}

/*let sql = 'SELECT a.*, p.plataforma_nome as plataforma_nome from acessorios a inner join plataforma p on a.plataforma_id = p.id';

Tenho o seguinte código no Ionic para listar meus itens e realizar uma busca com a searchbar do ionic:

 public getAll(ace_nome: string = null) {
return this.dbProvider.getDB()
  .then((db: SQLiteObject) => {
    let sql = 'SELECT a.*, p.plataforma_nome as plataforma_nome from acessorios a inner join plataforma p on a.plataforma_id = p.id';
    var data: any[] = [];

    // filtrando pelo nome
    if (ace_nome) {
      sql += ' and a.ace_nome like ? '
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
Preciso agora ordenar essa lista pelo id de forma decrescente. Tentei colocar o comando "ORDER BY id DESC" no final da primeira query e funcionou, porém a segunda (usado na searchbar) parou de funcionar. Como devo fazer nesse caso para que tudo funcione?

Abraços!

*/