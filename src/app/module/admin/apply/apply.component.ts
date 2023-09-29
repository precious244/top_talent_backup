import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JobService } from 'src/app/services/job/job.service';
import { UploadFileService } from 'src/app/services/upload-cv/upload-file.service';
import { ModalUploadCvComponent } from 'src/app/shared/component/modal/modal-upload-cv/modal-upload-cv.component';
import { ApplyModel } from './model/apply.model';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ProfileModel } from '../profile/model/profile.model';
import { ModalPersonalInformationComponent } from 'src/app/shared/component/modal/modal-personal-information/modal-personal-information.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  applyModel = new ApplyModel();
  jobName!: string;
  recruiterCompany: any;
  step1: boolean = false;
  isUploaded: boolean = false;
  step2: boolean = false;
  step3: boolean = false;
  step4: boolean = false;
  userData: any = {};
  jobseekerId!: number;
  jobId!: number;
  submitted: boolean = false;
  screeningQuestions : any = {};

  textInput: string = '';
  characterCount: number = 0;

  profileModel = new ProfileModel();
  profile: any = {};
  screeningId!:number;
  form!: FormGroup;
  
  countCharacters() {
    // Menghitung jumlah karakter
    const maxLength = 200;
    this.characterCount = this.textInput.length;

    // Batasi jumlah karakter maksimum
    if (this.characterCount > maxLength) {
      this.textInput = this.textInput.slice(0, maxLength);
      this.characterCount = maxLength;
    }
  }

  constructor(
    private readonly modalService: NgbModal,
    public readonly jobService: JobService,
    public readonly uploadCvService: UploadFileService,
    public readonly router: Router,
    private activatedRoute: ActivatedRoute,
    public readonly authService: AuthService,
    public readonly profileService: ProfileService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    if (this.authService.isLogin()) {
      this.userData = this.authService.loadUserData()
    }
    this.applyModel.applyForm.controls['jobseekerId'].setValue(this.userData.jobseekerId);
    this.profileService.getUserProfile(this.applyModel.applyForm.value).subscribe(
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
    this.activatedRoute.paramMap.subscribe((data: any) => {
      let id = data.params.id,
        params = {
          jobId: id,
          jobStatus: "visible",
        }

      this.jobService.getDetailJob(params).subscribe(
        (response: any) => {
          this.applyModel.applyModelForm.patchValue(response.data);
          this.screeningQuestions = response.data.screeningQuestions
          console.log(this.screeningQuestions)
        },
        (error) => {
        })

      this.applyModel.applyForm.controls['jobseekerId'].setValue(this.userData.jobseekerId);
      this.applyModel.applyForm.controls['jobId'].setValue(data.params);
      this.uploadCvService.getApplyStatus(this.applyModel.applyForm.value, params).subscribe(
        (response: any) => {
            if (response.message === 'Step 1') {
              this.step1 = true;
            } else if (response.message === 'Step 2') {
              this.isUploaded = true;
            } else if (response.message === 'Step 3') {
              this.step2 = true;
            } else if (response.message === 'Step 4') {
              this.step3 = true;
            }
          },
          (error) => {
            // this.isApplied = false;
          })
        })
        this.screeningQuestions = [
          { screeningId: '', questionAnswer: '' }
        ]
        this.activatedRoute.paramMap.subscribe((data: any) => {
          let id = data.params.id,
            params = {
              jobId: id,
            }    
        this.form = this.fb.group({
          jobseekerId: this.userData.jobseekerId,
          jobId:params,
          payloads: [this.screeningQuestions]
        })
      })
    }

      applyJob() {
        this.activatedRoute.paramMap.subscribe((data: any) => {
          let id = data.params.id,
            params = {
              jobId: id,
              jobStatus: "visible",
            };
      
          this.jobService.getDetailJob(params).subscribe(
            (response: any) => {
              this.applyModel.applyModelForm.patchValue(response.data);
              // Sekarang Anda bisa melakukan permintaan untuk mengirim data aplikasi
              this.jobService.applyJob(this.form.value).subscribe(
                (response) => {
                  console.log(this.applyModel.applyModelForm.value);
                  // Handle respons dari pengiriman aplikasi di sini
                }
              );
            }
          );
        });
      }
      

  openEditPersonalInformation() {
      const modal = this.modalService.open(
        ModalPersonalInformationComponent, { size: 'lg' });
      modal.componentInstance.data = this.profileModel.userProfile;
    }
  
  openUploadCv() {
    const modal = this.modalService.open(
      ModalUploadCvComponent, { size: 'md' });
    modal.componentInstance.file = this.applyModel.applyModelForm.controls['jobseekerResume'];
    modal.componentInstance.onUpload = () => { this.onUpload() }
  }

  onUpload(): void {
    this.applyModel.applyModelForm.controls['jobseekerId'].setValue(this.userData.jobseekerId);
    this.uploadCvService.upload(this.applyModel.applyModelForm.value).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.isUploaded = true;
        }
      }
    )
  }

  continueToStep2(){
    this.step2 = true;
    this.isUploaded = false;
  }

  continueToStep3(){
    this.step3 = true;
    this.step2 = false
    this.isUploaded = false;
  }

  continueToStep4(){
    this.step4 = true;
    this.step3 = false;
  }

  // putUpload() {
  //   this.activatedRoute.paramMap.subscribe((data: any) => {
  //     let id = data.params.id,
  //       params = {
  //         jobId: id,
  //       }
  //     this.applyModel.applyForm.controls['jobseekerId'].setValue(this.userData.jobseekerId);
  //     this.applyModel.applyForm.controls['jobId'].setValue(data.params);
  //     this.jobService.putApplyJob(this.applyModel.applyForm.value, params).subscribe(
  //       (response: any) => {
  //         this.step2 = true;
  //       }
  //     );
  //   }
  //   )
  // }

  routingToScreeningQuestion() {
    this.router.navigate(['screening-question'])
  }

  routingToProfile() {
    this.router.navigate([`/main/profile/${this.userData.jobseekerId}`])
  }
}
