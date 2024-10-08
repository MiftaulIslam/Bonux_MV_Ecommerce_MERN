import { Dispatch } from "redux";

import { base_url } from "../../static/data";
import { CategoryFaliure, GetCategorySuccess, LoadCategoryRequest } from "../reducers/categorySlice";

export const fetchCategoriesRaw = () => async (dispatch: Dispatch) => {
  dispatch(LoadCategoryRequest());
  
  const response = await fetch(`${base_url}/category/categories-raw`, {
    credentials: "include",
  });

  const jsonResponse = await response.json();
  console.log(jsonResponse)
  // console.log(jsonResponse)
  if (response.ok) {
    dispatch(GetCategorySuccess(jsonResponse.data));
  }else{

    dispatch(CategoryFaliure(jsonResponse.message));
  }
};





