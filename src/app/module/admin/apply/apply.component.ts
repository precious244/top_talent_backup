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
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  screeningQuestions: any = {};

  textInput: string = '';
  characterCount: number = 0;

  profileModel = new ProfileModel();
  profile: any = {};
  screeningId!: number;
  form!: FormGroup;
  // questionAnswers: string[] = [];


  // questionAnswerControl: FormControl = new FormControl('');
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
          jobStatus: "visible"
        }

      this.jobService.getDetailJob(params).subscribe(
        (response: any) => {
          this.applyModel.applyModelForm.patchValue(response.data);
          this.screeningQuestions = response.data.screeningQuestions

          // Initialize the form with dynamic form controls
          this.form = this.fb.group({
            jobseekerId: this.userData.jobseekerId,
            jobId: params.jobId,
            payloads: this.fb.array([]),
          });

          const payloadsFormArray = this.form.get('payloads') as FormArray;

          this.screeningQuestions.forEach((question: { screeningId: any; questionAnswer: any; }) => {
            const payloadGroup = this.fb.group({
              screeningId: [question.screeningId], // You can set a default value if needed
              questionAnswer: [question.questionAnswer], // You can set a default value if needed
            });
            payloadsFormArray.push(payloadGroup);
          });
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
        })
    })
  }
  applyJob(event: Event) {
    console.log(this.form.value);
    return;

    // Call the getDetailJob method to fetch screening questions
    this.jobService.getDetailJob(this.form.value).subscribe(
      (response: any) => {
        this.applyModel.applyModelForm.patchValue(response.data);
        this.screeningQuestions = response.data.screeningQuestions;

        // Get the screeningIds from the response and set them
        const screeningIds = this.screeningQuestions.map((screening: any) => screening.screeningId);

        // Set the values in the form controls
        this.form.patchValue({
          screeningIds: screeningIds,
        });

        console.log(screeningIds); // Log the screeningIds
        // Di dalam loop yang menampilkan pertanyaan screening
        // for (let i = 0; i < this.screeningQuestions.length; i++) {
        //   const questionType = this.screeningQuestions[i].questionType;
        //   const formControlName = `questionAnswers.${i}`;

        //   // Tambahkan form control sesuai dengan jenis pertanyaan (Text atau Options)
        //   if (questionType === 'Text') {
        //     const textFormControl = this.fb.control(''); 
        //     this.form.addControl(formControlName, textFormControl); // Tambahkan form control ke dalam form group
        //   } else if (questionType === 'Options') {
        //     const optionsFormControl = this.fb.control('');
        //     this.form.addControl(formControlName, optionsFormControl); // Tambahkan form control ke dalam form group
        //   }
        // }
        // Now, you can call the applyJob method with the updated form value
        this.jobService.applyJob(this.form.value).subscribe(
          (response) => {
            event.preventDefault();
            // Handle the response here if needed
          },
        );
      },
    );
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

  continueToStep2() {
    this.step2 = true;
    this.isUploaded = false;
  }

  continueToStep3() {
    this.step3 = true;
    this.step2 = false
    this.isUploaded = false;
  }

  continueToStep4() {
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
