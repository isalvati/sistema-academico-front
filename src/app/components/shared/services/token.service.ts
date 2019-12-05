import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private readonly TOKEN_STORAGE_KEY = 'AUTHORIZATION';

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
        // console.log(new HttpHeaders().set('AUTHORIZATION', 'Bearer ' + ));

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer-' +this.getToken()
        });
        console.log(headers);
        return headers;
    }

    // public setFunctionality(functionality: string): void {
    //   localStorage.setItem('functionality', functionality);
    // }
    //
    // public getFunctionalit(): string {
    //   return localStorage.getItem('functionality');
    // }
}
