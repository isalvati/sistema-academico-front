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

    public getStudentByUser(userId: number): Promise<any> {
        return this.http.get(`student/user/${userId}`).toPromise();
    }

    public lockRegister(studentId: number): Promise<any> {
        return this.http.post(`student/lock/${studentId}`, null).toPromise();
    }

    public renewRegister(studentId: number): Promise<any> {
        return this.http.post(`student/renew/${studentId}`, null).toPromise();
    }

    public update(studentId: number, data: any): Promise<any> {
        return this.http.post(`student/update/${studentId}`, data).toPromise();
    }
}
