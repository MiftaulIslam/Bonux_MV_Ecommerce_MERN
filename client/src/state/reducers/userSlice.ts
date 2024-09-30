import {createSlice, PayloadAction} from '@reduxjs/toolkit'
interface userState {
    isLoggedIn:boolean,
    isAuthenticated:boolean,
    loading:boolean,
    user:any,
    error:string,
}
const initialState:userState = {
    isLoggedIn:false,
    isAuthenticated: false,
    loading:true,
    user:null,
    error:'',
    
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      LoadUserRequest(state) {
        state.loading = true;
      },
      GetUserSuccess(state, action: PayloadAction<any>) {
        state.isLoggedIn = true;
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
      },
      UpdateUserSuccess(state, action: PayloadAction<any>) {
        state.isLoggedIn = true;
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
      },
      UserFaliure(state, action: PayloadAction<any>) {
        state.isLoggedIn = false;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      },
      ResetState(state) {
        state.isLoggedIn = false;
        state.isAuthenticated = false;
        state.loading = false;
        state.user = null;
        state.error = '';
      }, 
    },
  });

export const { LoadUserRequest, GetUserSuccess, UserFaliure, ResetState,UpdateUserSuccess } = userSlice.actions;

export default userSlice.reducer;