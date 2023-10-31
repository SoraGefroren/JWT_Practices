import swal from 'sweetalert2';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from '@app/common/services/translation.service';

export function showAlert(params: any): void {
    swal.fire({
      title: params.title,
      text: params.message,
      // "success"
      icon: params.type
    });
}

export function initializerTranslations(http: HttpClient, trans: TranslationService): any {
    return () => {
        return http.get<any>(`${environment.API_URL}/translations`).toPromise()
            .then((res) => {
                if (res && res['translations']) {
                    trans.set(res.translations);
                } else {
                    trans.set(null);
                }
            })
            .catch((error) => {
                console.error('ERROR:', error);
            });
    };
}

export async function getLanguages(http: HttpClient, trans: TranslationService): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        let _rspResul:any = null;
        http.get<any>(`${environment.API_URL}/languages`)
            .subscribe({
                next: (resp) => {
                    _rspResul = resp;
                },
                error:(error) => {
                    _rspResul = null;
                },
                complete: () => {
                    if (_rspResul) {
                        resolve(_rspResul);
                    } else {
                        reject(null);
                    }
                },
            });
    });
}

export async function getMenuInfo(http: HttpClient, trans: TranslationService): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        let _rspResul:any = null;
        http.get<any>(`${environment.API_URL}/api/list-menu`)
            .subscribe({
                next: (resp) => {
                    _rspResul = resp;
                },
                error:(error) => {
                    _rspResul = null;
                },
                complete: () => {
                    if (_rspResul) {
                        resolve(_rspResul);
                    } else {
                        reject(null);
                    }
                },
            });
    });
}

export async function getUserInfo(http: HttpClient): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let _rspResul:any = null;
      http.get<any>(`${environment.API_URL}/api/user-info`)
          .subscribe({
              next: (resp) => {
                  _rspResul = resp;
              },
              error:(error) => {
                  _rspResul = null;
              },
              complete: () => {
                  if (_rspResul) {
                      resolve(_rspResul);
                  } else {
                      reject(null);
                  }
              },
          });
    });
}

export function isCurrentPage(link: string): boolean {
    return window.location.href.includes(link);
}