import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './common/services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TranslationsModule } from './modules/translations/translations.module';
import { TestsModule } from './modules/tests/tests.module';

const routes: Routes = [
  	{
		path: '', // El index: localhost/
		component: HomeComponent,
		canActivate: [AuthService]
	},
  	{
		path: 'login', // El index: localhost/login
		component: LoginComponent
	},
	{
		path: 'translations',
		canActivate: [AuthService],
		loadChildren: () => TranslationsModule
	},
	{
		path: 'tests',
		canActivate: [AuthService],
		loadChildren: () => TestsModule
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
