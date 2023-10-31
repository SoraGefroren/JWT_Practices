import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from '@app/common/services/translation.service';
import { AuthService } from '@app/common/services/auth.service';
import { showAlert } from '@app/common/shared/helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {

  userLanguage: string | null = null;
  goToMainRoute: boolean = false;

  formLgn: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });
  
  constructor(private router: Router, private authSrv: AuthService, private formBuilder: FormBuilder, public trans: TranslationService) {
    if (!this.authSrv.isActive()) {
      this.authSrv.logout(false);
    } else {
      this.goToMainRoute = true;
    }
    this.formLgn = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(1)
      ]]
    });
  }

  ngOnInit(): void {
    this.userLanguage = this.trans.lang();
    if (this.goToMainRoute) {
      this.router.navigate(["/"]);
    }
  }

  onSubmitLogin(): void {
    if (this.formLgn.invalid) {
      let message: string = '';
      const usernameControl = this.formLgn.get('username');
      const passwordControl = this.formLgn.get('password');
      if (usernameControl?.hasError('required') || usernameControl?.hasError('minLength')) {
        message = this.trans.get('theUserIsRequired')
      } else if (passwordControl?.hasError('required') || passwordControl?.hasError('minLength')) {
        message = this.trans.get('thePasswordIsRequired')
      }
      showAlert({
        type: 'error',
        title: 'Error!',
        message: message
      });
    } else {
      this.authSrv.login({
        username: this.formLgn.value.username || '',
        password: this.formLgn.value.password || '',
        remember: '',
        time_zone: '',
        previous: 'login',
        language: this.userLanguage
      }).subscribe({
        next: (resp: any): void => {
          console.log(resp);
          this.router.navigate(["/"]);
        },
        error: (ero: any) => {
          showAlert({
            type: 'error',
            title: 'Error!',
            message: ero.error.message
          });
        },
        complete: () => console.info('Login complete')
      });
    }
  }

}
