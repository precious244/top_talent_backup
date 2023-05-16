import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileModel } from 'src/app/module/admin/profile/model/profile.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { EditSkillsModel } from './model/edit-skills.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddSalaryService } from 'src/app/services/add-salary/add-salary.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-edit-skills',
  templateUrl: './modal-edit-skills.component.html',
  styleUrls: ['./modal-edit-skills.component.scss']
})
export class ModalEditSkillsComponent implements OnInit {

  profileModel = new ProfileModel();
  editSkillsModel = new EditSkillsModel;

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

  constructor(
    public activeModal: NgbActiveModal,
    public readonly authService: AuthService,
    public readonly profileService: ProfileService,
    public readonly router: Router,
    private fb: FormBuilder,
    private readonly salaryService: AddSalaryService,
  ) { }

  ngOnInit(): void {
    if (this.authService.isLogin()) {
      this.userData = this.authService.loadUserData()
    }
    const param = {
      jobseekerId: this.data.jobseekerId
    }
    this.profileService.getUserSkills(param).subscribe(
      (response: any) => {
        this.editSkillsModel.userProfile = response.data;
      })

    this.profileService.getAllSkills().subscribe(
      (response) => {
        this.editSkillsModel.allSkills = response.data;
      })
    this.selectedItems = [
      { skillId: '', skillName: '' }
    ]
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'skillId',
      textField: 'skillName',
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

  upload() {
    this.profileService.editSkill(this.form.value).subscribe(
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
