import { Dispatch } from "redux";

import { base_url } from "../../static/data";
import { PutService } from "../../utils/HTTP/Put";
import { GetStoreSuccess, LoadStoreRequest, StoreFaliure, UpdateStoreSuccess } from "../reducers/storeSlice";
import { PostService } from "../../utils/HTTP/Post";

export const fetchStore = (storeId) => async (dispatch: Dispatch) => {
  dispatch(LoadStoreRequest());
  
  const response = await fetch(`${base_url}/store/${storeId}`, {
    credentials: "include",
  });

  const jsonResponse = await response.json();
  // console.log(jsonResponse)
  if (response.ok) {
    dispatch(GetStoreSuccess(jsonResponse.data));
  }else{

    dispatch(StoreFaliure(jsonResponse.message));
  }
};
export const addStore = (storeData) => async (dispatch: Dispatch) => {
  dispatch(LoadStoreRequest());

  const data = await PostService(`${base_url}/`, true, storeData)
//   const response = await fetch(`${base_url}/user/getuser`, {
//     credentials: "include",
//   });

  if (data.ok) {
    dispatch(GetStoreSuccess(data.data.data));
  }else{

    dispatch(StoreFaliure(data.message));
  }
};
export const updateStore = (url:string,updatedStoreData:any) => async (dispatch: Dispatch) => {
  dispatch(LoadStoreRequest());

  
  const data = await PutService(url, true, updatedStoreData)
if(data.ok){

    dispatch(UpdateStoreSuccess(data.data.data));
}  else{
    dispatch(StoreFaliure(data.data.message));

}




};
