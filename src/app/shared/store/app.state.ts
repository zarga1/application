import { State } from "@ngxs/store";

export interface AppStateModel {
    
  }
  
  @State<AppStateModel>({
    name: 'app',
    defaults: {

    }
  })
  export class AppState {
    constructor() {}

  }