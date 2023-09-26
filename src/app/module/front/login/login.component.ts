import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginService } from 'src/app/services/login/login.service';
import { LoginModel } from './model/login.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  showPassword: boolean = false;
  data: any;
  loginModel = new LoginModel();
  isLoading = false;
  formSubmitted = false;
  rememberMeChecked: boolean = false;

  toggleLoading = () => {
    this.isLoading = true;

    //Faking an API call
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  };

  constructor(
    private readonly loginService: LoginService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private cookieService: CookieService
  ) {
  }

  ngOnInit(): void {
    const loginData = this.cookieService.get('loginData');
    if (loginData) {
      const savedLoginData = JSON.parse(loginData);
      this.loginModel.formGroupLogin.patchValue(savedLoginData);
    }
  }

  checkValidation() {
  }

  onLogin() {
    this.loginService.postLogin(this.loginModel.formGroupLogin.value).subscribe(
      (response) => {
        this.authService.saveUserData(response.data.registerJobseekerDTO)
        this.router.navigate(['main/home'])
      },
      (error) => {
        this.loginModel.responseLogin = error.error;
      }
    )

    if (this.rememberMeChecked) {
      this.cookieService.set('loginData', JSON.stringify(this.loginModel.formGroupLogin.value), 30);
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginModel.formGroupLogin.controls;
  }

  submitForgot() {
    this.router.navigate(["forgot-password"]);
  }

  signUp() {
    this.router.navigate(['sign-up']);
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
