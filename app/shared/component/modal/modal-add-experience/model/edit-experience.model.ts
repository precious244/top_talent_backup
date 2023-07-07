import { FormControl, FormGroup, Validators } from "@angular/forms";

export class EditExperienceModel {
    allJobType: any = [];
    allJobFunction: any = [];
    allCompany:any=[];
    allCountry: any = [];
    allCity: any = [];
    userProfile: any = [];
    dataExperience: any = [];
    experience: any = [];

    editExperience = new FormGroup({
        jobseekerId: new FormControl(""),
        experienceId: new FormControl("", Validators.required),
        jobTitle: new FormControl("", Validators.required),
        jobFunctionId: new FormControl("", Validators.required),
        companyName: new FormControl("", Validators.required),
        jobTypeId: new FormControl("", Validators.required),
        countryId: new FormControl("", Validators.required),
        cityId: new FormControl("", Validators.required),
        startPeriodMonth: new FormControl("", Validators.required),
        endPeriodMonth: new FormControl("", [Validators.required]),
        startPeriodYear: new FormControl("", Validators.required),
        endPeriodYear: new FormControl("", Validators.required),
        isPresent: new FormControl("", Validators.required),
        jobDescription: new FormControl("", Validators.maxLength(2000)),
    });
}