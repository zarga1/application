import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  EntityCache,
  EntityCollectionServiceFactory,
  EntityServicesBase
} from 'ngrx-data';
import { ProductsService } from '../../../products/products.service';


@Injectable()
export class AppEntityServices extends EntityServicesBase {
  constructor(
    public readonly store: Store<EntityCache>,
    public readonly entityCollectionServiceFactory: EntityCollectionServiceFactory,

    public readonly productsService: ProductsService,
  ) {
    super(store, entityCollectionServiceFactory);
    this.registerEntityCollectionServices([productsService]);
  }

}
