import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Cadace, AcessorioProvider } from '../../providers/acessorio/acessorio';
import { TipoProvider } from '../../providers/tipo/tipo';
import { PlataformaProvider } from '../../providers/plataforma/plataforma';


@IonicPage()
@Component({
  selector: 'page-edit-acessorios',
  templateUrl: 'edit-acessorios.html',
})
export class EditAcessoriosPage {
  model: Cadace;
  tipo: any[];
  plataforma: any[];

  public validAce: any;
  errorAce_nome = false;
  errorAce_fabri = false;
  errorAce_duedate = false;
  errorPlataforma_id = false;
  messageAce_nome = "";
  messageAce_fabri = "";
  messageAce_duedate = "";
  messagePlataforma_id = "";


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private acessorioProvider: AcessorioProvider,
    private tipoProvider: TipoProvider, private plataformaProvider: PlataformaProvider,
    private formBuilder: FormBuilder) {

    this.model = new Cadace();

    if (this.navParams.data.id) {
      this.acessorioProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })
    }

    this.validAce = formBuilder.group({
      ace_nome: ['', Validators.required],
      ace_fabri: ['', Validators.required], 
      ace_duedate: ['', Validators.required],
      plataforma_id: ['', Validators.required],
      tipo_id: [''],
      ace_desc: [''],
    })

  }

  ionViewDidLoad() {
    this.tipoProvider.getAll()
      .then((result: any[]) => {
        this.tipo = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar os tipos', duration: 3000, position: 'botton' }).present();
      });

    this.plataformaProvider.getAll()
      .then((result: any[]) => {
        this.plataforma = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar as plataformas', duration: 3000, position: 'botton' }).present();
      });
  }

  /*save() {
    this.saveAcessorio()
      .then(() => {
        this.toast.create({ message: 'Acessório salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o Acessório.', duration: 3000, position: 'botton' }).present();
      })

  }*/

  private saveAcessorio() {
    if (this.model.id) {
      return this.acessorioProvider.update(this.model);
    } else {
      return this.acessorioProvider.insert(this.model);
    }
  }


  //experimento de validação

  public valida() {
    let {ace_nome, ace_fabri, ace_duedate, plataforma_id} = this.validAce.controls;

    if(!this.validAce.valid){
      if(!ace_nome.valid){
        this.errorAce_nome = true;
        this.messageAce_nome = 'campo obrigatório'
      } else {
        this.messageAce_nome = '';
      }

      if (!ace_fabri.valid){
        this.errorAce_fabri = true;
        this.messageAce_fabri = 'campo obrigatório'
      } else {
        this.messageAce_fabri = '';
      }

      if(!ace_duedate.valid){
        this.errorAce_duedate = true;
        this.messageAce_duedate = 'campo obrigatório'
      } else {
        this.messageAce_duedate = '';
      }

      if(!plataforma_id.valid){
        this.errorPlataforma_id = true;
        this.messagePlataforma_id = 'campo obrigatório'
      } else {
        this.messagePlataforma_id = '';
      }
    } else {
      this.saveAcessorio()
      .then(() => {
        this.toast.create({ message: 'Acessório salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o Acessório.', duration: 3000, position: 'botton' }).present();
      })
    }
  }

}


/* <ion-content padding>
    <ion-list class="list" name="contato" ng-submit="onSubmit()" novalidate>

        <ion-item>
          <ion-label stacked>Nome</ion-label>
          <ion-input type="text" name="ace_nome" [(ngModel)]="model.ace_nome"></ion-input>
        </ion-item>
    
        <ion-item>
          <ion-label stacked>Fabricante</ion-label>
          <ion-input type="text" name="ace_fabri" [(ngModel)]="model.ace_fabri"></ion-input>
        </ion-item>
    
        <ion-item>
          <ion-label stacked>Data de Lançamento</ion-label>
          <ion-datetime displayFormat="DD/MMM/YYYY" name="ace_duedate" [(ngModel)]="model.ace_duedate"></ion-datetime>
        </ion-item>
    
        <ion-item>
          <ion-label stacked>Tipo</ion-label>
          <ion-select name="tipo_id" [(ngModel)]="model.tipo_id">
            <ion-option *ngFor="let tipos of tipo" value="{{ tipos.id }}">{{ tipos.tipo_nome }}</ion-option>
          </ion-select>
        </ion-item>
     
        <ion-item>
          <ion-label stacked>Plataforma</ion-label>
          <ion-select name="plataforma_id" [(ngModel)]="model.plataforma_id">
            <ion-option *ngFor="let plataformas of plataforma" value="{{ plataformas.id }}">{{ plataformas.plataforma_nome }}</ion-option>
          </ion-select>
        </ion-item>

          <ion-item>
              <ion-label stacked>Descrição</ion-label>
              <ion-input type="text" name="ace_desc" [(ngModel)]="model.ace_desc"></ion-input>
            </ion-item>
    
      </ion-list>
    
      <button ion-button block (click)="save()">Salvar</button>

</ion-content> 

 [(ngModel)]="model.ace_nome"

*/