import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.scss']
})
export class TeacherHomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationsService) { }

  ngOnInit() {
    if(!this.authService.isAuthenticated() || ('TEACHER' !== this.authService.getProfile())) {
      this.notificationService.error('Você não ter permissão para acessar essa tela');
      this.router.navigate([`/${this.authService.getProfile().toLocaleLowerCase()}-home`]);
    }
  }

}
