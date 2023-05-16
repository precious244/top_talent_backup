import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileModel } from 'src/app/module/admin/profile/model/profile.model';
import { AddSalaryService } from 'src/app/services/add-salary/add-salary.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { AddSalaryModel } from '../modal-add-salary/model/add-salary.model';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-edit-salary',
  templateUrl: './modal-edit-salary.component.html',
  styleUrls: ['./modal-edit-salary.component.scss']
})
export class ModalEditSalaryComponent {
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
  public autoSaveEnabled = false;
  options = { prefix: '',  precision: 0, inputMode: CurrencyMaskInputMode.NATURAL }

  constructor(
    public activeModal: NgbActiveModal,
    private readonly salaryService: AddSalaryService,
    public readonly authService: AuthService,
    public readonly profileService: ProfileService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.salaryService.getCurrency().subscribe(
      (response:any) => {
        this.salaryModel.allCurrency = response.data;
      },
      (error) => {
      });

    if (this.authService.isLogin()) {
      this.userData = this.authService.loadUserData()
    }
    this.salaryModel.formGroupEditSalary.controls['jobseekerId'].setValue(this.userData.jobseekerId);
    this.profileService.getUserProfile(this.salaryModel.formGroupEditSalary.value).subscribe(
      (response: any) => {
        this.salaryModel.userProfile = response.data;
        this.profile = this.salaryModel.userProfile;
        this.salaryModel.salary = response.data.jobseekerSalary;
      })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.salaryModel.formGroupEditSalary.controls;
  }

   updateSalary(){
    this.salaryModel.formGroupEditSalary.markAllAsTouched();
    this.salaryModel.formGroupEditSalary.controls['jobseekerId'].setValue(this.userData.jobseekerId)
    this.salaryService.getSalaryId(this.salaryModel.formGroupEditSalary.value).subscribe(
      (response: any) => {
        var salaryId = response.data.salaryId
        this.salaryModel.formGroupEditSalary.controls['salaryId'].setValue(salaryId)
        console.log(this.salaryModel.formGroupEditSalary.value, salaryId)
        this.salaryService.updateSalary(this.salaryModel.formGroupEditSalary.value).subscribe(
          (response: any) => {
            this.salaryService.saveData(response.data)
            this.submitted = true
            this.activeModal.dismiss('Cross click')
            window.location.reload();
        }, error => { this.toastr.error('Expected Maximum need to be higher than Expected Minimum!', 'Failed', {
          timeOut: 3000})}
        )
      },
      (error) => {
        this.toastr.error('Expected Maximum need to be higher than expected Minimum!', 'Failed', {
          timeOut: 3000});
      }
      )}

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
