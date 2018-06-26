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
import { CustomDataService } from './custom-dataservice.service';


const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'api',

  entityHttpResourceUrls: {

    Product: {
      entityResourceUrl: 'api/products/',
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
    CustomDataService
  ]
})
export class EntityStoreModule {
  constructor(
    entityDataService: EntityDataService,
    customDataService: CustomDataService,
  ) {
    entityDataService.registerService('Product', customDataService);
  }
}
