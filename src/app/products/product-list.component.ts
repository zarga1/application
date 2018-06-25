import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MasterDetailCommands } from '../shared/utility/master-detail-component.class';


@Component({
  selector: 'app-products-list',
  template: `
  <mat-card>
    <mat-card-header>
      <mat-card-title>products</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <ul class="products">
        <li *ngFor="let product of products; trackBy: byId" class="item-container">
          <button mat-button mat-suffix mat-icon-button color="accent" class="delete-button" aria-label="Delete" (click)="deleteProduct(product)"
            matTooltip="Delete the hero">
            <mat-icon>delete</mat-icon>
          </button>
          <div class="selectable-item" [class.selected]="product === selectedproduct">
            <div class="badge">{{product.id}}</div>
            <div class="item-text" (click)="onSelect(product)">
              <div class="name">{{product.name}}</div>
            </div>
          </div>
        </li>
      </ul>
    </mat-card-content>
  </mat-card>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent {
  @Input() products: any[] = [];
  @Input() selectedProduct: any;
  @Input() commands: MasterDetailCommands<any>;

  byId(product: any) {
    return product.id;
  }

  onSelect(product: any) {
    this.commands.select(product);
  }

  deleteHero(product: any) {
    this.commands.delete(product);
  }
}
