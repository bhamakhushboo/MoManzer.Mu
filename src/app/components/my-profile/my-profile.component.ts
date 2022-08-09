import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { filter } from 'rxjs/operators';
import { Customer } from 'src/app/interfaces/customer';

@Component({
  selector: 'app-my-profile',
  providers: [LoginComponent],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {

  public id_value: string;
  public email_value: string;
  public dob_value: string;


  constructor() { }

  ngOnInit(){
    this.id_value = localStorage.getItem("id");
    this.email_value = localStorage.getItem("email");
    this.dob_value = localStorage.getItem("dob");
  }


}
