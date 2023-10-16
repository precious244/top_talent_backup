import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalUploadCvComponent } from './modal/modal-upload-cv/modal-upload-cv.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalAddExperienceComponent } from './modal/modal-add-experience/modal-add-experience.component';
import { ModalPersonalInformationModule } from './modal/modal-personal-information/modal-personal-information.module';
import { ModalAddSalaryModule } from './modal/modal-add-salary/modal-add-salary.module';
import { ProfileUploadCvComponent } from './modal/profile-upload-cv/profile-upload-cv.component';
import { ModalAddEducationModule } from './modal/modal-add-education/modal-add-education.module';
import { ModalEditExperienceComponent } from './modal/modal-edit-experience/modal-edit-experience.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ModalEditEducationComponent } from './modal/modal-edit-education/modal-edit-education.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxCurrencyModule } from "ngx-currency";
import { ModalEditSkillsModule } from './modal/modal-edit-skills/modal-edit-skills.module';
import { ModalEditSalaryComponent } from './modal/modal-edit-salary/modal-edit-salary.component';
import { ModalUploadPhotoComponent } from './modal/modal-upload-photo/modal-upload-photo.component';
import { ModalAddLanguageComponent } from './modal/modal-add-language/modal-add-language.component';
import { MatIconModule } from '@angular/material/icon';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ModalAddCertificateComponent } from './modal/modal-add-certificate/modal-add-certificate.component';
import { ModalEditCertificateComponent } from './modal/modal-edit-certificate/modal-edit-certificate.component';
@NgModule({
  declarations: [
    ModalUploadCvComponent,
    ModalAddExperienceComponent,
    ProfileUploadCvComponent,
    ModalEditExperienceComponent,
    ModalEditEducationComponent,
    ModalEditSalaryComponent,
    ModalUploadPhotoComponent,
    ModalAddLanguageComponent,
    ModalAddCertificateComponent,
    ModalEditCertificateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxCurrencyModule,
    MatIconModule,
    NgMultiSelectDropDownModule
  ],
  exports: [
    ModalPersonalInformationModule,
    ModalAddEducationModule,
    FormsModule,
    ReactiveFormsModule,
    ModalAddSalaryModule,
    ProfileUploadCvComponent,
    ModalAddExperienceComponent,
    ModalEditExperienceComponent,
    ModalEditEducationComponent,
    ModalEditSkillsModule,
    ModalEditSalaryComponent,
    ModalUploadPhotoComponent
  ],
  providers: [
],
})
export class ComponentModule { }
