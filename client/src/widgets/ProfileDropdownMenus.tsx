
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton';

const ProfileDropdownMenus = ({data}) => {
    
  // const { user } = useSelector((state) => state.user);
  return (
    <div><ul>
    <li className="block sm:hidden">
      <span>{data && data.name}</span>
    </li>
    <li className="py-2">
      <Link
        className="hover:underline text-[#555555]"
        to="/user/my"
      >
        Profile
      </Link>
    </li>
    <li className="">
      <Link
        className="hover:underline text-[#555555]"
        to="/deals"
      >
        Deals
      </Link>
    </li>
    <li className="block sm:hidden">
      <Link
        className="hover:underline text-[#555555]"
        to="/deals"
      >
        Become a seller
      </Link>
    </li>
    <li className="py-2">
        <LogoutButton/>
    </li>

  </ul></div>
  )
}

export default ProfileDropdownMenus