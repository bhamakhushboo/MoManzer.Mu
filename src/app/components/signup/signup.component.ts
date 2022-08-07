import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenulistService } from 'src/app/services/menulist.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  public signUpForm: FormGroup;

  constructor(
    private menulistservice: MenulistService,
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {

    this.signUpForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern("[0-9]{8}")]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      dob: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(2)]]
    });

  }


  SignUp(){
    if(this.signUpForm.valid) {
      this.menulistservice.AddNewCustomer(this.signUpForm.value).subscribe(() => {
        this.signUpForm.reset();
        this.presentSuccessMsg();
      });
    }
  }

  async presentSuccessMsg() {
    const alert = await this.alertController.create({
      header: 'Success',
      subHeader: 'Sign Up',
      message: 'You have successfully signed up!',
      buttons: [{
        text: 'OK',
        role: 'confirm',
        handler: () => {
          this.router.navigate([`/menu-tab`]);
        },
      }],
    });

    await alert.present();
  }



}
