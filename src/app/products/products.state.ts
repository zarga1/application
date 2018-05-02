import { UpdateFormValue, SetFormDirty } from '@ngxs/form-plugin';
import { ProductsStateModel } from './products.state';
import { State, Selector, StateContext, Action } from "@ngxs/store";
import { AddProduct, EditProduct } from "./products.action";
import { UpdateFormDirty } from '@ngxs/form-plugin';

export interface ProductsStateModel {
    cars: Array<any>,
    carCrudForm: any;
}

  @State<ProductsStateModel>({
    name: 'products',
    defaults: {
      cars: [],
      carCrudForm: null
    }
  })
  export class ProductsState {
    constructor() {}

    @Action(AddProduct)
    addProduct({ dispatch, getState, patchState }: StateContext<ProductsStateModel>, { payload }: any){
      patchState({
        cars: [...getState().cars, {...getState().carCrudForm.model.car}],
        carCrudForm: {
          dirty: false,
          model: {
            dialog: false,
            car: {}
          }
        }
      });
      // dispatch([
      //   new UpdateFormValue({path: 'products.carCrudForm', value: null}),
      //   new UpdateFormDirty({path: 'products.carCrudForm', dirty: false})
      // ]);
    }

    @Action(EditProduct)
    editProduct({ dispatch, getState, patchState }: StateContext<ProductsStateModel>, { payload }: any){
      let state = getState();
      let cars = [...state.cars];
      for(let i=0; i<cars.length;i++) {
        if(cars[i].vin.localeCompare(state.carCrudForm.model.car.vin)==0) {
          cars[i] = {...state.carCrudForm.model.car};
          break;
        }
      }
      patchState({
        cars: cars,
        carCrudForm: {
          dirty: true,
          model: {
            dialog: false,
            car: {},
            
          }
        }
      });
      // dispatch([
      //   new UpdateFormValue({path: 'products.carCrudForm', value: null}),
      //   new UpdateFormDirty({path: 'products.carCrudForm', dirty: false})
      // ]);
    }
  }
