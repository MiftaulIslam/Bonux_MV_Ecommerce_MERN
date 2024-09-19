
export interface SignupModel{
    name:string, 
    email: string, 
    password:string,
    phone:string,
    avatar: File | null
}
export interface LoginModel{
    email: string, 
    password:string,
}