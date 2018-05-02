import { DashboardComponent } from './dashboard.component';
import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { PageNotFoundComponent } from './shared/components/pageNotFound/pageNotFound.component';

const appRoutes: Routes = [
  { path: '', loadChildren: './products/products.module#ProductsModule'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
