import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { IUser } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-profile-section',
  templateUrl: './profile-section.component.html',
  styleUrl: './profile-section.component.css'
})
export class ProfileSectionComponent implements OnInit {
  constructor(
    private userService: UserService
  ) { }

  user!: IUser;

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

}
