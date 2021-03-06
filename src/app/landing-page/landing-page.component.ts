import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EncrptionService } from 'src/Utilities/encrption.service';
import { FormValidators } from 'src/Utilities/FormValidation';
import { LandingPageService } from './landing-page.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})


export class LandingPageComponent implements OnInit {

  alphabetRegex = '^[a-zA-Z]+$';
  showLoader: boolean;
  disableButton: boolean = false;
  showerror: boolean = false;
  form: FormGroup;
  disForm = new FormControl();
  vehicleData = [];
  bodyData = [];
  vehicleModelData = [''];
  premiumAmountValue = 0;
  constructor(public landingPageService: LandingPageService,
    public encryptionService: EncrptionService,
    private toastr: ToastrService,) { }
  

  ngOnInit(): void {
    this.landingPageService.getData().subscribe(data => {
      console.log(JSON.stringify(data.VehicleData));
      this.vehicleData = data.VehicleData;
      this.bodyData = data.Body;
    })
    this.showLoader = false;
    this.form = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.pattern(this.alphabetRegex),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.pattern(this.alphabetRegex),
        ]),
        mobileNumber: new FormControl('', [Validators.required]),
        registrationNumber: new FormControl('', [Validators.required]),
        emailAdd: new FormControl('', [Validators.required, Validators.email]),
        bodyType: new FormControl('', [Validators.required]),
        vehicleModel: new FormControl('', [Validators.required]),
        vehicleMake: new FormControl('', [Validators.required]),
        premium: new FormControl(),
        agreeTerm: new FormControl('', [Validators.requiredTrue]),
        dateOFBirth: new FormControl(),
        
      },
    );
  }


  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get emailAdd() {
    return this.form.get('emailAdd');
  }

  get mobileNumber() {
    return this.form.get('mobileNumber');
  }

  get agreeTerm() {
    return this.form.get('agreeTerm');
  }

  get registrationNumber() {
    return this.form.get('registrationNumber');
  }

  get bodyType() {
    return this.form.get('bodyType');
  }
  get vehicleMake() {
    return this.form.get('vehicleMake');
  }
  get vehicleModel() {
    return this.form.get('vehicleModel');
  }

  get premium() {
    return this.form.get('premium');
  }

  get dateOFBirth() {
    return this.form.get('dateOFBirth');
  }

  disableLoaders(){
    this.showLoader = false
    this.disableButton = false;
  }

  showLoaders(){
    this.showLoader = true
    this.disableButton = true
  }
  
  bindVehicleModel(e) {
    this.vehicleModelData = this.vehicleData.filter(item => item.Make === e.target.value)[0].Model
    console.log(JSON.stringify(this.vehicleModelData))
  }

  bindBodyModel(e) {
    this.premiumAmountValue = this.bodyData.filter(item => item.Type === e.target.value)[0].Premium
    console.log(this.premiumAmountValue);
  }

  submitForm(){
    if (this.form.invalid) {
      FormValidators.validateAllFormFields(this.form);
      return;

    }
    this.showLoaders()

    this.landingPageService.submitThirdPartyBookingForm(this.encryptionService.SubmitData(this.form)).subscribe((resp) => {
      console.log(resp)
      this.form.reset();
      this.toastr.success(resp.message)
      this.disableLoaders()
    },
    (error) => {
      console.log(error.error.message)
      this.toastr.error(error.error.message);
      this.disableLoaders()
    })

  }

}
