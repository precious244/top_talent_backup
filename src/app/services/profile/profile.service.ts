import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  urlCityCountry: string = "https://raw.githubusercontent.com/sagarshirbhate/Country-State-City-Database/master/Contries.json";
  index = 0;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    ) { }

  token = this.authService.loadUserData().token;
  headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`);

  allCountries(): Observable<any> {
    return this.http.get("assets/Contries.json");
  }

  public getUserProfile(body: any): Observable<unknown> {
    const params = new HttpParams()
      .set('jobseekerId', body.jobseekerId);
    return this.http.get('http://54.251.83.205:9091/api/v1/jobseeker/user', { params: params, headers: this.headers });
  }

  public getUserSkills(body: any): Observable<unknown> {
    const params = new HttpParams()
      .set('jobseekerId', body.jobseekerId);
    return this.http.get('http://54.251.83.205:9091/api/v1/jobseeker/detail/get-skill', { params: params, headers: this.headers  });
  }

  public getAllSkills(): Observable<any> {
    const url = 'http://54.251.83.205:9091/api/v1/jobseeker/get-skill';
    return this.http.get(url, { headers: this.headers});
  }

  public getAllUniversity(): Observable<any> {
    return this.http.get('http://54.251.83.205:9091/api/v1/jobseeker/education/get-university', { headers: this.headers});
  }

  public getAllDegree(): Observable<any> {
    const url = 'http://54.251.83.205:9091/api/v1/jobseeker/education/get-degree';
    return this.http.get(url, { headers: this.headers});
  }

  public getAllMajor(): Observable<any> {
    const url = 'http://54.251.83.205:9091/api/v1/jobseeker/education/get-major';
    return this.http.get(url, { headers: this.headers});
  }

  public getAllLanguage(): Observable<any> {
    const url = 'http://54.251.83.205:9091/api/v1/jobseeker/language-list';
    return this.http.get(url, { headers: this.headers});
  }

  public addSalary(body: any): Observable<any> {
    const params = new HttpParams()
      .set('jobseekerId', body.jobseekerId)
      .set('currentCurrency', body.currentCurrency)
      .set('expectedCurrency', body.expectedCurrency)
      .set('currentSalary', body.currentSalary)
      .set('expectedMinimum', body.expectedMinimum)
      .set('expectedMaximum', body.expectedMaximum);

    return this.http.post('http://54.251.83.205:9091/api/v1/jobseeker/detail/salary', params, { headers: this.headers });
  }

  public editSkill(body: any): Observable<any> {

    const token = this.authService.loadUserData().token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post('http://54.251.83.205:9091/api/v1/jobseeker/add/skill', JSON.stringify(body), httpOptions);
  }

  public addLanguage(body: any): Observable<any> {

    const token = this.authService.loadUserData().token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    console.log(JSON.stringify(body))

    return this.http.post('http://54.251.83.205:9091/api/v1/jobseeker/add/languages', JSON.stringify(body), httpOptions);
  }

  editProfile(body: any): Observable<any> {
    const formData = new FormData();
    formData.append("jobseekerId", body.jobseekerId)
    formData.append("jobseekerFirstName", body.jobseekerFirstName)
    formData.append("jobseekerLastName", body.jobseekerLastName)
    formData.append("countryId", body.countryId)
    formData.append("cityId", body.cityId)
    formData.append("jobseekerPhone", body.jobseekerPhone)
    formData.append("jobseekingStatus", body.jobseekingStatus)
    formData.append("jobseekerProfession", body.jobseekerProfession)
    formData.append("jobseekerPortfolio", body.jobseekerPortfolio)
    formData.append("jobseekerFacebook", body.jobseekerFacebook)
    formData.append("jobseekerTwitter", body.jobseekerTwitter)
    formData.append("jobseekerInstagram", body.jobseekerInstagram)
    formData.append("jobseekerLinkedin", body.jobseekerLinkedin);
    return this.http.patch('http://54.251.83.205:9091/api/v1/jobseeker/update/profile/', formData, { headers: this.headers } );
  }

  public getCountryList(): Observable<any> {
    const url = 'http://54.251.83.205:9091/api/v1/jobseeker/get-country-list';
    return this.http.get(url, { headers: this.headers});
  }

  public getCityList(body: any): Observable<unknown> {
    const params = new HttpParams()
      .set('countryId', body);
    return this.http.get('http://54.251.83.205:9091/api/v1/jobseeker/get-city', { params: params, headers: this.headers });
  }

  deleteImage(body: any): Observable<any> {
    const formData = new FormData();
    formData.append("jobseekerId", body.jobseekerId);
    return this.http.patch('http://54.251.83.205:9091/api/v1/jobseeker/delete/image/', formData,  { headers: this.headers })
  }

  addEducation(body: any): Observable<any> {
    const formData = new FormData();
    formData.append("jobseekerId", body.jobseekerId)
    formData.append("schoolUniversity", body.schoolUniversity)
    formData.append("degreeName", body.degreeName)
    formData.append("majorName", body.majorName)
    formData.append("startPeriodMonth", body.startPeriodMonth)
    formData.append("endPeriodMonth", body.endPeriodMonth)
    formData.append("startPeriodYear", body.startPeriodYear)
    formData.append("endPeriodYear", body.endPeriodYear)
    formData.append("gradePointMax", body.gradePointMax)
    formData.append("educationDescription", body.educationDescription)
    formData.append("gradePoint", body.gradePoint)
    return this.http.post('http://54.251.83.205:9091/api/v1/jobseeker/create/education', formData,  { headers: this.headers });
  }

  updateEducation(body: any): Observable<any> {
    const formData = new FormData();
    formData.append("jobseekerId", body.jobseekerId)
    formData.append("educationId", body.educationId)
    formData.append("schoolUniversity", body.schoolUniversity)
    formData.append("degreeName", body.degreeName)
    formData.append("majorName", body.majorName)
    formData.append("startPeriodMonth", body.startPeriodMonth)
    formData.append("endPeriodMonth", body.endPeriodMonth)
    formData.append("startPeriodYear", body.startPeriodYear)
    formData.append("endPeriodYear", body.endPeriodYear)
    formData.append("gradePoint", body.gradePoint)
    formData.append("gradePointMax", body.gradePointMax)
    formData.append("educationDescription", body.educationDescription)
    return this.http.patch('http://54.251.83.205:9091/api/v1/jobseeker/update/education', formData,  { headers: this.headers });
  }

  public getEduList(body: any): Observable<unknown> {
    const params = new HttpParams()
      .set('jobseekerId', body.jobseekerId);
    return this.http.get('http://54.251.83.205:9091/api/v1/jobseeker/education/list', { params: params, headers: this.headers });
  }

  public getEduDetail(body: any): Observable<unknown> {
    const params = new HttpParams()
      .set('jobseekerId', body.jobseekerId)
      .set('educationId', body.educationId);
    return this.http.get('http://54.251.83.205:9091/api/v1/jobseeker/education/detail', { params: params, headers: this.headers });
  }

  deleteEdu(body: any): Observable<any> {
    const formData = new FormData();
    formData.append("jobseekerId", body.jobseekerId);
    formData.append("educationId", body.educationId);
    return this.http.patch('http://54.251.83.205:9091/api/v1/jobseeker/delete/education/', formData, { headers: this.headers })
  }

  public getAllJobType(): Observable<any> {
    const url = 'http://54.251.83.205:9091/api/v1/jobseeker/experience/get-job-type';
    return this.http.get(url, { headers: this.headers});
  }

  public getAllJobFunction(): Observable<any> {
    const url = 'http://54.251.83.205:9091/api/v1/jobseeker/experience/get-job-function';
    return this.http.get(url, { headers: this.headers});
  }

  public getAllCompanyList(): Observable<any> {
    const url = 'http://54.251.83.205:9091/api/v1/jobseeker/experience/get-company-list';
    return this.http.get(url, { headers: this.headers});
  }

  public getExpList(body: any): Observable<unknown> {
    const params = new HttpParams()
      .set('jobseekerId', body.jobseekerId);
    return this.http.get('http://54.251.83.205:9091/api/v1/jobseeker/experience/list', { params: params, headers: this.headers });
  }

  public getExpDetail(body: any): Observable<unknown> {
    const params = new HttpParams()
      .set('jobseekerId', body.jobseekerId)
      .set('experienceId', body.experienceId);
    return this.http.get('http://54.251.83.205:9091/api/v1/jobseeker/experience/detail', { params: params, headers: this.headers });
  }

  deleteExp(body: any): Observable<any> {
    const formData = new FormData();
    formData.append("jobseekerId", body.jobseekerId);
    formData.append("experienceId", body.experienceId);
    return this.http.patch('http://54.251.83.205:9091/api/v1/jobseeker/delete/experience', formData, {headers: this.headers})
  }

  editExp(body: any): Observable<any> {
    const formData = new FormData();
    formData.append("jobseekerId", body.jobseekerId)
    formData.append("jobTitle", body.jobTitle)
    formData.append("jobFunctionId", body.jobFunctionId)
    formData.append("companyName", body.companyName)
    formData.append("jobTypeId", body.jobTypeId)
    formData.append("countryId", body.countryId)
    formData.append("cityId", body.cityId)
    formData.append("startPeriodMonth", body.startPeriodMonth)
    formData.append("endPeriodMonth", body.endPeriodMonth)
    formData.append("startPeriodYear", body.startPeriodYear)
    formData.append("endPeriodYear", body.endPeriodYear)
    formData.append("isPresent", body.isPresent)
    formData.append("jobDescription", body.jobDescription)
    return this.http.post('http://54.251.83.205:9091/api/v1/jobseeker/create/experience', formData, {headers: this.headers});
  }

  updateExp(body: any): Observable<any> {
    const formData = new FormData();
    formData.append("jobseekerId", body.jobseekerId)
    formData.append("experienceId", body.experienceId)
    formData.append("jobTitle", body.jobTitle)
    formData.append("jobFunctionId", body.jobFunctionId)
    formData.append("companyName", body.companyName)
    formData.append("jobTypeId", body.jobTypeId)
    formData.append("countryId", body.countryId)
    formData.append("cityId", body.cityId)
    formData.append("startPeriodMonth", body.startPeriodMonth)
    formData.append("startPeriodYear", body.startPeriodYear)
    formData.append("endPeriodMonth", body.endPeriodMonth)
    formData.append("endPeriodYear", body.endPeriodYear)
    formData.append("isPresent", body.isPresent)
    formData.append("jobDescription", body.jobDescription)
    return this.http.patch('http://54.251.83.205:9091/api/v1/jobseeker/update/experience/', formData, {headers: this.headers});
  }

  public setIndex(index: number) {
    this.index = index;
  }

  public getIndex() {
    return this.index;
  }

  onUploadPhoto(body: any): Observable<any> {
    const formData = new FormData();
    formData.append("jobseekerId", body.jobseekerId);
    formData.append("jobseekerImage", body.jobseekerImage);
    return this.http.post('http://54.251.83.205:9091/api/v1/jobseeker/user/update/image', formData, {headers: this.headers})
  }

  editCertificate(body: any): Observable<any> {
    const formData = new FormData();
    formData.append("certificateId", body.certificateId)
    formData.append("jobseekerId", body.jobseekerId)
    formData.append("certificateFile", body.certificateFile)
    formData.append("certificateName", body.certificateName)
    formData.append("certificateIssuer", body.certificateIssuer)
    formData.append("issuedMonth", body.issuedMonth)
    formData.append("issuedYear", body.issuedYear)
    formData.append("expiredMonth", body.expiredMonth)
    formData.append("expiredYear", body.expiredYear)
    formData.append("credentialLink", body.credentialLink)
    return this.http.patch('http://54.251.83.205:9091/api/v1/jobseeker/edit-certification', formData, {headers: this.headers})
  }

  onUploadCertificate(body: any): Observable<any> {
    const formData = new FormData();
    formData.append("jobseekerId", body.jobseekerId)
    formData.append("certificateFile", body.certificateFile)
    formData.append("certificateName", body.certificateName)
    formData.append("certificateIssuer", body.certificateIssuer)
    formData.append("issuedMonth", body.issuedMonth)
    formData.append("issuedYear", body.issuedYear)
    formData.append("expiredMonth", body.expiredMonth)
    formData.append("expiredYear", body.expiredYear)
    formData.append("credentialLink", body.credentialLink)
    return this.http.patch('http://54.251.83.205:9091/api/v1/jobseeker/add-certification', formData, {headers: this.headers})
  }

   addCertificate(body: FormData): Observable<any> {
    return this.http.post('http://54.251.83.205:9091/api/v1/jobseeker/add-certification', body, {headers: this.headers});
  }
}
