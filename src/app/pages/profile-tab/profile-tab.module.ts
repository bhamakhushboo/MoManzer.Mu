import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileTabPageRoutingModule } from './profile-tab-routing.module';

import { ProfileTabPage } from './profile-tab.page';
import { LoginComponent } from '../../components/login/login.component';
import { SignupComponent } from '../../components/signup/signup.component';
import { OrdersHistoryComponent } from '../../components/orders-history/orders-history.component';
import { MyProfileComponent } from '../../components/my-profile/my-profile.component';
import { SavedAddressComponent } from '../../components/saved-address/saved-address.component';
import { ThemeComponent } from '../../components/theme/theme.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProfileTabPageRoutingModule
  ],
  declarations: [
    ProfileTabPage,
    LoginComponent, SignupComponent,
    OrdersHistoryComponent,
    MyProfileComponent,
    SavedAddressComponent
  ]
})
export class ProfileTabPageModule { }
