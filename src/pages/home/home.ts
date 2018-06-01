import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { HomeProvider } from '../../providers/home/home';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  conso: any[] = [];
  jog: any[] = [];
  ace: any[] = [];
  home: string = "consoles";

  constructor(public navCtrl: NavController, private toast: ToastController,
    private homeProvider: HomeProvider) {
  }

  ionViewDidEnter() {
    switch (this.home) {
      case "consoles": {
        this.homeProvider.getAllConsoles()
          .then((result: any[]) => {
            this.conso = result;

          });

        this.homeProvider.getAllJogos()
          .then((result2: any[]) => {
            this.jog = result2;

          });

        this.homeProvider.getAllAcessorios()
          .then((result3: any[]) => {
            this.ace = result3;

          });

      }
        break;

      case "jogos": {

        this.homeProvider.getAllJogos()
          .then((result2: any[]) => {
            this.jog = result2;

          });

        this.homeProvider.getAllConsoles()
          .then((result: any[]) => {
            this.conso = result;

          });

        this.homeProvider.getAllAcessorios()
          .then((result3: any[]) => {
            this.ace = result3;

          });

      }
        break;
      case "acessorios": {
        this.homeProvider.getAllAcessorios()
          .then((result3: any[]) => {
            this.ace = result3;

          });

        this.homeProvider.getAllJogos()
          .then((result2: any[]) => {
            this.jog = result2;

          });

        this.homeProvider.getAllConsoles()
          .then((result: any[]) => {
            this.conso = result;

          });

      }
        break;
    }

  }

  editAcessorio(id: number) {
    this.navCtrl.push('EditAcessoriosPage', { id: id });
  }

  editConsole(id: number) {
    this.navCtrl.push('EditConsolePage', { id: id });
  }

  editJogos(id: number) {
    this.navCtrl.push('EditJogosPage', { id: id });
  }
}

/*
ionViewDidEnter() {
  switch (this.home) {
    case "consoles": {
      this.homeProvider.getAllConsoles()
        .then((result: any[]) => {
          this.conso = result;
        
        });
        
    }
    break;
    case "jogos": {
      this.homeProvider.getAllJogos()
        .then((result2: any[]) => {
          this.jog = result2;
          
        });
        
    }
    break;
    case "acessorios": {
      this.homeProvider.getAllAcessorios()
        .then((result3: any[]) => {
          this.ace = result3;
          
        });
        
    }
    break;
  }
  
} */
