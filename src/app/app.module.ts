import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './components/register/register.component';
import {FooterComponent} from './components/shared/components/footer/footer.component';
import {HeaderComponent} from './components/shared/components/header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {HomeComponent} from './components/home/home.component';
import {BaseHttpClient} from './components/shared/services/base-http-client.service';
import {JWT_OPTIONS, JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {StudentService} from './components/shared/services/student.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TokenService} from './components/shared/services/token.service';
import {environment} from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SecretaryHomeComponent } from './components/secretary-home/secretary-home.component';
import { TeacherHomeComponent } from './components/teacher-home/teacher-home.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

// Função de configuração do componente de JWT
export function jwtOptionsFactory(tokenService: TokenService) {
    // Tirando HTTP(S):// do caminho do servidor de API
    const apiServer = environment.API_URL.replace(/https?:\/\//gi, '');
    return {
        tokenGetter: () => {
            return tokenService.getToken();
        },
        whitelistedDomains: [apiServer], // Servidor da API
        headerName: 'Authorization', // Nome do header de authentication
        authScheme: '' // texto antes do token no header de authentication
    };
}

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        FooterComponent,
        HeaderComponent,
        HomeComponent,
        LoginComponent,
        StudentHomeComponent,
        SecretaryHomeComponent,
        TeacherHomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(options),
        HttpClientModule,
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory,
                deps: [TokenService]
            }
        }),
        SimpleNotificationsModule.forRoot(),
        BrowserAnimationsModule
    ],
    providers: [JwtHelperService,
        BaseHttpClient,
        StudentService,
        HttpClient
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
