import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { SQLite } from '@ionic-native/sqlite'
import { DatabaseProvider } from '../providers/database/database';
import { ConsoleProvider } from '../providers/console/console';
import { CategoryProvider } from '../providers/category/category';
import { TabsPage } from '../pages/tabs/tabs';
import { MidiaProvider } from '../providers/midia/midia';
import { JogosProvider } from '../providers/jogos/jogos';
import { VersaoProvider } from '../providers/versao/versao';
import { GeneroProvider } from '../providers/genero/genero';
import { AcessorioProvider } from '../providers/acessorio/acessorio';
import { RegiaoProvider } from '../providers/regiao/regiao';
import { TipoProvider } from '../providers/tipo/tipo';
import { TipoConsoleProvider } from '../providers/tipo-console/tipo-console';
import { PlataformaProvider } from '../providers/plataforma/plataforma';
import { HomeProvider } from '../providers/home/home';

import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import ptBR from '@angular/common/locales/pt';
registerLocaleData(ptBR)
 
@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: LOCALE_ID, useValue: 'pt-PT'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider,
    ConsoleProvider,
    CategoryProvider,
    MidiaProvider,
    JogosProvider,
    VersaoProvider,
    GeneroProvider,
    AcessorioProvider,
    RegiaoProvider,
    TipoProvider,
    TipoConsoleProvider,
    PlataformaProvider,
    HomeProvider, 
    Camera, 
    ImagePicker
  ]
})
export class AppModule {}
