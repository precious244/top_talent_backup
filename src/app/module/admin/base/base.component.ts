import { Component, OnInit } from '@angular/core';
import { BaseModel } from './model/base.model';
import { Router } from '@angular/router';
import { JobService } from 'src/app/services/job/job.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  fill = '';
  userData: any = {};
  onSearch: boolean = false;

  baseModel = new BaseModel();

  constructor(
    private readonly router: Router,
    public readonly jobService: JobService,
    public readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
    if (this.authService.isLogin()) {
      this.userData = this.authService.loadUserData()
    }

    this.jobService.getRecentJob().subscribe(
      (response) => {
        this.baseModel.recentJobs = response.data;
      },
      (error) => {

      }
    );
  }

  submitLogin() {
    this.router.navigate(["login"]);
  };

  keJobList() {
    this.router.navigate(["jobs/search"], { queryParams: { data: this.fill } });
  };

  keJobSearch() {
    this.router.navigate(["main/job-search"], { queryParams: { data: this.fill } });
    this.onSearch = true;
  };
}
