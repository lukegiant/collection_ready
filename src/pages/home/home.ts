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
  searchText: string = null;

  constructor(public navCtrl: NavController, private toast: ToastController, private homeProvider: HomeProvider) {
  }

  ionViewDidEnter() {
    this.getAllItens();
  }

  getAllItens() {
    this.homeProvider.getAllItens(this.searchText)
      .then((result: any[]) => {
        this.itens = result;
      });
  }

}
