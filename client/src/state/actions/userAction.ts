import { Dispatch } from "redux";
import {
  LoadUserRequest,
  GetUserSuccess,
  UserFaliure,
  UpdateUserSuccess,
} from "../reducers/userSlice";
import { PutService } from "../../utils/HTTP/Put";
import { GetService } from "../../utils/HTTP/Get";
import { DeleteService } from "../../utils/HTTP/Delete";

export const fetchUser = () => async (dispatch: Dispatch) => {
  dispatch(LoadUserRequest());
const data = await GetService(`user/getuser`)
  if (data.ok) {
    dispatch(GetUserSuccess(data.data.data));
  }else{

    dispatch(UserFaliure(data.data.message));

  }
};
export const updateUser = (url:string,updatedUserData?:any) => async (dispatch: Dispatch) => {
  dispatch(LoadUserRequest());

  
  const data = await PutService(url, true, updatedUserData)
  if(data.ok){
    dispatch(UpdateUserSuccess(data.data.data));

  }else{

    dispatch(UserFaliure(data.data.message));
  }

}

export const deleteAddress = (url:string) => async (dispatch: Dispatch) => {
  dispatch(LoadUserRequest());

  
  const data = await DeleteService(url, true)
  if(data.ok){
    dispatch(UpdateUserSuccess(data.data.data));

  }else{

    dispatch(UserFaliure(data.data.message));
  }
 

}
