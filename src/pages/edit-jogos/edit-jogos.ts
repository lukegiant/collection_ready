import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Cadjogo, JogosProvider } from '../../providers/jogos/jogos';
import { MidiaProvider } from '../../providers/midia/midia';
import { VersaoProvider } from '../../providers/versao/versao';
import { GeneroProvider } from '../../providers/genero/genero';
import { RegiaoProvider } from '../../providers/regiao/regiao';
import { PlataformaProvider } from '../../providers/plataforma/plataforma';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private jogosProvider: JogosProvider,
    private midiaProvider: MidiaProvider, private versaoProvider: VersaoProvider, 
    private generoProvider: GeneroProvider, private regiaoProvider: RegiaoProvider, 
    private plataformaProvider: PlataformaProvider) {

    this.model = new Cadjogo();

    if (this.navParams.data.id) {
      this.jogosProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })
    }
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

  save() {
    this.saveJogo()
      .then(() => {
        this.toast.create({ message: 'Jogo salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o Jogo.', duration: 3000, position: 'botton' }).present();
      })
  }

  private saveJogo() {
    if (this.model.id) {
      return this.jogosProvider.update(this.model);
    } else {
      return this.jogosProvider.insert(this.model);
    }
  }
}
