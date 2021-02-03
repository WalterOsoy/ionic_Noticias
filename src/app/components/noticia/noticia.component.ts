import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() indice: number;
  constructor(private iab: InAppBrowser, 
              private actionSheetCtrl: ActionSheetController,
              private socialSharing: SocialSharing) { }

  ngOnInit() {
  }
  abrirNoticia(){
    //console.log('Noticia', this.noticia.url);
    const browser = this.iab.create(this.noticia.url,'_system');
  }
  async lanzarMenu(){
    const actionSheet = await this.actionSheetCtrl.create({
      
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'compartir',
        icon: 'share',
        handler: () => {
          this.socialSharing.share(this.noticia.title,this.noticia.source.name, '', this.noticia.url);
        }
      },{
        text: 'Favorite',
        icon: 'star',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
