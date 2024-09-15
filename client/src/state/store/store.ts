import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../reducers/userSlice';
import responsiveToggleSidebarReducer from '../reducers/responsiveToggleSidebarSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    togglebar:responsiveToggleSidebarReducer

  },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;