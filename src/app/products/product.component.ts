import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Store, Actions, ofActionDispatched } from '@ngxs/store';
import { AddProduct, EditProduct } from './products.action';

@Component({
  selector: 'app-product',
  template: `
  <form class="ui-g ui-fluid" [formGroup]="carFG" novalidate
    ngxsForm="products.carCrudForm">
    <span formGroupName="car">
      <div class="ui-g-12">
          <div class="ui-g-4">
              <label for="vin">Vin</label>
          </div>
          <div class="ui-g-8">
              <input pInputText id="vin" formControlName="vin" />
          </div>
      </div>
      <div class="ui-g-12">
          <div class="ui-g-4">
              <label for="color">Description</label>
          </div>
          <div class="ui-g-8">
            <textarea pInputTextarea formControlName="description"></textarea>
          </div>
      </div>
      <div class="ui-g-12">
          <div class="ui-g-4">
              <label for="year">Year</label>
          </div>
          <div class="ui-g-8">
              <input pInputText id="year" formControlName="year"/>
          </div>
      </div>
      <div class="ui-g-12">
          <div class="ui-g-4">
              <label for="brand">Brand</label>
          </div>
          <div class="ui-g-8">
              <input pInputText id="brand" formControlName="brand" />
          </div>
      </div>
      <div class="ui-g-12">
          <div class="ui-g-4">
              <label for="color">Color</label>
          </div>
          <div class="ui-g-8">
              <input pInputText id="color" formControlName="color" />
          </div>
      </div>
      <div class="ui-g-12">
        <div class="ui-dialog-buttonpane">
            <button pButton type="button" label="Add" icon="fa-save" *ngIf="carFG.get('mode').value.localeCompare('ADD')==0"
              (click)="addProduct()" class="ui-button-success pull-right" style="width:120px"></button>
            <button pButton type="button" label="Edit" icon="fa-save" *ngIf="carFG.get('mode').value.localeCompare('EDIT')==0"
              (click)="editProduct()" class="ui-button-info pull-right" style="width:120px"></button>
            <button pButton type="button" label="Cancel" icon="fa-close"
              class="ui-button-warning" style="width:120px"></button>
        </div>
      </div>
    </span>
  </form>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  carFG: FormGroup;

  constructor(public fb: FormBuilder, public store: Store, private actions$: Actions) {
    this.carFG = this.fb.group({
      car: this.fb.group({
        vin: [''],
        description: [''],
        year: [''],
        brand: [''],
        color: [''],
      }),
      mode: [''],
      dialog: [false]
    });
  }

  addProduct() {
    this.store.dispatch(new AddProduct())
  }

  editProduct() {
    this.store.dispatch(new EditProduct())
  }

  ngOnInit() {
  }

}
