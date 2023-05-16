import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { EditExperienceModel } from './model/edit-experience.model';
import { AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-add-experience',
  templateUrl: './modal-add-experience.component.html',
  styleUrls: ['./modal-add-experience.component.scss']
})
export class ModalAddExperienceComponent implements OnInit {
  
  expModel = new EditExperienceModel();
  maxChars = 2000;
  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
  userData: any = {};
  @Input() data: any;
  profile: any = {};
  submitted: boolean = false;
  value: any = [];
  experience : any = {};

  currentYear = new Date().getFullYear();
  startPeriodYearOptions: number[] = [];
  endPeriodYearOptions: number[] = [];
  chosenYearDate: Date | undefined;
  isDirty = false;

  @Input()
  maxNumberOfCharacters = 2000;
  counter = true;

  numberOfCharacters1 = 0;
  numberOfCharacters2 = 0;
  interaction = {
    textValue: ''
  };

  constructor(
    public activeModal: NgbActiveModal,
    public profileService: ProfileService,
    public readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.endPeriodYearOptions.push(2050 - i);
    }

    for (let i = 0; i < 100; i++) {
      this.startPeriodYearOptions.push(this.currentYear - i);
    }
    if (this.authService.isLogin()) {
      this.userData = this.authService.loadUserData()
    }
    const param = {
      jobseekerId: this.data.jobseekerId
    }
    this.profileService.getUserProfile(param).subscribe(
      (response: any) => {
        this.expModel.userProfile = response.data;
        this.profile = this.expModel.userProfile;
      })
    this.profileService.getAllJobType().subscribe(
      (response) => {
        this.expModel.allJobType = response.data;
      })
    this.profileService.getAllJobFunction().subscribe(
      (response) => {
        this.expModel.allJobFunction = response.data;
      })
    this.profileService.getAllCompanyList().subscribe(
      (response) => {
        this.expModel.allCompany= response.data;
      })
      this.expModel.editExperience.controls['jobseekerId'].setValue(this.userData.jobseekerId);
      this.profileService.getExpList(this.expModel.editExperience.value).subscribe(
          (response: any) => {
            var index = this.profileService.getIndex()
            var experienceId = response.data[index]['experienceId']
            this.expModel.editExperience.controls['experienceId'].setValue(experienceId)
            this.profileService.getExpDetail(this.expModel.editExperience.value).subscribe(
              (data:any) => {
                this.expModel.dataExperience = data.data;
                this.experience = this.expModel.dataExperience;
                this.getCountries();
                this.expModel.editExperience.valueChanges.subscribe( e => this.isDirty = true );
            })})
            this.getCountries();
    }

canDeactivate() {
  return this.isDirty;
}

getCountries(){
  this.profileService.getCountryList().subscribe(
    (response) => {
      this.expModel.allCountry = response.data;
  })}

onChangeCountry(countryId:any) {
    this.expModel.allCity = this.expModel.allCountry[countryId];
    this.profileService.getCityList(countryId).subscribe(
      (response:any)=>{
        this.expModel.allCity = response.data
      }
    )
  }

  get f(): { [key: string]: AbstractControl } {
    return this.expModel.editExperience.controls;
  }

updateData() {
  this.expModel.editExperience.markAllAsTouched();
  this.expModel.editExperience.controls['jobseekerId'].setValue(this.userData.jobseekerId);
  this.profileService.editExp(this.expModel.editExperience.value).subscribe(
      (response: any) => {
        this.profileService.editExp(response.data)
        this.submitted = true
        this.activeModal.dismiss('Cross click')
        window.location.reload()
      })
    }

onKeyUp(event: any): void {
  this.numberOfCharacters1 = event.target.value.length;

  if (this.numberOfCharacters1 > this.maxNumberOfCharacters) {
    event.target.value = event.target.value.slice(0, this.maxNumberOfCharacters);
    this.numberOfCharacters1 = this.maxNumberOfCharacters;
  }
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


