import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Cadjogo, JogosProvider } from '../../providers/jogos/jogos';
import { MidiaProvider } from '../../providers/midia/midia';
import { VersaoProvider } from '../../providers/versao/versao';
import { GeneroProvider } from '../../providers/genero/genero';
import { RegiaoProvider } from '../../providers/regiao/regiao';
import { PlataformaProvider } from '../../providers/plataforma/plataforma';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-edit-jogos',
  templateUrl: 'edit-jogos.html',
})
export class EditJogosPage {
  model: Cadjogo;
  plataforma: any[];
  midia: any[];
  versao: any[];
  genero: any[];
  regiao: any[];

  public validJog: any;
  errorJog_nome = false;
  errorJog_desen = false;
  errorJog_dist = false;
  errorJog_duedate = false;
  errorPlataforma_id = false;
  messageJog_nome = "";
  messageJog_desen = "";
  messageJog_dist = "";
  messageJog_duedate = "";
  messageJog_Plataforma_id = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private jogosProvider: JogosProvider,
    private midiaProvider: MidiaProvider, private versaoProvider: VersaoProvider,
    private generoProvider: GeneroProvider, private regiaoProvider: RegiaoProvider,
    private plataformaProvider: PlataformaProvider, private formBuilder: FormBuilder,
    private camera: Camera) {

    this.model = new Cadjogo();

    if (this.navParams.data.id) {
      this.jogosProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })
    }

    this.validJog = formBuilder.group({
      jog_nome: ['', Validators.required],
      jog_desen: ['', Validators.required],
      jog_dist: ['', Validators.required],
      jog_duedate: ['', Validators.required],
      plataforma_id: ['', Validators.required],
      midia_id: [''],
      versao_id: [''],
      genero_id: [''],
      regiao_id: [''],
      foto: [''],
    })

  }

  ionViewDidLoad() {

    this.plataformaProvider.getAll()
      .then((result: any[]) => {
        this.plataforma = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar as plataformas', duration: 3000, position: 'botton' }).present();
      });

    this.midiaProvider.getAll()
      .then((result: any[]) => {
        this.midia = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar as midias', duration: 3000, position: 'botton' }).present();
      });

    this.versaoProvider.getAll()
      .then((result: any[]) => {
        this.versao = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar as versões', duration: 3000, position: 'botton' }).present();
      });

    this.generoProvider.getAll()
      .then((result: any[]) => {
        this.genero = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar os gêneros', duration: 3000, position: 'botton' }).present();
      });

    this.regiaoProvider.getAll()
      .then((result: any[]) => {
        this.regiao = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar as regiões', duration: 3000, position: 'botton' }).present();
      });
  }

  /*save() {
    this.saveJogo()
      .then(() => {
        this.toast.create({ message: 'Jogo salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o Jogo.', duration: 3000, position: 'botton' }).present();
      })
  } */

  private saveJogo() {
    if (this.model.id) {
      return this.jogosProvider.update(this.model);
    } else {
      return this.jogosProvider.insert(this.model);
    }
  }


  public valida() {
    let { jog_nome, jog_desen, jog_dist, jog_duedate, plataforma_id } = this.validJog.controls;

    if (!this.validJog.valid) {
      if (!jog_nome.valid) {
        this.errorJog_nome = true;
        this.messageJog_nome = 'campo obrigatório'
      } else {
        this.messageJog_nome = '';
      }

      if (!jog_desen.valid) {
        this.errorJog_desen = true;
        this.messageJog_desen = 'campo obrigatório'
      } else {
        this.messageJog_desen = '';
      }

      if (!jog_dist.valid) {
        this.errorJog_dist = true;
        this.messageJog_dist = 'campo obrigatório'
      } else {
        this.messageJog_dist = '';
      }

      if (!jog_duedate.valid) {
        this.errorJog_duedate = true;
        this.messageJog_duedate = 'campo obrigatório'
      } else {
        this.messageJog_duedate = '';
      }

      if (!plataforma_id.valid) {
        this.errorPlataforma_id = true;
        this.messageJog_Plataforma_id = 'campo obrigatório'
      } else {
        this.messageJog_Plataforma_id = '';
      }
    } else {
      this.saveJogo()
        .then(() => {
          this.toast.create({ message: 'Jogo salvo.', duration: 3000, position: 'botton' }).present();
          this.navCtrl.pop();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao salvar o Jogo.', duration: 3000, position: 'botton' }).present();
        })
    }
  }

  takePicture_gallery() {
 
    const options: CameraOptions = {
      quality: 100,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      targetWidth: 200,
      targetHeight: 285.
    }
 
    this.camera.getPicture(options)
      .then((imageData) => {
        let base64image = 'data:image/jpeg;base64,' + imageData;
        this.model.foto = base64image; 
        
        
      }, (error) => {
        console.error(error);
      })
      .catch((error) => {
        console.error(error);
      })
  }

}


/* <ion-list>

    <ion-item>
      <ion-label stacked>Nome</ion-label>
      <ion-input type="text" name="jog_nome" [(ngModel)]="model.jog_nome"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label stacked>Desenvolvedora</ion-label>
      <ion-input type="text" name="jog_desen" [(ngModel)]="model.jog_desen"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label stacked>Distribuidora</ion-label>
      <ion-input type="text" name="jog_dist" [(ngModel)]="model.jog_dist"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label stacked>Data de Lançamento</ion-label>
      <ion-datetime displayFormat="DD/MMM/YYYY" name="jog_duedate" [(ngModel)]="model.jog_duedate"></ion-datetime>
    </ion-item>

    <ion-item>
      <ion-label stacked>Plataforma</ion-label>
      <ion-select name="plataforma_id" [(ngModel)]="model.plataforma_id">
        <ion-option *ngFor="let plataformas of plataforma" value="{{ plataformas.id }}">{{ plataformas.plataforma_nome }}</ion-option>
      </ion-select>
    </ion-item>

    <ion-item>
      <ion-label stacked>Midia</ion-label>
      <ion-select name="midia_id" [(ngModel)]="model.midia_id">
        <ion-option *ngFor="let midias of midia" value="{{ midias.id }}">{{ midias.midia_nome }}</ion-option>
      </ion-select>
    </ion-item>

    <ion-item>
        <ion-label stacked>Versão</ion-label>
        <ion-select name="versao_id" [(ngModel)]="model.versao_id">
          <ion-option *ngFor="let versoes of versao" value="{{ versoes.id }}">{{ versoes.versao_nome }}</ion-option>
        </ion-select>
      </ion-item>

      <ion-item>
          <ion-label stacked>Gênero</ion-label>
          <ion-select name="genero_id" [(ngModel)]="model.genero_id">
            <ion-option *ngFor="let generos of genero" value="{{ generos.id }}">{{ generos.genero_nome }}</ion-option>
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-label stacked>Região</ion-label>
          <ion-select name="regiao_id" [(ngModel)]="model.regiao_id">
            <ion-option *ngFor="let regioes of regiao" value="{{ regioes.id }}">{{ regioes.regiao_nome }}</ion-option>
          </ion-select>
        </ion-item>

  </ion-list>

  <button ion-button block (click)="save()">Salvar</button> */