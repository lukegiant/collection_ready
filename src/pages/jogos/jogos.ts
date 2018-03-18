import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { JogosProvider, Cadjogo } from '../../providers/jogos/jogos';


@IonicPage()
@Component({
  selector: 'page-jogos',
  templateUrl: 'jogos.html',
})
export class JogosPage {
  jogos: any[] = [];
  onlyInactives: boolean = false;
  searchText: string = null;

  constructor(public navCtrl: NavController, private toast: ToastController, private jogosProvider: JogosProvider) { }

  ionViewDidEnter() {
    this.getAllJogos();
  }

  getAllJogos() {
    this.jogosProvider.getAll(this.searchText)
      .then((result: any[]) => {
        this.jogos = result;
      });
  }

  addJogos() {
    this.navCtrl.push('EditJogosPage');
  }

  editJogos(id: number) {
    this.navCtrl.push('EditJogosPage', { id: id });
  }

  removeJogos(jogos: Cadjogo) {
    this.jogosProvider.remove(jogos.id)
      .then(() => {
        // Removendo do array de jogos
        var index = this.jogos.indexOf(jogos);
        this.jogos.splice(index, 1);
        this.toast.create({ message: 'Item removido.', duration: 3000, position: 'botton' }).present();
      })
  }

  filterJogos(ev: any) {
    this.getAllJogos();
  }

}
