import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { ConsoleProvider, Cadconsole } from '../../providers/console/console';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  consoles: any[] = [];
  onlyInactives: boolean = false;
  searchText: string = null;

  constructor(public navCtrl: NavController, private toast: ToastController, private consoleProvider: ConsoleProvider) {
  }

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

  removeConsole(console: Cadconsole) {
    this.consoleProvider.remove(console.id)
      .then(() => {
        // Removendo do array de consoles
        var index = this.consoles.indexOf(console);
        this.consoles.splice(index, 1);
        this.toast.create({ message: 'Item removido.', duration: 3000, position: 'botton' }).present();
      })
  }

  filterConsoles(ev: any) {
    this.getAllConsoles();
  }

}
