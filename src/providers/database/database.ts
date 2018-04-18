import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

  /**
   * Cria um banco caso não exista ou pega um banco existente com o nome no parametro
   */
  public getDB() {
    return this.sqlite.create({
      name: 'colecao_new2.db',
      location: 'default'
    });
  }

  /**
   * Cria a estrutura inicial do banco de dados
   */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {

        // Criando as tabelas
        this.createTables(db);

        // Inserindo dados padrão
        this.insertDefaultItems(db);

      })
      .catch(e => console.log(e));
  }

  /**
   * Criando as tabelas no banco de dados
   * @param db
   */
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS versao (id integer primary key AUTOINCREMENT NOT NULL, versao_nome TEXT)'],
      ['CREATE TABLE IF NOT EXISTS genero (id integer primary key AUTOINCREMENT NOT NULL, genero_nome TEXT)'],
      ['CREATE TABLE IF NOT EXISTS midia (id integer primary key AUTOINCREMENT NOT NULL, midia_nome TEXT)'],
      ['CREATE TABLE IF NOT EXISTS tipo (id integer primary key AUTOINCREMENT NOT NULL, tipo_nome TEXT)'],
      ['CREATE TABLE IF NOT EXISTS regiao (id integer primary key AUTOINCREMENT NOT NULL, regiao_nome TEXT)'],
      ['CREATE TABLE IF NOT EXISTS tipo_console (id integer primary key AUTOINCREMENT NOT NULL, tipo_console_nome TEXT)'],
      ['CREATE TABLE IF NOT EXISTS plataforma (id integer primary key AUTOINCREMENT NOT NULL, plataforma_nome TEXT)'],
      //br
      ['CREATE TABLE IF NOT EXISTS consoles (id integer primary key AUTOINCREMENT NOT NULL,' +  
      'con_nome TEXT,' + 
      'con_empre TEXT,' + 
      'con_duedate DATE,' + 
      'tipo_console_id integer,' + 
      'con_desc TEXT,' + 
      'midia_id integer,' + 
      'foto BLOB,' + 
      'FOREIGN KEY(midia_id) REFERENCES midia(id),' + 
      'FOREIGN KEY(tipo_console_id) REFERENCES tipo_console(id))'],
      //br
      ['CREATE TABLE IF NOT EXISTS acessorios (id integer primary key AUTOINCREMENT NOT NULL,' + 
      'ace_nome TEXT,' + 
      'ace_fabri TEXT,' + 
      'ace_duedate DATE,' + 
      'tipo_id integer,' + 
      'plataforma_id integer,' + 
      'ace_desc TEXT,' + 
      'foto BLOB,' + 
      'FOREIGN KEY(tipo_id) REFERENCES tipo(id),' + 
      'FOREIGN KEY(plataforma_id) REFERENCES plataforma(id))'],
      //br
      ['CREATE TABLE IF NOT EXISTS jogos (id integer primary key AUTOINCREMENT NOT NULL,' + 
      'jog_nome TEXT,' + 
      'jog_desen TEXT,' + 
      'jog_dist TEXT,' +
      'jog_duedate DATE,' + 
      'plataforma_id integer,' + 
      'midia_id integer,' + 
      'versao_id integer,' + 
      'genero_id integer,' + 
      'regiao_id integer,' +
      'foto BLOB,' +
      'FOREIGN KEY(plataforma_id) REFERENCES plataforma(id),' + 
      'FOREIGN KEY(midia_id) REFERENCES midia(id),' + 
      'FOREIGN KEY(versao_id) REFERENCES versao(id),' + 
      'FOREIGN KEY(genero_id) REFERENCES genero(id),' + 
      'FOREIGN KEY(regiao_id) REFERENCES regiao(id))']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  /**
   * Incluindo os dados padrões
   * @param db
   */
  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from midia', {})
      .then((data: any) => {
        //Se não existe nenhum registro
        if (data.rows.item(0).qtd == 0) {

          // Criando as tabelas
          db.sqlBatch([
            ['insert into midia (midia_nome) values (?)', ['Cartucho']],
            ['insert into midia (midia_nome) values (?)', ['CD']],
            ['insert into midia (midia_nome) values (?)', ['DVD']],
            ['insert into midia (midia_nome) values (?)', ['DVD-DL']],
            ['insert into midia (midia_nome) values (?)', ['Blu-Ray']],
            ['insert into midia (midia_nome) values (?)', ['Cartão Flash']],
            ['insert into midia (midia_nome) values (?)', ['Digital']],
            ['insert into midia (midia_nome) values (?)', ['UMD']], 
            ['insert into midia (midia_nome) values (?)', ['GD Rom']],
            ['insert into midia (midia_nome) values (?)', ['HD-DVD']]
          ])
            .then(() => console.log('Dados padrões incluídos'))
            .catch(e => console.error('Erro ao incluir dados padrões', e));

        }
      })

    db.executeSql('select COUNT(id) as qtd from versao', {})
      .then((data: any) => {
        //Se não existe nenhum registro
        if (data.rows.item(0).qtd == 0) {

          // Criando as tabelas
          db.sqlBatch([
            ['insert into versao (versao_nome) values (?)', ['Standard']],
            ['insert into versao (versao_nome) values (?)', ['Special Edition']],
            ['insert into versao (versao_nome) values (?)', ['Premium Edition']],
            ['insert into versao (versao_nome) values (?)', ['Collectors Edition']],
            ['insert into versao (versao_nome) values (?)', ['Game of The Year Edition']],
            ['insert into versao (versao_nome) values (?)', ['Platinum Hits']]
          ])
            .then(() => console.log('Dados padrões incluídos'))
            .catch(e => console.error('Erro ao incluir dados padrões', e));

        }
      })

    db.executeSql('select COUNT(id) as qtd from genero', {})
      .then((data: any) => {
        //Se não existe nenhum registro
        if (data.rows.item(0).qtd == 0) {

          // Criando as tabelas
          db.sqlBatch([
            ['insert into genero (genero_nome) values (?)', ['Ação']],
            ['insert into genero (genero_nome) values (?)', ['Aventura']],
            ['insert into genero (genero_nome) values (?)', ['Estratégia']],
            ['insert into genero (genero_nome) values (?)', ['RPG']],
            ['insert into genero (genero_nome) values (?)', ['MMORPG']],
            ['insert into genero (genero_nome) values (?)', ['Esporte']],
            ['insert into genero (genero_nome) values (?)', ['Corrida']],
            ['insert into genero (genero_nome) values (?)', ['Simulador']],
            ['insert into genero (genero_nome) values (?)', ['Plataforma']],
            ['insert into genero (genero_nome) values (?)', ['Puzzle']],
            ['insert into genero (genero_nome) values (?)', ['Luta']],
            ['insert into genero (genero_nome) values (?)', ['FPS']]
          ])
            .then(() => console.log('Dados padrões incluídos'))
            .catch(e => console.error('Erro ao incluir dados padrões', e));

        }
      })

      db.executeSql('select COUNT(id) as qtd from tipo', {})
      .then((data: any) => {
        //Se não existe nenhum registro
        if (data.rows.item(0).qtd == 0) {

          // Criando as tabelas
          db.sqlBatch([
            ['insert into tipo (tipo_nome) values (?)', ['Joystick']],
            ['insert into tipo (tipo_nome) values (?)', ['Expansão']],
            ['insert into tipo (tipo_nome) values (?)', ['Light Gun']],
            ['insert into tipo (tipo_nome) values (?)', ['Adaptador']],
            ['insert into tipo (tipo_nome) values (?)', ['VR']],
            ['insert into tipo (tipo_nome) values (?)', ['Game Code']]
          ])
            .then(() => console.log('Dados padrões incluídos'))
            .catch(e => console.error('Erro ao incluir dados padrões', e));

        }
      })

      db.executeSql('select COUNT(id) as qtd from regiao', {})
      .then((data: any) => {
        //Se não existe nenhum registro
        if (data.rows.item(0).qtd == 0) {

          // Criando as tabelas
          db.sqlBatch([
            ['insert into regiao (regiao_nome) values (?)', ['JP']],
            ['insert into regiao (regiao_nome) values (?)', ['US']],
            ['insert into regiao (regiao_nome) values (?)', ['UK']],
            ['insert into regiao (regiao_nome) values (?)', ['AU']]
          ])
            .then(() => console.log('Dados padrões incluídos'))
            .catch(e => console.error('Erro ao incluir dados padrões', e));

        }
      })

      db.executeSql('select COUNT(id) as qtd from tipo_console', {})
      .then((data: any) => {
        //Se não existe nenhum registro
        if (data.rows.item(0).qtd == 0) {

          // Criando as tabelas
          db.sqlBatch([
            ['insert into tipo_console (tipo_console_nome) values (?)', ['Console de Videogame']],
            ['insert into tipo_console (tipo_console_nome) values (?)', ['Console Portátil']],
            ['insert into tipo_console (tipo_console_nome) values (?)', ['Computador']],
            ['insert into tipo_console (tipo_console_nome) values (?)', ['Arcade']]
          ])
            .then(() => console.log('Dados padrões incluídos'))
            .catch(e => console.error('Erro ao incluir dados padrões', e));

        }
      })

      db.executeSql('select COUNT(id) as qtd from plataforma', {})
      .then((data: any) => {
        //Se não existe nenhum registro
        if (data.rows.item(0).qtd == 0) {

          // Criando as tabelas
          db.sqlBatch([
            ['insert into plataforma (plataforma_nome) values (?)', ['3DO']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Amiga']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Android']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Aple II']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Arcade']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Atari 2600']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Atari 5200']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Atari 7800']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Atari 800']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Atari Jaguar']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Atari Lynx']],
            ['insert into plataforma (plataforma_nome) values (?)', ['ColecoVision']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Comodore 128']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Comodore 64']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Comodore VIC-20']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Dreamcast']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Famicom Disk System']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Game & Watch']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Game Gear']],
            ['insert into plataforma (plataforma_nome) values (?)', ['GameCube']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Game Boy']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Game Boy Color']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Game Boy Advance']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Genesis/Megadrive']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Intellivision']],
            ['insert into plataforma (plataforma_nome) values (?)', ['iOS']],
            ['insert into plataforma (plataforma_nome) values (?)', ['MAC']],
            ['insert into plataforma (plataforma_nome) values (?)', ['MSX']],
            ['insert into plataforma (plataforma_nome) values (?)', ['N-Gage']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Nintendo 64']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Nintendo DS']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Nintendo 3DS']],
            ['insert into plataforma (plataforma_nome) values (?)', ['NES']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Super Nintendo']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Nintendo Wii']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Nintendo Switch']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Neo Geo']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Neo Geo CD']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Odyssey']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Ouya']],
            ['insert into plataforma (plataforma_nome) values (?)', ['PC']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Philips CD-i']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Ps Vita']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Playstation']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Playstation 2']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Playstation 3']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Playstation 4']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Psn']],
            ['insert into plataforma (plataforma_nome) values (?)', ['PSP']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Sega 32x']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Sega CD']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Sega Master System']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Sega Saturn']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Sega SG-1000']],
            ['insert into plataforma (plataforma_nome) values (?)', ['TurboGrafx 16']],
            ['insert into plataforma (plataforma_nome) values (?)', ['TurboGrafx CD']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Virtual Boy']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Wii U']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Xbox']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Xbox 360']],
            ['insert into plataforma (plataforma_nome) values (?)', ['Xbox One']]
          ])
            .then(() => console.log('Dados padrões incluídos'))
            .catch(e => console.error('Erro ao incluir dados padrões', e));

        }
      })
      .catch(e => console.error('Erro ao consultar a qtd de itens', e));
  }
}


