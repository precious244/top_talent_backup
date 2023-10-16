import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileModel } from 'src/app/module/admin/profile/model/profile.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-add-certificate',
  templateUrl: './modal-add-certificate.component.html',
  styleUrls: ['./modal-add-certificate.component.scss']
})
export class ModalAddCertificateComponent {
  @Input() file: any;

  @Input() putApplied: any;
  @Input() closeUploadCv: any;
  fileName = '';
  file_error: any;
  selectedFile: File = null as any;
  selectedFileName = '';
  invisible: boolean = true;
  profileModel = new ProfileModel;

  url = "assets/uploadcv.png"
  url2 = "assets/pdf2.png"
  status = "Upload CV"
  status2 = "Change File"
  btnBg = "form-control btn btn-primary rounded-pill btnMuncul mt-2"
  btnBg2 = "form-control btn btn-outline-primary rounded-pill btnMuncul mt-4"
  available = "display: true;"
  notAvailable = "display: none;"
  submitted: boolean = false;

  currentYear = new Date().getFullYear();
  startPeriodYearOptions: number[] = [];
  endPeriodYearOptions: number[] = [];
  chosenYearDate: Date | undefined;
  isDirty = false;
  isUploaded : boolean = false;
  userData:any

  constructor(
    private activeModal: NgbActiveModal,
    private profileService: ProfileService,
    private authService: AuthService
  ){}

  ngOnInit():void {
    for (let i = 0; i < 100; i++) {
      this.endPeriodYearOptions.push(2050 - i);
    }

    for (let i = 0; i < 100; i++) {
      this.startPeriodYearOptions.push(this.currentYear - i);
    }
  }

  onChange(event: any) {
    this.file_error = "";
    this.selectedFile = event.target.files[0];
  
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (event: any) => {
        const fileDataURL = reader.result;
        this.url = this.url2;
        this.status = this.status2;
        this.btnBg = this.btnBg2;
        this.available = this.notAvailable;
      }
      // Read the file as ArrayBuffer for actual binary content
      const binaryReader = new FileReader();
      binaryReader.onload = (event: any) => {
        const fileContent = binaryReader.result; // This is the binary data of the file
        // You can use the file content as needed, e.g., send it to a server.
      };
      binaryReader.readAsArrayBuffer(this.selectedFile);
      this.fileName = this.selectedFile.name;
      let fileSize = 0;
      let ext = null;
      fileSize = Math.round(this.selectedFile.size / 1024); // Size in kilobytes
  
      if (fileSize >= 10240) { // 10MB limit
        this.invisible = true;
        this.file_error = "File size limited to 10MB";
      } else {
        ext = this.fileName.split('?')[0].split('.').pop();
      if (ext == 'pdf' || ext == 'PDF'|| ext == 'doc' || ext == 'DOC' || ext == 'docx' || ext == 'DOCX') {
        this.invisible = false;
      } else {
        this.invisible = true;
        this.file_error = "please enter valid pdf file";
      }
    }
  }}

  get f(): { [key: string]: AbstractControl } {
    return this.profileModel.uploadCertificateForm.controls;
    }

  submitCertificate() {
    this.profileModel.uploadCertificateForm.markAllAsTouched();
    if (this.authService.isLogin()) {
      this.userData = this.authService.loadUserData();
    }
    this.profileModel.uploadCertificateForm.controls['jobseekerId'].setValue(this.userData.jobseekerId);
  
    const formData = new FormData();
    formData.append('jobseekerId', String(this.profileModel.uploadCertificateForm.controls['jobseekerId'].value));
    formData.append('certificateFile', this.selectedFile, this.fileName);
  
    if (this.profileModel.uploadCertificateForm.controls['certificateName'].value !== null) {
      formData.append('certificateName', this.profileModel.uploadCertificateForm.controls['certificateName'].value);
    }
    
    if (this.profileModel.uploadCertificateForm.controls['certificateIssuer'].value !== null) {
      formData.append('certificateIssuer', this.profileModel.uploadCertificateForm.controls['certificateIssuer'].value);
    }
  
    if (this.profileModel.uploadCertificateForm.controls['issuedMonth'].value !== null) {
      formData.append('issuedMonth', this.profileModel.uploadCertificateForm.controls['issuedMonth'].value);
    }
  
    if (this.profileModel.uploadCertificateForm.controls['issuedYear'].value !== null) {
      formData.append('issuedYear', this.profileModel.uploadCertificateForm.controls['issuedYear'].value);
    }
  
    if (this.profileModel.uploadCertificateForm.controls['expiredMonth'].value !== null) {
      formData.append('expiredMonth', this.profileModel.uploadCertificateForm.controls['expiredMonth'].value);
    }
  
    if (this.profileModel.uploadCertificateForm.controls['expiredYear'].value !== null) {
      formData.append('expiredYear', this.profileModel.uploadCertificateForm.controls['expiredYear'].value);
    }
  
    if (this.profileModel.uploadCertificateForm.controls['credentialLink'].value !== null) {
      formData.append('credentialLink', this.profileModel.uploadCertificateForm.controls['credentialLink'].value);
    }
  
    this.profileService.addCertificate(formData).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.isUploaded = true;
        }
        Swal.fire({
          title: 'Great! You have successfully uploaded your certificate!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Back',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      },
      (error: any) => {
        // Menampilkan pesan error umum
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
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
