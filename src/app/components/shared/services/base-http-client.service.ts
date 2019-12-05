import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {AuthService} from './auth.service';
import {TokenService} from './token.service';

@Injectable()
export class BaseHttpClient {
  private baseUrl: string;

  constructor(
      private router: Router,
      private http: HttpClient,
      private auth: AuthService,
      private tokenService: TokenService
  ) {
    this.baseUrl = environment.API_URL;
    // this.notifications = notifications;
  }

  get(url) {
    return this.http.get(`${this.baseUrl}/${url}`, {
      headers: this.tokenService.getHeaders()
    });
  }

  list(url, params) {
    return this.http.get(`${this.baseUrl}/${url}`, {
      params: params,
      headers: this.tokenService.getHeaders()
    });
  }

  post(url, data) {
    return this.http.post(`${this.baseUrl}/${url}`, data, {
      headers: this.tokenService.getHeaders()
    });
  }

  put(url, data) {
    return this.http.put(`${this.baseUrl}/${url}`, data, {
      headers: this.tokenService.getHeaders()
    });
  }

  patch(url, data) {
    return this.http.patch(`${this.baseUrl}/${url}`, data, {
      headers: this.tokenService.getHeaders()
    });
  }

  delete(url) {
    return this.http.delete(`${this.baseUrl}/${url}`, {
      headers: this.tokenService.getHeaders()
    });
  }

  public redirectToLogin() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  public getFile(url) {
    return this.http.get(`${this.baseUrl}/${url}`, {
      headers: this.tokenService.getHeaders(),
      responseType: 'blob'
    });
  }
}
