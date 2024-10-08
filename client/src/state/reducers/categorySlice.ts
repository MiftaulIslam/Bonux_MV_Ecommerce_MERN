import {createSlice, PayloadAction} from '@reduxjs/toolkit'
interface categoryState {
    loading:boolean,
    category:any,
    error:string,
}
const initialState:categoryState = {
    loading:true,
    category:null,
    error:'',
    
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
      LoadCategoryRequest(state) {
        state.loading = true;
      },
      GetCategorySuccess(state, action: PayloadAction<any>) {
        state.loading = false;
        state.category = action.payload;
      },
      UpdateCategorySuccess(state, action: PayloadAction<any>) {
        state.loading = false;
        state.category = action.payload;
      },
      CategoryFaliure(state, action: PayloadAction<any>) {
        state.loading = false;
        state.error = action.payload;
        state.category = null;
      },
    },
  });

export const { LoadCategoryRequest, GetCategorySuccess, UpdateCategorySuccess, CategoryFaliure } = categorySlice.actions;

export default categorySlice.reducer;