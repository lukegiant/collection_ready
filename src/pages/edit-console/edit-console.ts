import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private consoleProvider: ConsoleProvider,
    private midiaProvider: MidiaProvider, private tipo_consoleProvider: TipoConsoleProvider) {

    this.model = new Cadconsole();

    if (this.navParams.data.id) {
      this.consoleProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })
    }
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

  save() {
    this.saveConsole()
      .then(() => {
        this.toast.create({ message: 'Console salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o Console.', duration: 3000, position: 'botton' }).present();
      })
  }

  private saveConsole() {
    if (this.model.id) {
      return this.consoleProvider.update(this.model);
    } else {
      return this.consoleProvider.insert(this.model);
    }
  }

}
