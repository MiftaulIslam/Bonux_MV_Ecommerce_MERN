import { base_url } from "../../static/data"
import { showAlert } from "../showAlert";

export const GetService =async (url:string,alert:boolean = false):Promise<any>=>{
const Url:string = `${base_url}/${url}`
const response = await fetch(Url,{
  credentials:"include",
});

const responseData:any = await response.json();
  if (!response.ok) {
    showAlert(false, responseData.message || "Something went wrong");

    return {ok:response.ok?true:false, data:responseData}
  }

  if(alert) showAlert(true, responseData.message);
  return {ok:response.ok?true:false, data:responseData}
}