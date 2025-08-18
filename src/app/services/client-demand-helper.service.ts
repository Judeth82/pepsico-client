import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { ClientDemandModel } from '@m/index';

@Injectable({ providedIn: 'root' })
export class ClientDemandHelperService {
  constructor(private _http: HttpClient) { }

  public getAll(): Observable<Array<ClientDemandModel>> {
    return this._http.get<Array<ClientDemandModel>>(`${environment.apiBaseUrl}clientDemand`);
  }

  public create(payload: ClientDemandModel): Observable<ClientDemandModel> {
    return this._http.post<ClientDemandModel>(`${environment.apiBaseUrl}clientDemand/create`, payload);
  }
}
