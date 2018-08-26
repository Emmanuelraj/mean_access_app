import { Injectable } from '@angular/core';

import {Http,Response,Headers,RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class AccessService {
  private _getUrl ='http://localhost:3000/api/access/';


  private _deleteUrl ='http://localhost:3000/api/access/';


  constructor(private _http:Http) { }






 getByUserName(username)
  {
    console.log('username'+username);
    let headers = new Headers({'Content-Type':'application/json'})
    let options = new RequestOptions({headers : headers});
    return this._http.get(this._getUrl+username)
    .map((response:Response) => response.json());
  }





deleteByUserName(username)
{
  console.log('deleteByusername'+username)

  return this._http.delete(this._deleteUrl+username)
  .map((response:Response) =>  response.json());

}





}
