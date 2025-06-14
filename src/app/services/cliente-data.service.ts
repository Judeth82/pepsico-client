import { Injectable } from '@angular/core';
import { LocalDataEnum } from '@e/local-data.enum';
import { BaseDataService } from './base-data.service';
import { ClienteModel } from 'app/models';
import { LocalDataService } from './local-data.services';

@Injectable({ providedIn: 'root' })
export class ClienteDataService extends BaseDataService<ClienteModel> {
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
}
