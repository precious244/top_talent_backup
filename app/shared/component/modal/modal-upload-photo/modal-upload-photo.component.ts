import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileModel } from 'src/app/module/admin/profile/model/profile.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-upload-photo',
  templateUrl: './modal-upload-photo.component.html',
  styleUrls: ['./modal-upload-photo.component.scss']
})
export class ModalUploadPhotoComponent {

  @Input() data: any;
  @Input() file: any;
  @Input() saveImage: any;
  @Input() resetFileUploader: any;
  @Input() closeModal: any;
  selectedFile: File = null as any;
  fileName = '';
  invisible: boolean = true;
  userData: any = {};
  profile: any = {};
  profileModel = new ProfileModel();
  file_error: any;
  sizeCheck: unknown;
  btnBg = "form-control btn btn-primary rounded-pill px-5"
  status = "Submit"
  available = "display: true;"
  notAvailable = "display: none;"

  @ViewChild('fileInput') el= ElementRef;
  imageUrl: any = 'assets/imgnotavailable.jpg';

  constructor(
    public activeModal: NgbActiveModal,
    public readonly authService: AuthService,
    public readonly profileService: ProfileService,
    public readonly router: Router,
    public fb: FormBuilder,
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
        this.profileModel.userProfile = response.data;
        this.profile = this.profileModel.userProfile;
      })
    }

  uploadPhoto(event: any) {
    this.file.setValue(event.target.files[0]);
    this.selectedFile = event.target.files[0];
    const file = event.srcElement.files[0]; 
    this.imageUrl = window.URL.createObjectURL(file); 
    if (event.target.files) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.file = reader.result;
      }
    }
    this.fileName = event.target.files[0].name;
    let fileSize = 0;
    let ext = null;
    fileSize = (Math.round(this.selectedFile.size / 1024*1024));
    if (fileSize >= 5e+6) {
      this.invisible = true;
      this.file_error = "File size limited to 5mb"
    }else {
      ext = this.fileName.split('?')[0].split('.').pop();
      if (ext == 'jpg' ||  ext == 'JPG' || ext == 'jpG' || ext == 'jPg' ||
          ext == 'jPG' || ext == 'JPg' || ext == 'JpG' || ext == 'Jpg'||
          ext == 'png' || ext == 'PNG' || ext == 'pnG' || ext == 'pNg' ||
          ext == 'pNG' || ext == 'PNg' || ext == 'PnG' || ext == 'Png' ||
          ext == 'jpeg' || ext == 'Jpeg' || ext == 'jPeg' || ext == 'jpEg' ||
          ext == 'jpeG' || ext == 'JPeg' || ext == 'JpEg' || ext == 'JpeG' ||
          ext == 'jPEg' || ext == 'jPeG'  || ext == 'jpEG'  || ext == 'jPEG'  ||
          ext == 'JPeG'  || ext == 'JPEg' || ext == 'JpEG' || ext == 'JPEG' ){
      this.invisible = false;
      } else {
        this.invisible = true;
        this.file_error = "Please enter valid jpg/png/jpeg file";
      }
    }
  }

  resetPhoto() { 
    this.resetFileUploader()
    this.activeModal.dismiss('Cross click');
    window.location.reload();
  }

  upload() {
    this.saveImage()
    this.activeModal.dismiss('Cross click');
    window.location.reload();
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
