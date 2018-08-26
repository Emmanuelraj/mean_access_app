import { Component, OnInit } from '@angular/core';

import {User} from './../user'

import{AuthService}from './../auth.service';

import {Router} from '@angular/router';

//populate the values
const users : User[]=[
  {name:'user'},
  {name:'admin'}
];


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[AuthService]
})


export class RegisterComponent implements OnInit {






  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit() {
  }



  registeredUserData:any= {};


  users = users;


onSubmit()
{
   console.log(this.registeredUserData.user);
   if(this.registeredUserData.user === undefined)
    {
      alert('please select the user');
    }
    else  if(this.registeredUserData.user === 'admin')
    {
        alert('admin mode');
         console.log('admin mode')

       this.authService.getRegister(this.registeredUserData)
       .subscribe(
         res=> console.log(res),
         err => console.log(err)
       )

    }
    else
    {
        alert('user mode');

        this.authService.getRegister(this.registeredUserData)
        .subscribe(
            res => {console.log(res),
            localStorage.setItem('token',res.token),
            this.router.navigate(['/login'])
          },
            err=> console.log(err)
        )
    }

}


onClickUser(user)
{
  console.log(user);
  //setting the value to registeredUserData
  this.registeredUserData.user = user;
}









}
