import { toast } from "react-toastify"

export const showAlert = (success:boolean, message:string):void =>{
if(success){
    toast.success(message)
}else{
    toast.error(message)
}
}