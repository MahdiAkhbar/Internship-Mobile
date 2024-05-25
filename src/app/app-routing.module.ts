import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileComponent } from './components/mobile/mobile.component';
import { authGuard } from './shared/guards/auth.guard';
import { MTradeComponent } from './components/mobile/home/m-trade/m-trade.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/mobile/home/home.component';

const routes: Routes = [
  {
    path: '', component: MobileComponent, children: [
      { path: '', redirectTo: 'm', pathMatch: 'full' },
      {
        path: 'm', component: HomeComponent, canActivate: [authGuard], children: [
          { path: '', component: MTradeComponent },
          { path: 'profile', component: ProfileComponent },
          // { path: 'signup', component: SignupComponent },
          // { path: 'login', component: LoginComponent },
        ]
      },
    ]
  },

  { path: 'm/signup', component: SignupComponent },
  { path: 'm/login', component: LoginComponent },

  // {
  //   path: 'd', component: DHomeComponent, canActivate: [authGuard], children: [
  //     { path: '', component: DTradeComponent },
  //     { path: 'profile', component: ProfileComponent },
  //   ]
  // },
  // { path: 'd/signup', component: DSignupComponent },
  // { path: 'd/login', component: DLoginComponent },
  { path: '**', redirectTo: '/m' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
