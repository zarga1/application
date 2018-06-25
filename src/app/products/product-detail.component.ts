import {
  Component,
  Input,
  ElementRef,
  OnChanges,
  ViewChild,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterDetailCommands } from '../shared/utility/master-detail-component.class';


@Component({
  selector: 'app-product-detail',
  template: `
  <mat-card>
    <mat-card-header>
      <mat-card-title>Product Details</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <form [formGroup]="form" (ngSubmit)="saveProduct()">
        <div class="editfields">
          <div [hidden]="addMode">
            <mat-form-field>
              <input matInput formControlName="id" placeholder="id" #id readonly>
            </mat-form-field>
          </div>
          <div>
            <mat-form-field>
              <input matInput formControlName="name" placeholder="name" #name
                (keyup.esc)="close()" (keyup.enter)="saveProduct()">
            </mat-form-field>
          </div>
        </div>
        <button mat-raised-button color="accent" type="button" (click)="close()" matTooltip="Cancel all changes">Cancel</button>
        <button mat-raised-button color="primary" type="submit"
          [disabled]="form.pristine || form.invalid" matTooltip="Save all changes">Save</button>
      </form>
    </mat-card-content>
  </mat-card>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnChanges {
  @Input() product: any;
  @Input() commands: MasterDetailCommands<any>;

  @ViewChild('name') nameElement: ElementRef;

  addMode = false;

  form = this.fb.group({
    id: [],
    name: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    this.setFocus();
    if (this.product && this.product.id) {
      this.form.patchValue(this.product);
      this.addMode = false;
    } else {
      this.form.reset();
      this.addMode = true;
    }
  }

  close() {
    this.commands.close();
  }

  saveProduct() {
    const { dirty, valid, value } = this.form;
    if (dirty && valid) {
      const newProduct = { ...this.product, ...value };
      this.addMode ? this.commands.add(newProduct) : this.commands.update(newProduct);
    }
    this.close();
  }

  setFocus() {
    this.nameElement.nativeElement.focus();
  }

}
