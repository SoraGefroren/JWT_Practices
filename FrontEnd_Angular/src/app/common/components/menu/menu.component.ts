import { Component, HostListener, OnInit } from '@angular/core';
import { TranslationService } from '@app/common/services/translation.service';
import { HttpClient  } from '@angular/common/http';
import { environment } from '@env/environment';
import { getLanguages, getMenuInfo, getUserInfo, isCurrentPage } from '@app/common/shared/helper';
import { AuthService } from '@app/common/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})

export class MenuComponent implements OnInit {

  env: any = environment;
  onMobileScreen: boolean = false;
  viewMobileMenu: boolean = false;
  collapseMenu: boolean = false;
  listMenus: Array<any> = [];
  listLangs: Array<any> = [];
  userInfo: any | null;
  selectedLang: string = '';
  mainContent: HTMLElement | null = null;
  footerContent: HTMLElement | null = null;
  
  constructor (private http: HttpClient, private authSrv: AuthService, public trans: TranslationService) {
    getLanguages(http, trans)
      .then((resp: any) => {
        if (resp) {
          this.listLangs = resp.languages;
        }
      })
      .catch((error: any) => {
        console.error('Languages',error);
      });
    getMenuInfo(http, trans)
      .then((resp: any) => {
        if (resp) {
          this.listMenus = resp.listMenus;
        }
      })
      .catch((error: any) => {
        console.error('MENU INFO',error);
      });
    getUserInfo(http)
      .then((resp: any) => {
        if (resp) {
          this.userInfo = resp.userInfo;
        }
      })
      .catch((error: any) => {
        console.error('USER INFO', error);
      });
  }

  ngOnInit(): void {
    this.selectedLang = this.trans.lang();
    this.mainContent = document.getElementById('main_content');
    this.footerContent = document.getElementById('footer_content');
    this.onResize({type:'resize'});
  }

  ngAfterViewInit() {
    this.onResize({type:'resize'});
  }
  
  @HostListener('window:resize', ['$event'])
  @HostListener('document:keydown.escape', ['$event'])
  
  onKeydownHandler(event: KeyboardEvent): void {
    this.onResize(event);
  }

  onResize(event:any): void {
    if (event.type == 'resize') {
      if (window.innerWidth >= 740) {
        this.onMobileScreen = false;
        this.viewMobileMenu = false;
        try {
        } catch (error) {
        }
      } else {
        this.onMobileScreen = true;
      }
    } else if (event.type == 'Escape' || event.code == 'Escape') {
      this.viewMobileMenu = false;
    }
    if (this.mainContent && this.footerContent) {
      // Obtén las coordenadas verticales de los elementos
      const mainRect = this.mainContent.getBoundingClientRect();
      const footerRect = this.footerContent.getBoundingClientRect();
      // Verifica si se activa el scrroll o, el footer se superpone al contenido principal
      if ((this.mainContent.scrollHeight > window.innerHeight) || (footerRect.top < mainRect.bottom)) {
        this.footerContent.classList.remove('fixed-bottom');
      } else {
        this.footerContent.classList.add('fixed-bottom');
      }
    }
  }

  actionClick_CollapseMenu(): void {
    this.collapseMenu = !this.collapseMenu;
  }

  actionClick_OpenMobileMenu(): void {
    this.viewMobileMenu = !this.viewMobileMenu;
  }

  actionClick_LogOut(): void {
    this.authSrv.logout(true);
  }

  onLanguageChange() {
    // Esta función se ejecutará cuando cambie la selección en el selector
    console.log('Selección de idioma cambió a:', this.selectedLang);
  }

  isCurrentPage = isCurrentPage;
}
