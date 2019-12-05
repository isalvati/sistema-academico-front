import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenService} from './token.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseUrl: string;
    private loggedIn = false;
    private userToken: any;

    constructor(
        private http: HttpClient,
        private jwtHelperService: JwtHelperService,
        private tokenService: TokenService
    ) {
        this.baseUrl = environment.API_URL;
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();
        // Check whether the token is expired and return
        // true or false
        return token && !this.jwtHelperService.isTokenExpired(token);
    }

    private getToken(): string {
        return this.tokenService.getToken();
    }

    private setToken(auth_token: string) {
        this.tokenService.setToken(auth_token);
        this.loggedIn = true;
    }

    public login(username: string, password: string): Promise<any> {
        let headers = new HttpHeaders();
         headers = headers.set('key', username).set('secret', password);

        return this.http.get(`${this.baseUrl}/token`, {
            headers
        }).toPromise().then((data: any) => {
            console.log(data);
            const decodedToken = this.jwtHelperService.decodeToken(data['authorization']);
            // this.tokenService.setFunctionality(decodedToken.functionality);

            this.setToken(data['authorization']);
            return {success: true, errorMessage: ''};
        }).catch(error => {
            return {
                success: false,
                errorMessage: 'Usuário e/ou senha errados. Favor corrigir e tentar novamente.'
            };
        });
    }

    public logout(): void {
        this.loggedIn = false;
        this.tokenService.clearToken();
    }

    public isLogged(): Promise<boolean> {
        return Promise.resolve(this.loggedIn);
    }

    public getUsername(): string {
        const token = this.getToken();

        if (token) {
            const expandedToken = this.jwtHelperService.decodeToken(token);
            if (expandedToken) {
                return expandedToken.sub;
            }
        }
        return null;
    }

    private loadDataFromToken(): void {
        const token = this.getToken();
        if (token) {
            this.userToken = this.jwtHelperService.decodeToken(token);
        }
    }

    public getCurrentUserId(): Promise<number> {
        if (!this.userToken) {
            this.loadDataFromToken();
        }
        return Promise.resolve(this.userToken && this.userToken.identifier);
    }
}
