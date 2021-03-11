import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  constructor(private http:  HttpClient) { }

  
  getData(): Observable<any>{
    return this.http.get("assets/Information/VehicleData.json")
  }

  submitThirdPartyBookingForm(request: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
      })
    }

    return this.http
      .post<any>(
        environment.enviromentURL + environment.ThirdPartyBookingpoint,
        request,
        httpOptions
      )
      .pipe
      //  catchError(this.handleError('signup', request))
      ();
  }
}
