
export interface SignupModel{
    username:string, 
    email: string, 
    password:string,
    avatar: File | null
}
export interface LoginModel{
    email: string, 
    password:string,
}