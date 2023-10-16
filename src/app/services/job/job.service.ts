import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    ) {}

  token = this.authService.loadUserData().token;
  headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`);

  public getRecentJob(): Observable<any> {
    return this.http.get('http://54.251.83.205:9091/api/v1/job-posting/recent-jobs', {headers: this.headers});
  }

  public getDetailJob(body: any): Observable<unknown> {
    const params = new HttpParams()
      .set('jobId', body.jobId)
      .set('jobStatus', body.jobStatus);
    return this.http.get('http://54.251.83.205:9091/api/v1/job-posting/job_detail', { params: params, headers: this.headers});
  }

  public getAppliedJob(body: any): Observable<unknown> {
    const params = new HttpParams()
      .set('jobseekerId', body.jobseekerId)
    return this.http.get('http://54.251.83.205:9091/api/v1/application/job/applied', { params: params,  headers: this.headers });
  }

  public postCV(body: any): Observable<any> {
    const params = new HttpParams()
      .set('jobseekerId', body.jobseekerId)
      .set('jobseekerResume', body.jobseekerResume);

    return this.http.post('http://54.251.83.205:9091/api/v1/jobseeker/user/update/resume', params, { headers: this.headers} );
  }

  public searchJobs(body: any): Observable<any> {
    const params = new HttpParams()
      .set('keyword', body.keyword)

    return this.http.get('http://54.251.83.205:9091/api/v1/jobseeker/search', { params: params, headers: this.headers});
  }

  submitApplication(body: any): Observable<any> {
    const formData = new FormData();
    formData.append("jobId", body.jobId)
    formData.append("jobseekerId", body.jobseekerId);
    return this.http.post('http://54.251.83.205:9091/api/v1/jobseeker/apply/submit-application', formData, { headers: this.headers} );
  }

  public getAppliedDetailJob(body: any, data: any): Observable<unknown> {
    const params = new HttpParams()
    .set("jobseekerId", body.jobseekerId)
    .set("jobId", data.jobId);
    return this.http.get('http://54.251.83.205:9091/api/v1/application/job/applied/detail', { params: params,  headers: this.headers});
  }

  public applyJob(body: any): Observable<any> {

    const token = this.authService.loadUserData().token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post('http://54.251.83.205:9091/api/v1/jobseeker/apply/apply-job-posting', JSON.stringify(body), httpOptions);
  }

  public applyJobV2(body: any): Observable<any> {
    const params = new HttpParams()
      .set('jobseekerId', body.jobseekerId)
      .set('jobId', body.jobId)
      .set('screeningIds', body.screeningIds)
      .set('questionAnswers', body.questionAnswers);

    return this.http.post('http://54.251.83.205:9091/api/v1/jobseeker/apply/apply-job-posting-v2', params, { headers: this.headers} );
  }

  postJob(body: FormData): Observable<any> {
    return this.http.post('http://54.251.83.205:9091/api/v1/jobseeker/apply/apply-job-posting-v2', body, { headers: this.headers});
  }
  
  
}
