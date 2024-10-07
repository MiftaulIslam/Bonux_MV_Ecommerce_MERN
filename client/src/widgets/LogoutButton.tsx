
import { base_url } from '../static/data.ts'

import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../utils/showAlert';
import { useDispatch } from 'react-redux';
import { ResetState } from '../state/reducers/userSlice.ts';
const LogoutButton = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout =async ()=>{
        const response = await fetch(`${base_url}/user/logout`,{
            credentials:'include'
        })
        const responseData =await response.json()
        if(response.ok){
            Cookies.remove('authenticate-token')
            dispatch(ResetState())
            navigate('/login')
            showAlert(true, responseData.message);
        }else{
            showAlert(false, responseData.message||"Something went wrong");

        }
    }
  return (
    <button className='hover:underline text-[#555555]' onClick={handleLogout}>Logout</button>
  )
}

export default LogoutButton