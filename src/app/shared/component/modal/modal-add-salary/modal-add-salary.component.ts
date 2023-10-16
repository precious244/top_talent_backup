import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileModel } from 'src/app/module/admin/profile/model/profile.model';
import { AddSalaryService } from 'src/app/services/add-salary/add-salary.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { AddSalaryModel } from './model/add-salary.model';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-add-salary',
  templateUrl: './modal-add-salary.component.html',
  styleUrls: ['./modal-add-salary.component.scss']
})
export class ModalAddSalaryComponent implements OnInit {

  @Input() data: any;
  @Input() closeModal: any;
  salaryModel = new AddSalaryModel();
  profileModel = new ProfileModel;
  submitted: boolean = false;
  allCurrency: any = [];
  jobseekerId: any;
  userData: any = {};
  profileData: any = {};
  salaryData: any = {};
  profile: any = {};
  value: any;
  ngModelExample: number = 10;
  autoSaveEnabled = false;
  formatOnlyOnBlur: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private readonly salaryService: AddSalaryService,
    public readonly authService: AuthService,
    public readonly profileService: ProfileService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.salaryService.getCurrency().subscribe(
      (response) => {
        this.salaryModel.allCurrency = response.data;
      })
    if (this.authService.isLogin()) {
      this.userData = this.authService.loadUserData()
    }
  }

  public editSalary(){
    this.salaryModel.formGroupEditSalary.controls['jobseekerId'].setValue(this.userData.jobseekerId);
    console.log(this.salaryModel.formGroupEditSalary.value);
    this.salaryService.editSalary(this.salaryModel.formGroupEditSalary.value).subscribe(
      (response: any) => {
        this.salaryService.saveData(response.data)
        this.submitted = true
        this.activeModal.dismiss('Cross click')
        window.location.reload()
      }, error => { this.toastr.error('Expected Maximum need to be higher than Expected Minimum!', 'Failed', {
        timeOut: 3000})}
      )
    }
  
    confirmBox(){
      Swal.fire({
        title: 'Are you sure you want to cancel ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result:any) => {
        if (result.value) {
          window.location.reload()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      })
    }
  }