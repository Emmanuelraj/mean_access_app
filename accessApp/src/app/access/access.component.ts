import { Component, OnInit } from '@angular/core';
import {AccessService} from './../access.service';
import {Access} from './../access';
import {Router} from '@angular/router'
@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css'],
  providers: [AccessService]
})
export class AccessComponent implements OnInit {

  username: string;

  criteriaButton : boolean = false;


  addbtn : boolean = false;



  viewbtn : boolean = false;



 //deleteBtn
 deleteBtn: boolean = false;





  constructor(private accessService: AccessService) { }

  UserDetails:any={};


  ngOnInit()
  {

   console.log('initform')

    //this.viewbtn = true;

    this.username = localStorage.getItem('username');

     console.log(this.username);

    this.accessService.getByUserName(this.username)
      .subscribe(res =>this.UserDetails = res,
     err=> console.log(err) );
  }




onClickUser(user)
{

  //now assign this.accessService
//  this.UserDetails.user= user;
    if(user === 'admin')
    {
      console.log(user)
      this.criteriaButton = true;
    }
    else  if(user==='user')
    {
      console.log(user)
      this.criteriaButton = false;
    }

}



add()
{
  this.addbtn = true;
}




delete()
 {
   //this.viewbtn = true;
   this.deleteBtn = true;

 }




 deleteSubmit()
 {
   console.log('delete submit'+this.username);
   let delArray = this.username;

  this.accessService.deleteByUserName(this.username)
   .subscribe((res) => console.log(res),
(err)=> {
  console.log(err)} )
 }



}
