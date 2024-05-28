import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { UserAgentService } from './shared/services/user-agent.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userAgentService: UserAgentService
  ) { }

  title = 'trader-mobile';
  userDeviceType!: string;

  ngOnInit(): void {
    this.authService.isLoggedin.subscribe(value => {
      this.authService.isLoggedinState = value;
    });
    this.userDeviceType = this.userAgentService.getDeviceType();
    if (this.userDeviceType === 'Desktop')
      window.location.href = 'http://192.168.130.176:4200/d';
  }
}
