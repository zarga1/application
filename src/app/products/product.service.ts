import { Injectable } from '@angular/core';
import { EntityServiceBase, EntityServiceFactory } from 'ngrx-data';

@Injectable()
export class ProductService extends EntityServiceBase<any> {
  constructor(entityServiceFactory: EntityServiceFactory) {
    super('Product', entityServiceFactory);
  }
}
