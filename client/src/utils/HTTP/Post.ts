import { base_url } from "../../static/data"
import { showAlert } from "../showAlert";

export const PostService =async (url:string,alert:boolean, object:any=null):Promise<any>=>{
const Url:string = `${base_url}/${url}`
const response = await fetch(Url, {
    method: "POST",
    credentials: "include",  
    body: object,
  });

  const responseData:any = await response.json();
  if (!response.ok) {
    showAlert(false, responseData.message || "Something went wrong");
    return { ok: response.ok, data: responseData }; 
  }

  if(alert) showAlert(true, responseData.message);
  return { ok: response.ok, data: responseData }; 
}