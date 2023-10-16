import { FormControl, FormGroup, Validators } from "@angular/forms";

export class ProfileModel {

    userProfile: any = [];
    education: any = [];
    experience: any = [];
    salary: any = {};
    skills: any = [];
    allUniversity: any = [];
    allDegree: any = [];
    addSkill(skill: any) {
    }
    removeSkill(skill: any) {
    }
    data = [];

    uploadCVForm = new FormGroup(
        {
            jobseekerId: new FormControl(0, [Validators.required]),
            jobseekerResume: new FormControl('', [Validators.required]),
        }
    );

    uploadCertificateForm = new FormGroup(
        {
            certificateId: new FormControl(0, [Validators.required]),
            jobseekerId: new FormControl(0, [Validators.required]),
            certificateFile: new FormControl('', [Validators.required]),
            certificateName: new FormControl('', [Validators.required]),
            certificateIssuer: new FormControl('', [Validators.required]),
            issuedMonth: new FormControl('', [Validators.required]),
            issuedYear: new FormControl('', [Validators.required]),
            expiredMonth: new FormControl('', [Validators.required]),
            expiredYear: new FormControl('', [Validators.required]),
            credentialLink: new FormControl('', [Validators.required]),
        }
    );

    uploadImageForm = new FormGroup(
        {
            jobseekerId: new FormControl(0, [Validators.required]),
            jobseekerImage: new FormControl('', [Validators.required]),
            file:new FormControl(''),
        }
    );

    editSkillModelForm = new FormGroup(
        {
            jobseekerId: new FormControl(0, [Validators.required]),
            skillId: new FormControl(this.data, [Validators.required]),
        }
    );

}