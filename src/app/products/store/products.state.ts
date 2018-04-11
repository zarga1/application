import { State } from "@ngxs/store";

export interface ProductsStateModel {
    products: Array<any>
}
  
  @State<ProductsStateModel>({
    name: 'products',
    defaults: {
        products: []
    }
  })
  export class ProductsState {
    constructor() {}

  }