import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { SendEmailRequestModel, SendEmailResponseModel } from '@m/index';

@Injectable({ providedIn: 'root' })
export class EmailHelperService {
  constructor(private _http: HttpClient) {}

   public send(request: SendEmailRequestModel): Observable<SendEmailResponseModel> {
        return this._http.post<SendEmailResponseModel>(`${environment.apiBaseUrl}email/send`, request);
    }

}
