import { Injectable } from '@angular/core';
import { LocalDataEnum } from '@e/local-data.enum';
import { BaseDataService } from './base-data.service';
import { SupervisorModel } from 'app/models';
import { LocalDataService } from './local-data.services';
import { of, switchMap } from 'rxjs';
import { arrayToRecord } from '@u/helpers';

@Injectable({ providedIn: 'root' })
export class SupervisorDataService extends BaseDataService<SupervisorModel> {
  entityMapByDistrito$ = this.entities$.pipe(switchMap((entities) => of(arrayToRecord<SupervisorModel>('distritoId', entities))));

  private _fileName = LocalDataEnum.supervisores;

  constructor(
    private _localDataService: LocalDataService,
  ) {
    super();
    this.loading$.next(true);
    this._localDataService.getFileData(this._fileName).subscribe((entities) => {
        this.entities$.next((entities || []) as Array<SupervisorModel>);
        this.loading$.next(false);
        this.loaded$.next(true);
      }, () => {
        this.loading$.next(false);
      });
  }
}
