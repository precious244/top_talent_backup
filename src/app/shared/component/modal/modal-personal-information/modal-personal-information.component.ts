import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSalaryService } from 'src/app/services/add-salary/add-salary.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UploadFileService } from 'src/app/services/upload-cv/upload-file.service';
import { ModalPersonalModel } from './model/modal-personal-information.model';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-personal-information',
  templateUrl: './modal-personal-information.component.html',
  styleUrls: ['./modal-personal-information.component.scss']
})
export class ModalPersonalInformationComponent implements OnInit {

  @Input() data: any;
  @Input() file: any;
  @Input() saveCv: any;
  @Input() saveImage: any;
  @Input() resetFileUploader: any;
  @Input() closeModal: any;
  fileName = '';
  file_error: any;
  selectedFile: File = null as any;
  selectedFileName = '';
  invisible: boolean = true;

  status = "Change File"
  available = "display: true;"
  notAvailable = "display: none;"
  
  modalPersonalModel = new ModalPersonalModel();
  profile: any = {};
  id: any;
  userData: any = {};
  isUploaded: unknown;
  allCountry: any = [];
  imageUrl: any
  submitted = false;
  isUpload: unknown;
  onUpload: unknown;

  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
  selected: any;
  faCoffee = faCoffee;
  roleData2 = [];
  countryId: any

  constructor(
    public activeModal: NgbActiveModal,
    public readonly authService: AuthService,
    public readonly profileService: ProfileService,
    public readonly router: Router,
    public readonly uploadCvService: UploadFileService,
    private readonly salaryService: AddSalaryService,
  ) { }

  ngOnInit(): void {
    if (this.authService.isLogin()) {
      this.userData = this.authService.loadUserData()
    }
    const param = {
      jobseekerId: this.data.jobseekerId
    }
    this.profileService.getUserProfile(param).subscribe(
      (response: any) => {
        this.modalPersonalModel.userProfile = response.data;
        this.profile = this.modalPersonalModel.userProfile;
        this.modalPersonalModel.skills = response.data.skills;
      })
      this.getCountries();
      this.onChangeCountry(this.countryId) ;
    }

getCountries(){
  this.profileService.getCountryList().subscribe(
    (response) => {
      this.modalPersonalModel.allCountry = response.data;
  })}

onChangeCountry(countryId:any) {
    this.modalPersonalModel.allCity = this.modalPersonalModel.allCountry[countryId];
    this.profileService.getCityList(countryId).subscribe(
      (response:any)=>{
        this.modalPersonalModel.allCity = response.data
      }
    )
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.modalPersonalModel.profileModelForm.controls;
  }

  updateData() {
    this.modalPersonalModel.profileModelForm.markAllAsTouched();
    this.modalPersonalModel.profileModelForm.controls['jobseekerId'].setValue(this.userData.jobseekerId);
    this.profileService.editProfile(this.modalPersonalModel.profileModelForm.value).subscribe(
        (response: any) => {
          this.salaryService.saveData(response.data)
          this.submitted = true
          this.activeModal.dismiss('Cross click')
          window.location.reload()
        })
      }

  changeEmail() {
    this.router.navigate(["settings/:id"]);
  }

  close() {
    this.close
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
