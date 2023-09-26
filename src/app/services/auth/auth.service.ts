import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private http: HttpClient,
    private router: Router) { }

  saveUserData(userData: any) {
    localStorage.setItem('login', JSON.stringify(userData))
  }

  loadUserData() {
    const loginData = localStorage.getItem('login')
    return JSON.parse(loginData ? loginData : '');
  }

  isLogin() {
    const loginData = localStorage.getItem('login')
    return loginData !== null;
  }

  logOut() {
    localStorage.clear()
    this.router.navigate([''])
  }
}
