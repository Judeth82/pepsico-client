import { Injectable } from '@angular/core';
import { LocalDataEnum } from '@e/local-data.enum';
import { BaseDataService } from './base-data.service';
import { DistritoModel } from 'app/models';
import { LocalDataService } from '@s/local-data.services';
import { of, switchMap } from 'rxjs';
import { arrayToRecord } from '@u/helpers';

@Injectable({ providedIn: 'root' })
export class DistritoDataService extends BaseDataService<DistritoModel> {
  entityMapByPrefix$ = this.entities$.pipe(switchMap((entities) => of(arrayToRecord<DistritoModel>('prefix', entities))));

  private _fileName = LocalDataEnum.distritos;

  constructor(
    private _localDataService: LocalDataService,
  ) {
    super();
    this.loading$.next(true);
    this._localDataService.getFileData(this._fileName).subscribe((entities) => {
        this.entities$.next((entities || []) as Array<DistritoModel>);
        this.loading$.next(false);
        this.loaded$.next(true);
      }, () => {
        this.loading$.next(false);
      });
  }
}
