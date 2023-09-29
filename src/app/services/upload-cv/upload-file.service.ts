import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    ) { }

  token = this.authService.loadUserData().token;
  headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`);
    
  upload(body: any): Observable<any> {
    const formData = new FormData();
    formData.append("jobseekerId", body.jobseekerId);
    formData.append("jobseekerResume", body.jobseekerResume);
    return this.http.post('http://54.251.83.205:9091/api/v1/jobseeker/user/update/resume', formData, {headers: this.headers})
  }

  onUploadCv(body: any): Observable<any> {
    const formData = new FormData();
    formData.append("jobId", body.jobId);
    formData.append("jobseekerId", body.jobseekerId);
    formData.append("jobseekerResume", body.jobseekerResume);
    return this.http.post('http://54.251.83.205:9091/api/v1/jobseeker/job/applies', formData, {headers: this.headers})
  }

  public getApplyStatus(body: any, data: any): Observable<unknown> {
    const params = new HttpParams()
      .set("jobId", data.jobId)
      .set("jobseekerId", body.jobseekerId);
    return this.http.get('http://54.251.83.205:9091/api/v1/jobseeker/apply/check-status', { params: params, headers: this.headers });
  }

  public getResumeStatus(body: any): Observable<unknown> {
    const params = new HttpParams()
      .set("jobseekerId", body.jobseekerId);
    return this.http.get('http://54.251.83.205:9091/api/v1/jobseeker/jobseeker/resumestatus', { params: params, headers: this.headers });
  }

  deleteCv(body: any): Observable<any> {
    const formData = new FormData();
    formData.append("jobseekerId", body.jobseekerId);
    return this.http.patch('http://54.251.83.205:9091/api/v1/jobseeker/delete/resume/', formData, {headers: this.headers})
  }
}
