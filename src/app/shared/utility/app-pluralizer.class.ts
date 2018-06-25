import { Inject, Injectable, Optional } from '@angular/core';
import {
  DefaultPluralizer,
  Logger,
  DefaultLogger,
  Pluralizer,
  PLURAL_NAMES_TOKEN,
  EntityPluralNames
} from 'ngrx-data';

// Demonstrate overriding the default Pluralizer
// Be sure to build with AOT to confirm this still works!
// See issue #135
// Doesn't actually change anything.
@Injectable()
export class AppPluralizer extends DefaultPluralizer {
  constructor(
    @Optional()
    @Inject(PLURAL_NAMES_TOKEN)
    pluralNames: EntityPluralNames[]
  ) {
    super(pluralNames);
  }
}
