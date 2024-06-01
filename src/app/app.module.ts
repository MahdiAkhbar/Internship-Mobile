import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/\material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MobileComponent } from './components/mobile/mobile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.conponen';
import { LoginComponent } from './components/login/login.component';
import { InfoComponent } from './components/mobile/home/info/info.component';
import { MTradeComponent } from './components/mobile/home/m-trade/m-trade.component';
import { BuySellButtonsComponent } from './components/mobile/home/buy-sell-buttons/buy-sell-buttons.component';
import { MazannehComponent } from './components/mobile/home/mazanneh/mazanneh.component';
import { GraphComponent } from './components/mobile/home/graph/graph.component';
import { PortfoyComponent } from './components/mobile/home/portfoy/portfoy.component';
import { WatchlistComponent } from './components/mobile/home/watchlist/watchlist.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileSectionComponent } from './components/profile/profile-section/profile-section.component';
import { ChangePasswordSectionComponent } from './components/profile/change-password-section/change-password-section.component';
import { SignupComponent } from './components/signup/signup.component';
import { CommonModule } from '@angular/common';
import { WatchlistItemComponent } from './components/mobile/home/watchlist/watchlist-item/watchlist-item.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import { AuthInterceptor } from './shared/services/auth-interceptor.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/mobile/home/home.component';
import { SearchPipe } from './shared/pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MobileComponent,
    LoadingSpinnerComponent,
    LoginComponent,
    SignupComponent,
    InfoComponent,
    MTradeComponent,
    BuySellButtonsComponent,
    MazannehComponent,
    GraphComponent,
    PortfoyComponent,
    WatchlistComponent,
    ProfileComponent,
    ProfileSectionComponent,
    ChangePasswordSectionComponent,
    WatchlistItemComponent,
    BottomSheetComponent,
    NavbarComponent,
    HomeComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule,
    MatTooltipModule,
    NgApexchartsModule
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: 'API_URL', useValue: 'http://192.168.132.110:8080/api/v1' },
    { provide: 'GLOBAL_TOKEN', useValue: 'TOKEN' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
