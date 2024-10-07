
import { userProfileProp } from '../models/PropType.ts'
import { default_src } from '../static/data.ts'

const UserProfile:React.FC<userProfileProp> = ({user}) => {
  return (
    <>
    <img
                src={`${default_src}${user?.avatar}`}
                className="max-w-[30px] rounded-full"
                alt="User Avatar"
              />
              {/* name */}
              <p className="font-sm hidden sm:block font-bold text-white">
                {user?.name}
              </p></>
  )
}

export default UserProfile