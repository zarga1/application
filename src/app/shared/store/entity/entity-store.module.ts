import { NgModule } from '@angular/core';

import {
  DefaultDataServiceConfig,
  EntityDataService,
  EntityHttpResourceUrls,
  EntityServices,
  Logger,
  NgrxDataModule,
  Pluralizer
} from 'ngrx-data';
import { AppEntityServices } from './app-entities.service';
import { AppPluralizer } from '../../utility/app-pluralizer.class';


const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'localhost:3000',

  entityHttpResourceUrls: {

    Product: {

      entityResourceUrl: 'api/product/',
      collectionResourceUrl: 'api/products/'
    }
  },

};

@NgModule({
  imports: [
    NgrxDataModule.forRoot({
      entityMetadata: {
        Product: {}
      }
    })
  ],
  providers: [
    AppEntityServices,
    { provide: EntityServices, useExisting: AppEntityServices },
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    { provide: Pluralizer, useClass: AppPluralizer },

  ]
})
export class EntityStoreModule {
  constructor(
    entityDataService: EntityDataService,
  ) {

  }
}
