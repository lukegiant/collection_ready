import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { HomeProvider } from '../../providers/home/home';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  itens: any[] = [];

  constructor(public navCtrl: NavController, private toast: ToastController, private homeProvider: HomeProvider) {
  }

  ionViewDidEnter() {
    this.getAllItens();
  }

  getAllItens() {
    this.homeProvider.getAllItens()
      .then((result: any[]) => {
        this.itens = result;
      });
  }

}