/*


db.executeSql('select COUNT(id) as qtd from versao', {})
    .then((data: any) => {
      //Se não existe nenhum registro
      if (data.rows.item(0).qtd == 0) {
 
        // Criando as tabelas
        db.sqlBatch([
          ['insert into versao (versao_nome) values (?)', ['Standard']],
          ['insert into versao (versao_nome) values (?)', ['Special Edition']],
          ['insert into versao (versao_nome) values (?)', ['Premium Edition']], 
          ['insert into versao (versao_nome) values (?)', ['Collectors Edition']],
          ['insert into versao (versao_nome) values (?)', ['Game of The Year Edition']],
          ['insert into versao (versao_nome) values (?)', ['Platinum Hits']]
        ])
          .then(() => console.log('Dados padrões incluídos'))
          .catch(e => console.error('Erro ao incluir dados padrões', e));
 
      }
    })


db.executeSql('select COUNT(id) as qtd from genero', {})
    .then((data: any) => {
      //Se não existe nenhum registro
      if (data.rows.item(0).qtd == 0) {
 
        // Criando as tabelas
        db.sqlBatch([
          ['insert into genero (genero_nome) values (?)', ['Ação']],
          ['insert into genero (genero_nome) values (?)', ['Aventura']],
          ['insert into genero (genero_nome) values (?)', ['Estratégia']], 
          ['insert into genero (genero_nome) values (?)', ['RPG']],
          ['insert into genero (genero_nome) values (?)', ['MMORPG']],
          ['insert into genero (genero_nome) values (?)', ['Esporte']],
          ['insert into genero (genero_nome) values (?)', ['Corrida']],
          ['insert into genero (genero_nome) values (?)', ['Simulador']],
          ['insert into genero (genero_nome) values (?)', ['Plataforma']],
          ['insert into genero (genero_nome) values (?)', ['Puzzle']],
          ['insert into genero (genero_nome) values (?)', ['Luta']],
          ['insert into genero (genero_nome) values (?)', ['FPS']]
        ])
          .then(() => console.log('Dados padrões incluídos'))
          .catch(e => console.error('Erro ao incluir dados padrões', e));
 
      }
    })



    db.executeSql('select COUNT(id) as qtd from versao', {})
    .then((data: any) => {
      //Se não existe nenhum registro
      if (data.rows.item(0).qtd == 0) {
 
        // Criando as tabelas
        db.sqlBatch([
          ['insert into versao (versao_nome) values (?)', ['Standard']],
          ['insert into versao (versao_nome) values (?)', ['Special Edition']],
          ['insert into versao (versao_nome) values (?)', ['Premium Edition']], 
          ['insert into versao (versao_nome) values (?)', ['Collectors Edition']],
          ['insert into versao (versao_nome) values (?)', ['Game of The Year Edition']],
          ['insert into versao (versao_nome) values (?)', ['Platinum Hits']]
        ])
          .then(() => console.log('Dados padrões incluídos'))
          .catch(e => console.error('Erro ao incluir dados padrões', e));
 
      }
    })*/