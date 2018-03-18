import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AcessorioProvider, Cadace } from '../../providers/acessorio/acessorio';


@IonicPage()
@Component({
  selector: 'page-acessorios',
  templateUrl: 'acessorios.html',
})
export class AcessoriosPage {
  acessorios: any[] = [];
  searchText: string = null;

  constructor(public navCtrl: NavController, private toast: ToastController, private acessorioProvider: AcessorioProvider) { }

  ionViewDidEnter() {
    this.getAllAcessorios();
  }

  getAllAcessorios() {
    this.acessorioProvider.getAll(this.searchText)
      .then((result: any[]) => {
        this.acessorios = result;
      });
  }

  addAcessorio() {
    this.navCtrl.push('EditAcessoriosPage');
  }

  editAcessorio(id: number) {
    this.navCtrl.push('EditAcessoriosPage', { id: id });
  }

  removeAcessorio(acessorio: Cadace) {
    this.acessorioProvider.remove(acessorio.id)
      .then(() => {
        // Removendo do array de consoles
        var index = this.acessorios.indexOf(acessorio);
        this.acessorios.splice(index, 1);
        this.toast.create({ message: 'Item removido.', duration: 3000, position: 'botton' }).present();
      })
  }

  filterAcessorios(ev: any) {
    this.getAllAcessorios();
  }

}
