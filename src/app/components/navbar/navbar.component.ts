import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  date!: string;
  time!: string;

  ngOnInit(): void {
    interval(1000).subscribe(() => {
      this.date = new Date().toLocaleDateString('fa-IR');
      this.time = new Date().toLocaleTimeString('fa-IR');
    })
  }

  onLogout() {
    this.authService.logout();
  }

}
