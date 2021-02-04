import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;
  constructor(private iab: InAppBrowser, 
              private actionSheetCtrl: ActionSheetController,
              private socialSharing: SocialSharing,
              private datalocalService: DataLocalService) { }

  ngOnInit() {
      console.log('Favoritos', this.enFavoritos);
  }
  abrirNoticia(){
    //console.log('Noticia', this.noticia.url);
    const browser = this.iab.create(this.noticia.url,'_system');
  }
  async lanzarMenu(){
    let guardarBorrarBtm;
    if(this.enFavoritos){
      guardarBorrarBtm = {
        text: 'Borrar favorite',
        icon: 'trash-outline',
        handler: () => {
          this.datalocalService.borrarNoticia(this.noticia);
        }
      };
    }else{
      guardarBorrarBtm = {
        text: 'Favorite',
        icon: 'star',
        handler: () => {
          this.datalocalService.guardarNoticias(this.noticia);
        }
      };
    }
    const actionSheet = await this.actionSheetCtrl.create({
      
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'compartir',
        icon: 'share',
        handler: () => {
          this.socialSharing.share(this.noticia.title,this.noticia.source.name, '', this.noticia.url);
        }
      }, 
      guardarBorrarBtm,
      {
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
