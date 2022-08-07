import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { AlertController } from '@ionic/angular';
import { MenulistService } from 'src/app/services/menulist.service';
import { CacheKey, CachingService } from 'src/app/services/caching.service';
import { ProfileTabPage } from 'src/app/pages/profile-tab/profile-tab.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loggedCustomer: Customer[];

  constructor(
    private menulistservice: MenulistService,
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private cachingService: CachingService,
    private profile: ProfileTabPage
  ) { }

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      id:['', [Validators.required, Validators.pattern("[0-9]{8}")]],
      password: ['', Validators.required]
    });
   }

   Login(){
    if(this.loginForm.valid) {

      this.menulistservice.getCustomer(this.loginForm.value.id).subscribe((result) => {
        const resultcustomer = result as Customer[];


          this.cachingService.set(CacheKey.Customer, resultcustomer);
          this.loggedCustomer = resultcustomer;

         if (this.loggedCustomer['password'] == this.loginForm.value.password){
          this.profile.loggedIn = true;
         }
         else{
          this.presentErrorMsg();
         }

      });

      if (this.loggedCustomer === null){
        this.presentErrorMsg();
      }


    }
   }

   async presentErrorMsg() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Wrong Login Credentials',
      message: 'Either you dont have an account with us or our credentials are wrong!',
      buttons: ['OK']
    });

    await alert.present();
  }

  Redirect(app){
    if (app == "fb"){
      window.open('android-app://com.google.android.facebook',"_system");
    }

    if (app == "google"){
      window.open('android-app://com.google.android.google',"_system");
    }





}

}
