import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccessComponent } from './access/access.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth.guard'


const routes: Routes = [
  {
    path : '',
    redirectTo : '/home',
    pathMatch : 'full'
  },
  {
    path : 'home',
    component:HomeComponent
  },
  {
    path :'access',
    component : AccessComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'login',
    component: LoginComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule
{


 }
