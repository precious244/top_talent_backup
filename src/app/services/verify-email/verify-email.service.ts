import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyEmailService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  token = this.authService.loadUserData().token;
  headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`);

  sendVerificationMail(body: any): Observable<any> {
    const params = new HttpParams()
      .set('jobseekerEmail', body.jobseekerEmail);

    return this.http.post('http://54.251.83.205:9091/api/v1/jobseeker/resend', params, {headers: this.headers});
  }
}
