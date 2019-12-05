import {Injectable} from '@angular/core';
import {BaseHttpClient} from './base-http-client.service';

@Injectable({
    providedIn: 'root'
})
export class StudentService {


    constructor(private http: BaseHttpClient) {

    }

    public register(transacao: any): Promise<any> {
        return this.http.post(`student/register`, transacao).toPromise();
    }

    public listAll(params: any): Promise<any> {
        return this.http.list(`${'transacao_ib/todas'}`, params).toPromise();
    }

    public total(params: any): Promise<any> {
        return this.http.list(`${'transacao_ib/total'}`, params).toPromise();
    }

    public detalhesNexxera(nsu: string): Promise<any> {
        return this.http.get(`${'transacao_ib/status_nexxera/' + nsu}`).toPromise();
    }

    public listaBancos(): Promise<any> {
        return this.http.get(`${'transacao_ib/bancos'}`).toPromise();
    }
}
