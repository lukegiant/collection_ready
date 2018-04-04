import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ConsoleProvider, Cadconsole } from '../../providers/console/console';
import { MidiaProvider } from '../../providers/midia/midia'
import { TipoConsoleProvider } from '../../providers/tipo-console/tipo-console';

@IonicPage()
@Component({
  selector: 'page-edit-console',
  templateUrl: 'edit-console.html',
})
export class EditConsolePage {
  model: Cadconsole;
  midia: any[];
  tipo_console: any[];

  public validCon: any;
  errorNome = false;
  messageNome = "";
  errorEmpre = false;
  messageEmpre = "";
  errorData = false;
  messageData = "";
  errorTipoConsole = false;
  messageTipoConsole = "";




  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private consoleProvider: ConsoleProvider,
    private midiaProvider: MidiaProvider, private tipo_consoleProvider: TipoConsoleProvider, 
    public formBuilder: FormBuilder) {

    this.model = new Cadconsole();

    if (this.navParams.data.id) {
      this.consoleProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })
    }

    this.validCon = formBuilder.group({
      con_nome: ['', Validators.required],
      con_empre: ['', Validators.required], 
      con_duedate: ['', Validators.required],
      tipo_console_id: ['', Validators.required],
      midia_id: [''],
      con_desc: [''],
    })
  }

  ionViewDidLoad() {
    this.midiaProvider.getAll()
      .then((result: any[]) => {
        this.midia = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar as midias', duration: 3000, position: 'botton' }).present();
      });

      this.tipo_consoleProvider.getAll()
      .then((result: any[]) => {
        this.tipo_console = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar os tipos de consoles', duration: 3000, position: 'botton' }).present();
      });
  }

 /* save() {
    this.saveConsole()
      .then(() => {
        this.toast.create({ message: 'Console salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o Console.', duration: 3000, position: 'botton' }).present();
      })
  } */

  private saveConsole() {
    if (this.model.id) {
      return this.consoleProvider.update(this.model);
    } else {
      return this.consoleProvider.insert(this.model);
    }
  }

  public valida() {
    let {con_nome, con_empre, con_duedate, tipo_console_id} = this.validCon.controls;

    if(!this.validCon.valid){
      if(!con_nome.valid){
        this.errorNome = true;
        this.messageNome = 'campo obrigatório'
      } else {
        this.messageNome = '';
      }

      if (!con_empre.valid){
        this.errorEmpre = true;
        this.messageEmpre = 'campo obrigatório'
      } else {
        this.messageEmpre = '';
      }

      if(!con_duedate.valid){
        this.errorData = true;
        this.messageData = 'campo obrigatório'
      } else {
        this.messageData = '';
      }

      if(!tipo_console_id.valid){
        this.errorTipoConsole = true;
        this.messageTipoConsole = 'campo obrigatório'
      } else {
        this.messageTipoConsole = '';
      }
    } else {
      this.saveConsole()
      .then(() => {
        this.toast.create({ message: 'Console salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o Console.', duration: 3000, position: 'botton' }).present();
      })
    }
  }

}



/* 
<ion-list>

    <ion-item>
      <ion-label stacked>Nome</ion-label>
      <ion-input type="text" name="con_nome" [(ngModel)]="model.con_nome"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label stacked>Empresa</ion-label>
      <ion-input type="text" name="con_empre" [(ngModel)]="model.con_empre"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label stacked>Data de Lançamento</ion-label>
      <ion-datetime displayFormat="DD/MMM/YYYY" name="con_duedate" [(ngModel)]="model.con_duedate"></ion-datetime>
    </ion-item>

    <ion-item>
      <ion-label stacked>Tipo</ion-label>
      <ion-select name="tipo_console_id" [(ngModel)]="model.tipo_console_id">
        <ion-option *ngFor="let tipo_consoles of tipo_console" value="{{ tipo_consoles.id }}">{{ tipo_consoles.tipo_console_nome }}</ion-option>
      </ion-select>
    </ion-item>

    <ion-item>
      <ion-label stacked>Midia</ion-label>
      <ion-select name="midia_id" [(ngModel)]="model.midia_id">
        <ion-option *ngFor="let midias of midia" value="{{ midias.id }}">{{ midias.midia_nome }}</ion-option>
      </ion-select>
    </ion-item>

    <ion-item>
        <ion-label stacked>Descrição</ion-label>
        <ion-input type="text" name="con_desc" [(ngModel)]="model.con_desc"></ion-input>
      </ion-item>

  </ion-list>

  <button ion-button block (click)="save()">Salvar</button>
*/