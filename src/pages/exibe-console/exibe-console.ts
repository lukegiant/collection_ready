import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExibeCProvider } from '../../providers/exibe-c/exibe-c';



@IonicPage()
@Component({
  selector: 'page-exibe-console',
  templateUrl: 'exibe-console.html',
})
export class ExibeConsolePage {

  conso: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private exibecProvider: ExibeCProvider) { }

  ionViewDidLoad() {
    
  }


}
