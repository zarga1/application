import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Select, ofActionCompleted, Actions } from '@ngxs/store';
import { AddProduct } from './products.action';
import { Store } from '@ngxs/store';
import { UpdateFormValue } from '@ngxs/form-plugin';

@Component({
  selector: 'app-products-collection',
  template: `
  <div class="ui-g ui-g-fluid">
    <div class="ui-g-12">
      <p-toolbar>
            <div class="ui-toolbar-group-left">
                <button pButton type="button" label="Add" icon="fa-plus"
                  class="ui-button-primary" (click)="openCrudDialg('ADD')"></button>
                <button pButton type="button" label="Update" icon="fa-pencil" [disabled]="selectedCar==null"
                  class="ui-button-warning" (click)="openCrudDialg('EDIT')"></button>
                <button pButton type="button" label="Delete" icon="fa-trash" [disabled]="selectedCar==null"
                  class="ui-button-danger"></button>
            </div>

            <div class="ui-toolbar-group-right">
                <button pButton type="button" icon="fa-refresh" class="ui-button-info"></button>
            </div>
        </p-toolbar>
        <p-table [value]="cars$ | async" [(selection)]="selectedCar" dataKey="vin" [responsive]="true">
            <ng-template pTemplate="header">
                <tr>
                    <th style="width:3em"></th>
                    <th>Vin</th>
                    <th>Year</th>
                    <th>Brand</th>
                    <th>Color</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-car>
                <tr [pSelectableRow]="car">
                    <td>
                      <p-tableRadioButton [value]="car"></p-tableRadioButton>
                    </td>
                    <td>{{car.vin}}</td>
                    <td>{{car.year}}</td>
                    <td>{{car.brand}}</td>
                    <td>{{car.color}}</td>
                </tr>
            </ng-template>
            <ng-template pTemplate="emptymessage" let-columns>
              <tr>
                  <td [attr.colspan]="5" style="text-align:center">
                    {{columns}}
                      No cars found
                  </td>
              </tr>
            </ng-template>
        </p-table>
    </div>
  </div>
  <p-dialog header="Car Details" [(visible)]="dialog" [responsive]="true" [draggable]="false"
    showEffect="fade" [modal]="true" [width]="800">
        <app-product></app-product>
  </p-dialog>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsCollectionComponent implements OnInit {

  @Select((state) => state.products.cars)
  cars$;

  @Select((state) => state.products.carCrudForm)
  carCrudForm$;

  selectedCar;
  dialog

  constructor(private store: Store, private actions$: Actions) {
    this.carCrudForm$.subscribe(form => {
      if(form!=null){
        this.dialog = form.model.dialog
      }
    })
  }

  ngOnInit() {
  }

  openCrudDialg(mode) {
    let payload;
    mode.localeCompare('EDIT')==0 ? payload={...this.selectedCar} : {}
      this.store.dispatch(
        new UpdateFormValue( { path: 'products.carCrudForm', value: {payload, mode: mode, dialog: true} } )
      )
    }

  }
