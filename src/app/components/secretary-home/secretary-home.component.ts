import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-secretary-home',
  templateUrl: './secretary-home.component.html',
  styleUrls: ['./secretary-home.component.scss']
})
export class SecretaryHomeComponent implements OnInit {
  username: string;
  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationsService) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.notificationService.error('Usuário não autenticado');
      this.authService.logout();
      this.router.navigate(['/']);
    } else if(!this.authService.isAuthenticated() || ('SECRETARY' !== this.authService.getProfile())) {
      this.notificationService.error('Você não ter permissão para acessar essa tela');
      this.router.navigate([`/${this.authService.getProfile().toLocaleLowerCase()}-home`]);
    }
    this.username = this.authService.getUsername();
  }

}
