import { base_url } from "../../static/data"
import { showAlert } from "../showAlert";

export const DeleteService = async (url:string,alert:boolean):Promise<any>=>{
const Url:string = `${base_url}/${url}`
const response = await fetch(Url, {
    method: "DELETE",
    credentials: "include",  
  });

  if (!response.ok) {
    const errorData:any = await response.json();
    showAlert(false, errorData.message || "Something went wrong");
  }

  const responseData:any = await response.json();
  if(alert) showAlert(true, responseData.message);
  return responseData;
}