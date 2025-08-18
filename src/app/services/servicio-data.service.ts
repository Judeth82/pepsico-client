import { Injectable } from '@angular/core';
import { LocalDataEnum } from '@e/local-data.enum';
import { BaseDataService } from './base-data.service';
import { ServicioModel } from 'app/models';
import { LocalDataService } from './local-data.services';
import { of, switchMap } from 'rxjs';
import { arrayToRecord } from '@u/helpers';

@Injectable({ providedIn: 'root' })
export class ServicioDataService extends BaseDataService<ServicioModel> {
  entityMapByCode$ = this.entities$.pipe(switchMap((entities) => of(arrayToRecord<ServicioModel>('code', entities))));

  private _fileName = LocalDataEnum.servicios;

  constructor(
    private _localDataService: LocalDataService,
  ) {
    super();
    this.loading$.next(true);
    this._localDataService.getFileData(this._fileName).subscribe((entities) => {
        this.entities$.next((entities || []) as Array<ServicioModel>);
        this.loading$.next(false);
        this.loaded$.next(true);
      }, () => {
        this.loading$.next(false);
      });
  }
}
