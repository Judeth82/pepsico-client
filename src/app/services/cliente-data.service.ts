import { Injectable } from '@angular/core';
import { LocalDataEnum } from '@e/local-data.enum';
import { BaseDataService } from './base-data.service';
import { ClienteModel } from 'app/models';
import { LocalDataService } from './local-data.services';
import { cloneDeep } from 'lodash';
import { of, switchMap } from 'rxjs';
import { arrayToRecord } from '@u/helpers';

@Injectable({ providedIn: 'root' })
export class ClienteDataService extends BaseDataService<ClienteModel> {
  entityMapById$ = this.entities$.pipe(switchMap((entities) => of(arrayToRecord<ClienteModel>('id', entities))));
  private _fileName = LocalDataEnum.clientes;

  constructor(
    private _localDataService: LocalDataService,
  ) {
    super();
    this.loading$.next(true);
    this._localDataService.getFileData(this._fileName).subscribe((entities) => {
        this.entities$.next((entities || []) as Array<ClienteModel>);
        this.loading$.next(false);
        this.loaded$.next(true);
      }, () => {
        this.loading$.next(false);
      });
  }

  public add(entity: ClienteModel): void {
    const entities = cloneDeep(this.entities$.value);
    entities.push(entity);
    this.entities$.next(entities);
  }
}
