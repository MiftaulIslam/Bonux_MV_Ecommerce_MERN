import {FocusEventHandler,ChangeEventHandler} from "react";
const Password = ({value, onBlur, onChange}:{value:string, onBlur: FocusEventHandler<HTMLInputElement>, onChange: ChangeEventHandler<HTMLInputElement>}) => {
  return (
    <>
     <input
              type="password"
              name="password"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              className="bg-[#eee] border-0 p-3 my-2 outline-0 rounded-md w-full"
              placeholder="Password"
            />
    </>
  );
};

export default Password;
