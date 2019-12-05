import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_STORAGE_KEY = 'authorization';

  constructor() {
  }

  public getToken(): string {
    return localStorage.getItem(this.TOKEN_STORAGE_KEY);
  }

  public setToken(auth_token: string): void {
    localStorage.setItem(this.TOKEN_STORAGE_KEY, auth_token);
  }

  public clearToken(): void {
    localStorage.removeItem(this.TOKEN_STORAGE_KEY);
  }

  public getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken());
  }

  // public setFunctionality(functionality: string): void {
  //   localStorage.setItem('functionality', functionality);
  // }
  //
  // public getFunctionalit(): string {
  //   return localStorage.getItem('functionality');
  // }
}
