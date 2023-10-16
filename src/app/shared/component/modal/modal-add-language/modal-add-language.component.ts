import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileModel } from 'src/app/module/admin/profile/model/profile.model';
import { AddSalaryService } from 'src/app/services/add-salary/add-salary.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import Swal from 'sweetalert2';
import { EditSkillsModel } from '../modal-edit-skills/model/edit-skills.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-add-language',
  templateUrl: './modal-add-language.component.html',
  styleUrls: ['./modal-add-language.component.scss']
})
export class ModalAddLanguageComponent {
  profileModel = new ProfileModel();

  @Input() data: any;
  @Input() onEdit: any;

  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  userData: any = {};
  profile: any = {};
  skillsSet: any = {};
  selectedOption: unknown;
  submitted: boolean = false;
  form!: FormGroup;

  allLanguage : any = []

  constructor(
    public activeModal: NgbActiveModal,
    public readonly authService: AuthService,
    public readonly profileService: ProfileService,
    public readonly router: Router,
    public fb: FormBuilder,
    public readonly salaryService: AddSalaryService,
    public activatedRoute : ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    if (this.authService.isLogin()) {
      this.userData = this.authService.loadUserData()
    }
    const param = {
      jobseekerId: this.userData.jobseekerId
    }
      this.profileService.getUserProfile(param).subscribe(
        (response: any) => {
          this.profileModel.userProfile = response.data;
          this.profile = this.profileModel.userProfile;
        },
        (error) => {
        })
        
    this.profileService.getAllLanguage().subscribe(
      (response) => {
        this.allLanguage = response.data;
        console.log(this.allLanguage)
      })
    this.selectedItems = [
      { languageId: '', languageName: '' }
    ]
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'languageId',
      textField: 'languageName',
      enableCheckAll: false
    }

    this.form = this.fb.group({
      jobseekerId: this.userData.jobseekerId,
      payloads: [this.selectedItems]
    })
  }

  onItemSelect(ev: any) {
  }
  onSelectAll(ev: any) {
  }

  addLanguage() {
    this.profileService.addLanguage(this.form.value).subscribe(
      (response: any) => {
        this.salaryService.saveData(response.data)
        this.submitted = true
        this.activeModal.dismiss('Cross click')
        window.location.reload();
      })
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
