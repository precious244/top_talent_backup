import { Component, Input, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../../services/login/login.service';
import { ModalAddEducationComponent } from 'src/app/shared/component/modal/modal-add-education/modal-add-education.component';
import { ModalAddExperienceComponent } from 'src/app/shared/component/modal/modal-add-experience/modal-add-experience.component';
import { ProfileModel } from './model/profile.model';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ModalAddSalaryComponent } from 'src/app/shared/component/modal/modal-add-salary/modal-add-salary.component';
import { UploadFileService } from 'src/app/services/upload-cv/upload-file.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ModalPersonalInformationComponent } from 'src/app/shared/component/modal/modal-personal-information/modal-personal-information.component';
import { ModalPersonalModel } from 'src/app/shared/component/modal/modal-personal-information/model/modal-personal-information.model';
import { AddSalaryService } from 'src/app/services/add-salary/add-salary.service';
import { ProfileUploadCvComponent } from 'src/app/shared/component/modal/profile-upload-cv/profile-upload-cv.component';
import { ModalEditExperienceComponent } from 'src/app/shared/component/modal/modal-edit-experience/modal-edit-experience.component';
import { EditExperienceModel } from 'src/app/shared/component/modal/modal-add-experience/model/edit-experience.model';
import { ModalEducationModel } from 'src/app/shared/component/modal/modal-add-education/model/modal-education.model';
import { ModalEditEducationComponent } from 'src/app/shared/component/modal/modal-edit-education/modal-edit-education.component';
import { ModalEditSkillsComponent } from 'src/app/shared/component/modal/modal-edit-skills/modal-edit-skills.component';
import { ModalEditSalaryComponent } from 'src/app/shared/component/modal/modal-edit-salary/modal-edit-salary.component';
import { ModalUploadPhotoComponent } from 'src/app/shared/component/modal/modal-upload-photo/modal-upload-photo.component';
import { ModalAddLanguageComponent } from 'src/app/shared/component/modal/modal-add-language/modal-add-language.component';
import { ModalAddCertificateComponent } from 'src/app/shared/component/modal/modal-add-certificate/modal-add-certificate.component';
import { ModalEditCertificateComponent } from 'src/app/shared/component/modal/modal-edit-certificate/modal-edit-certificate.component';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormat {
  transform(value: number,
      decimalLength: number = 0, 
      chunkDelimiter: string = '.', 
      decimalDelimiter: string = ',',
      chunkLength: number = 3): string {

      if (value == null) {
          return ''; // Handle the case when value is null or undefined
      }

      let result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';
      let num = value.toFixed(Math.max(0, ~~decimalLength));

      return (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(result, 'g'), '$&' + chunkDelimiter);
  }
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() submitCertificate: any;
  profileModel = new ProfileModel();
  modalPersonalModel = new ModalPersonalModel();
  educationModel = new ModalEducationModel();
  profile: any = {};
  degree: any = {};
  id: any;
  userData: any = {};
  isUploaded: unknown;
  education: any = {};
  submitted: boolean = false;
  fileName = '';
  @Input() file: any;
  isUpload: unknown;
  onUpload: unknown;
  countryInfo: any[] = [];
  countryValue: any;
  countryName: any;
  expModel = new EditExperienceModel();
  k: any;
  EditSalary: unknown;

  constructor(
    public readonly loginService: LoginService,
    public readonly profileService: ProfileService,
    public readonly router: Router,
    private readonly modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    public readonly uploadCvService: UploadFileService,
    public readonly authService: AuthService,
    private readonly salaryService: AddSalaryService,
  ) { }

  ngOnInit(): void {
    if (this.authService.isLogin()) {
      this.userData = this.authService.loadUserData()
    }
    this.activatedRoute.paramMap.subscribe((data: any) => {
      let id = data.params.id,
        params = {
          jobseekerId: id,
        }
      this.profileService.getUserProfile(params).subscribe(
        (response: any) => {
          this.profileModel.userProfile = response.data;
          this.profile = this.profileModel.userProfile;
          this.profileModel.skills = response.data.skills;
          this.profileModel.salary = response.data.jobseekerSalary;
          this.profileModel.education = response.data.jobseekerEducation;
          this.profileModel.experience = response.data.jobseekerExperience;
        },
        (error) => {
        })

      this.profileService.getAllDegree().subscribe(
        (response) => {
          this.profileModel.allDegree = response.data;
          this.degree = this.profileModel.allDegree;
        },
        (error) => {
        })

      this.profileModel.uploadImageForm.controls['jobseekerId'].setValue(this.userData.jobseekerId);
      this.uploadCvService.getResumeStatus(this.profileModel.uploadImageForm.value).subscribe(
        (response: any) => {
          this.isUploaded = true;
        })
    })
    this.getCountries();
  }

  getCountries() {
    this.profileService.allCountries().
      subscribe(
        data2 => {
          this.countryInfo = data2.Countries
        },
      )
  }

  openEditProfilePhoto() {
    const modal = this.modalService.open(
      ModalUploadPhotoComponent, { size: 'md' });
    modal.componentInstance.data = this.profileModel.userProfile;
    modal.componentInstance.file = this.profileModel.uploadImageForm.controls['jobseekerImage'];
    modal.componentInstance.saveImage = () => { this.saveImage() }
    modal.componentInstance.resetFileUploader = () => { this.resetFileUploader() }
  }

  openAddExperience() {
    const modal = this.modalService.open(
      ModalAddExperienceComponent, { size: 'lg' }
    );
    modal.componentInstance.data = this.profileModel.userProfile;
  }

  roleData = [];

  openEditExperience(j:any) {
    this.profileService.setIndex(j)
    const modal = this.modalService.open(
      ModalEditExperienceComponent, { size: 'lg' }
    );
    modal.componentInstance.data = this.profileModel.userProfile;
    modal.componentInstance.deleteExp = () => { this.deleteExp(j) }
  }

  deleteExp(j:any) {
    this.profileService.setIndex(j)
    this.expModel.editExperience.controls['jobseekerId'].setValue(this.userData.jobseekerId);
    this.profileService.getExpList(this.expModel.editExperience.value).subscribe(
      (response: any) => {
        var index = this.profileService.getIndex()
        var experienceId = response.data[index]['experienceId']
        this.expModel.editExperience.controls['experienceId'].setValue(experienceId)
        this.profileService.deleteExp(this.expModel.editExperience.value).subscribe(
          (response: any) => {
            this.salaryService.saveData(response.data)
            this.submitted = true
            window.location.reload();
          })
      })
  }

  openEditEducation(i: any) {
    this.profileService.setIndex(i)
    const modal = this.modalService.open(
      ModalEditEducationComponent, { size: 'lg' }
    );
    modal.componentInstance.data = this.profileModel.userProfile;
    modal.componentInstance.deleteEdu = () => { this.deleteEdu(i) }
  }

  deleteEdu(i: any) {
    this.profileService.setIndex(i)
    this.educationModel.formGroupAddEducation.controls['jobseekerId'].setValue(this.userData.jobseekerId);
    this.profileService.getEduList(this.educationModel.formGroupAddEducation.value).subscribe(
      (response: any) => {
        var index = this.profileService.getIndex()
        var educationId = response.data[index]['educationId']
        this.educationModel.formGroupAddEducation.controls['educationId'].setValue(educationId)
        this.profileService.deleteEdu(this.educationModel.formGroupAddEducation.value).subscribe(
          (response: any) => {
            this.salaryService.saveData(response.data)
            this.submitted = true
            window.location.reload();
          })
      })
  }

  openAddEducation() {
    const modal = this.modalService.open(
      ModalAddEducationComponent, { size: 'lg' }
    );
    modal.componentInstance.data = this.profileModel.userProfile;
  }

  openEditPersonalInformation() {
    const modal = this.modalService.open(
      ModalPersonalInformationComponent, { size: 'lg' });
    modal.componentInstance.data = this.profileModel.userProfile;
  }

  saveImage() {
    this.profileModel.uploadImageForm.controls['jobseekerId'].setValue(this.userData.jobseekerId);
    this.profileService.onUploadPhoto(this.profileModel.uploadImageForm.value).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.isUploaded = true;
        }
        this.salaryService.saveData(event.data)
      })
  }

  resetFileUploader() {
    this.modalPersonalModel.profileModelForm.controls['jobseekerId'].setValue(this.userData.jobseekerId);
    this.profileService.deleteImage(this.modalPersonalModel.profileModelForm.value).subscribe(
      (response: any) => {
        this.isUpload = false;
      },
      (error) => {
        this.isUpload = true;
      }),
      (error: any) => {
        this.onUpload = true;
      }
  }

  openEditSkills() {
    const modal = this.modalService.open(
      ModalEditSkillsComponent, { size: 'lg' }
    );
    modal.componentInstance.data = this.profileModel.userProfile;
    // modal.componentInstance.data = this.profileModel.editSkillModelForm.controls['skillId'];
  }

  openAddSalary() {
    const modal = this.modalService.open(
      ModalAddSalaryComponent, { size: 'lg' }
    );
    modal.componentInstance.data = this.profileModel.userProfile;
  }

  openEditSalary() {
    const modal = this.modalService.open(
      ModalEditSalaryComponent, { size: 'lg' }
    );
    modal.componentInstance.data = this.profileModel.userProfile;
  }

  saveCv() {
    this.profileModel.uploadCVForm.controls['jobseekerId'].setValue(this.userData.jobseekerId);
    this.uploadCvService.upload(this.profileModel.uploadCVForm.value).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.isUploaded = true;
        }
      })
  }

  resetCv() {
    this.modalPersonalModel.profileModelForm.controls['jobseekerId'].setValue(this.userData.jobseekerId);
    this.uploadCvService.deleteCv(this.modalPersonalModel.profileModelForm.value).subscribe(
      (response: any) => {
        this.isUploaded = false;
      },
      (error) => {
        this.isUpload = true;
      })
  }

  openModalAddLanguage() {
    const modal = this.modalService.open(
      ModalAddLanguageComponent, { size: 'lg' }
    );
  }

  openUploadCv() {
    const modal = this.modalService.open(
      ProfileUploadCvComponent, { size: 'md' }
    );
    modal.componentInstance.data = this.profileModel.userProfile;
    modal.componentInstance.file = this.profileModel.uploadCVForm.controls['jobseekerResume'];
    modal.componentInstance.saveCv = () => { this.saveCv() }
    modal.componentInstance.resetCv = () => { this.resetCv() }

  }

  openModalAddCertificate() {
    const modal = this.modalService.open( 
      ModalAddCertificateComponent, { size: 'lg' }
      );
    modal.componentInstance.data = this.profileModel.userProfile;
    modal.componentInstance.certificateFile = this.profileModel.uploadCertificateForm.get('certificateFile');
  }

  openEditCertificate(k: any) {
    this.profileService.setIndex(k)
    const modal = this.modalService.open(
      ModalEditCertificateComponent, { size: 'lg' }
    );
    modal.componentInstance.data = this.profileModel.userProfile;
  }
}
