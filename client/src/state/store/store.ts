import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../reducers/userSlice';
import storeReducer from '../reducers/storeSlice';
import categoryReducer from '../reducers/categorySlice';
import responsiveToggleSidebarReducer from '../reducers/responsiveToggleSidebarSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    togglebar:responsiveToggleSidebarReducer,
    store:storeReducer, 
    category:categoryReducer

  },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;