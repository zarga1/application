import { Injectable } from '@angular/core';
import {
  EntityCache,
  EntityCollectionServiceFactory,
  EntityServicesBase,
  DefaultDataService,
  HttpUrlGenerator,
  EntityCollectionServiceBase
} from 'ngrx-data';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductsService extends EntityCollectionServiceBase<any> {

  constructor(
    entityCollectionServiceFactory: EntityCollectionServiceFactory
  ) {
    super('Product', entityCollectionServiceFactory);

  }
}
