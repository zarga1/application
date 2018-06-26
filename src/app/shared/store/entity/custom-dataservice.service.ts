import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  EntityCollectionDataService,
  DefaultDataService,
  HttpUrlGenerator,
  Logger,
  QueryParams
} from 'ngrx-data';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CustomDataService extends DefaultDataService<any> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
  ) {
    super('Product', http, httpUrlGenerator);
  }

  add(entity: any): Observable<any> {
    const newEntity = {...entity};
    delete newEntity.id;
    return super.add(newEntity) 
  }

}
