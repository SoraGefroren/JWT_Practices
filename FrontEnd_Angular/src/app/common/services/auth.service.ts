import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError } from 'rxjs/operators';
import { map, Observable} from 'rxjs';
import { UserLogin } from '../models/interfaces/user.model';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements CanActivate {

  private jwtHelper: JwtHelperService = new JwtHelperService();
  
  constructor(private router: Router, private http: HttpClient) {
  }

  public isActive(): boolean { 
    const tkn: string | null = localStorage.getItem('accessToken');
    if (tkn && !this.jwtHelper.isTokenExpired(tkn)) {
      return true;
    }
    return false;
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> { 
    const tkn: string | null = localStorage.getItem('accessToken');
    if (tkn && !this.jwtHelper.isTokenExpired(tkn)) {
      return true;
    }
    const isRefreshSuccess: boolean = await this.refreshingToken();
    if (!isRefreshSuccess) {
      this.router.navigate(["login"]);
    }
    return isRefreshSuccess;
  }

  async refreshingToken(): Promise<boolean> {
    const tkn: string | null = localStorage.getItem('refreshToken');
    let isRefreshSuccess: boolean = false;
    try {
      if (tkn && !this.jwtHelper.isTokenExpired(tkn)) {
        const resp = await this.getRefreshToken(this.http.post<any>(`${environment.API_URL}/refresh`, { refreshToken:tkn }));
        if (resp) {
          localStorage.setItem("refreshToken", resp? (resp?.refreshToken ?? tkn): '');
          localStorage.setItem("accessToken", resp? (resp?.accessToken ?? ''): '');
          console.log('REFRESH', resp);
          isRefreshSuccess = true;
        }
      } else {
        localStorage.setItem("refreshToken", '');
        localStorage.setItem("accessToken", '');
      }
    } catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }

  private async getRefreshToken(source: Observable<any|void>): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let _rspResul:any = null;
      source.subscribe({
        next: (resp) => {
          console.log('RESPON', resp);
          _rspResul = resp;
        },
        error:(error) => {
          console.error('ERROR', error);
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
 
  public login (l:UserLogin): Observable<any|void> {
    return this.http.post<any>(`${environment.API_URL}/login`, l)
      .pipe(
        map((resp: any): void => {
          localStorage.setItem('accessToken', resp.accessToken || '');
          localStorage.setItem('refreshToken', resp.refreshToken || '');
          localStorage.setItem('userLanguage', resp.userLanguage || '');
        }),
        catchError((err) => {
          console.error('ERROR:', err);
          throw err;
        })
      );
      // .subscribe(resp => { // Observable<any>
      //   // display its headers
      //   const keys = resp.headers.keys();
      //   console.log(resp);
      // });
  }

  public logout (goLogin: boolean): void {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    if (goLogin) {
      this.router.navigate(["login"]);
    }
  }
}
