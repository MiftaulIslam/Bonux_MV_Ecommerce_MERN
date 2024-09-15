export const validateEmail=(email:string):string=>{
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if(!email) return 'Email is required'
if(!email.match(emailPattern)) return 'Invalid email address'
return ''
}

export const validatePassword=(password:string):string=>{
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password) return 'Password is required'

    if(password.length < 8) return "Password must contains at least 8 characters"
    
    if(!password.match(passwordPattern)) return 'Password must contains at least one letter and one number and 8 characters'
    return ''
}
