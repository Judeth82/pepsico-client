import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalDataEnum } from '@e/local-data.enum';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class LocalDataService {
  constructor(
    private _http: HttpClient,
  ) {}

  public getFileData<T>(fileName: LocalDataEnum): Observable<Array<T>> {
    return this._http.get<Array<T>>(`assets/local-data/${fileName}.json`);
  }
}
