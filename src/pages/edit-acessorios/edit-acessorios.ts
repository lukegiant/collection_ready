import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Cadace, AcessorioProvider } from '../../providers/acessorio/acessorio';
import { TipoProvider } from '../../providers/tipo/tipo';


@IonicPage()
@Component({
  selector: 'page-edit-acessorios',
  templateUrl: 'edit-acessorios.html',
})
export class EditAcessoriosPage {
  model: Cadace;
  tipo: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private acessorioProvider: AcessorioProvider,
    private tipoProvider: TipoProvider) { 

      this.model = new Cadace();

    if (this.navParams.data.id) {
      this.acessorioProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })
    }
    }

  ionViewDidLoad() {
    this.tipoProvider.getAll()
      .then((result: any[]) => {
        this.tipo = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar os tipos', duration: 3000, position: 'botton' }).present();
      });
  }

  save() {
    this.saveAcessorio()
      .then(() => {
        this.toast.create({ message: 'Acessório salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o Acessório.', duration: 3000, position: 'botton' }).present();
      })

  }

  private saveAcessorio() {
    if (this.model.id) {
      return this.acessorioProvider.update(this.model);
    } else {
      return this.acessorioProvider.insert(this.model);
    }
  }

}
