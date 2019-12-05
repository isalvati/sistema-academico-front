import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {

  username: string;
  profile: string;

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationsService) { }

  ngOnInit() {
    if(!this.authService.isAuthenticated() || ('STUDENT' !== this.authService.getProfile())) {
      this.notificationService.error('Você não ter permissão para acessar essa tela');
      this.router.navigate([`/${this.authService.getProfile().toLocaleLowerCase()}-home`]);
    }
    this.username = this.authService.getUsername();
    this.profile = this.authService.getProfile();
  }
}
