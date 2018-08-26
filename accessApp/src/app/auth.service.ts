import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';

import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router : Router) { }



 private _postUrl ='http://localhost:3000/api/register';

 private  _loginUrl ='http://localhost:3000/api/login';


  getRegister(user)
  {
    console.log('service getRegister method');

    return this.http.post<any>(this._postUrl,user);
  }

  getLogin(user)
  {
    localStorage.setItem('username',user.username);
    //localStorage.setItem('user',user.user);
    console.log('service getRegister method');
    return this.http.post<any>(this._loginUrl,user);
  }


 loggedIn()
 {
   return !!localStorage.getItem('token');
 }


loggedOut()
{

  this.router.navigate(['/home']);
  localStorage.removeItem('username');
  return localStorage.removeItem('token');
}



}
