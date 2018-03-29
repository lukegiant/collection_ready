import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, AlertController } from 'ionic-angular';
import { ConsoleProvider, Cadconsole } from '../../providers/console/console';

@IonicPage()
@Component({
  selector: 'page-consoles',
  templateUrl: 'consoles.html',
})
export class ConsolesPage {
  consoles: any[] = [];
  searchText: string = null;

  constructor(public navCtrl: NavController, private toast: ToastController,
    private consoleProvider: ConsoleProvider, private alertCtrl: AlertController) { }

  ionViewDidEnter() {
    this.getAllConsoles();
  }

  getAllConsoles() {
    this.consoleProvider.getAll(this.searchText)
      .then((result: any[]) => {
        this.consoles = result;
      });
  }

  addConsole() {
    this.navCtrl.push('EditConsolePage');
  }

  editConsole(id: number) {
    this.navCtrl.push('EditConsolePage', { id: id });
  }

  presentConfirm(console: Cadconsole) {
    let alert = this.alertCtrl.create({
      title: 'Confirmar',
      message: 'Deseja realmente deletar este item?',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.consoleProvider.remove(console.id)
              .then(() => {
                // Removendo do array de consoles
                var index = this.consoles.indexOf(console);
                this.consoles.splice(index, 1);
                this.toast.create({ message: 'Item removido.', duration: 3000, position: 'botton' }).present();
              })
          }
        }
      ]
    });
    alert.present();
  }

  /* removeConsole(console: Cadconsole) {
     this.consoleProvider.remove(console.id)
       .then(() => {
         // Removendo do array de consoles
         var index = this.consoles.indexOf(console);
         this.consoles.splice(index, 1);
         this.toast.create({ message: 'Item removido.', duration: 3000, position: 'botton' }).present();
       })
   } */

  filterConsoles(ev: any) {
    this.getAllConsoles();
  }
}
