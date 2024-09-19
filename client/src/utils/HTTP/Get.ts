import { base_url } from "../../static/data"
import { showAlert } from "../showAlert";

export const GetService =async (url:string,alert:boolean = false):Promise<any>=>{
const Url:string = `${base_url}/${url}`
const response = await fetch(Url);

  if (!response.ok) {
    const errorData:any = await response.json();
    showAlert(false, errorData.message || "Something went wrong");
    return null
  }

  const responseData:any = await response.json();
  if(alert) showAlert(true, responseData.message);
  return responseData;
}