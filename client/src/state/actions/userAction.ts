import { Dispatch } from "redux";
import {
  LoadUserRequest,
  GetUserSuccess,
  UserFaliure,
} from "../reducers/userSlice";
import { base_url } from "../../static/data";

export const fetchUser = () => async (dispatch: Dispatch) => {
  dispatch(LoadUserRequest());

  const response = await fetch(`${base_url}/user/getuser`, {
    credentials: "include",
  });

  const jsonResponse = await response.json();
  if (response.ok) {
    dispatch(GetUserSuccess(jsonResponse.message));
  }else{

    dispatch(UserFaliure(jsonResponse.message));
  }
};
