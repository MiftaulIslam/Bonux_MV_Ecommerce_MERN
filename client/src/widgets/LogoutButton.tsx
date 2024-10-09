
import { base_url } from '../static/data.ts'

import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../utils/showAlert';
import { useDispatch } from 'react-redux';
import { ResetState } from '../state/reducers/userSlice.ts';
import { AppDispatch } from '../state/store/store.ts';
const LogoutButton = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const handleLogout =async ()=>{
        const formData = new FormData();
        formData.append('someKey', 'someValue');
        const response = await fetch(`${base_url}/user/logout`,{
            method:'POST',
            credentials:'include',
            body:formData
        })
        const responseData =await response.json()
        if(response.ok){
            Cookies.remove('authenticate-token')
            dispatch(ResetState())
            navigate('/login')
            showAlert(true, responseData.message);
            window.location.reload()
        }else{
            showAlert(false, responseData.message||"Something went wrong");

        }
    }
  return (
    <button className='hover:underline text-[#555555]' onClick={handleLogout}>Logout</button>
  )
}

export default LogoutButton