import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class HomeProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public getAllConsoles() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT c.*, t.tipo_console_nome as tipo_console_nome FROM consoles c inner join tipo_console t on c.tipo_console_id = t.id ORDER BY id DESC';
        var data: any[] = [];
 
        // filtrando pelo nome
        /*if (con_nome) {
          sql += ' and con_nome like ?'
          data.push('%' + con_nome + '%');
        } */
 
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

   public getAllJogos() {
      return this.dbProvider.getDB()
        .then((db: SQLiteObject) => {
          let sql = 'SELECT j.*, p.plataforma_nome as plataforma_nome from jogos j inner join plataforma p on j.plataforma_id = p.id ORDER BY id DESC';
          var data: any[] = [];
   
      
   
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

      public getAllAcessorios() {
        return this.dbProvider.getDB()
          .then((db: SQLiteObject) => {
            let sql = 'SELECT a.*, p.plataforma_nome as plataforma_nome from acessorios a inner join plataforma p on a.plataforma_id = p.id ORDER BY id DESC';
            var data: any[] = [];
     
        
     
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


  /* SELECT jog_nome, jog_desen, jog_dist, jog_duedate, plataforma_id, midia_id, versao_id, genero_id, regiao_id, foto FROM jogos UNION SELECT con_nome, con_empre, con_duedate, tipo_console_id, con_desc, midia_id, foto, NULL AS genero_id, NULL AS regiao_id, NULL AS foto FROM consoles UNION SELECT ace_nome, ace_fabri, ace_duedate, tipo_id, plataforma_id, ace_desc, foto, NULL as genero_id, NULL as regiao_id, NULL AS foto FROM acessorios */