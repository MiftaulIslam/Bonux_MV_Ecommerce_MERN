import {createSlice, PayloadAction} from '@reduxjs/toolkit'
interface storeState {
    loading:boolean,
    store:any,
    error:string,
}
const initialState:storeState = {
    loading:true,
    store:null,
    error:'',
    
}

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
      LoadStoreRequest(state) {
        state.loading = true;
      },
      GetStoreSuccess(state, action: PayloadAction<any>) {
        state.loading = false;
        state.store = action.payload;
      },
      UpdateStoreSuccess(state, action: PayloadAction<any>) {
        state.loading = false;
        state.store = action.payload;
      },
      StoreFaliure(state, action: PayloadAction<any>) {
        state.loading = false;
        state.error = action.payload;
        state.store = null;
      },
      ResetState(state) {
        state.loading = false;
        state.store = null;
        state.error = '';
      }, 
    },
  });

export const { LoadStoreRequest, GetStoreSuccess, StoreFaliure, ResetState,UpdateStoreSuccess } = storeSlice.actions;

export default storeSlice.reducer;