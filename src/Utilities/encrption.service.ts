import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncrptionService {

  constructor() { }


  SubmitData(form){
    return {
      firstname: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.emailAdd,
      mobileNumber: form.value.mobileNumber.toString(),
      vehicleRegNo: form.value.registrationNumber,
      dateOFBirth: form.value.dateOFBirth,
      vehicleMake: form.value.vehicleMake,
      vehicleModel: form.value.vehicleModel,
      bodyType: form.value.bodyType,
      premiumAmount: form.value.premium,
      // premiumAmount: 20000,
    };
  }
}
