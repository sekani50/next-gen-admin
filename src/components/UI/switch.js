import React from "react";
import { useSelector } from "react-redux";
const Switch = () => {
  const {credential } = useSelector((state) => state.user);
  //const [isToggled, ] = useState(false)
    return (
        <div className=" px-1 flex justify-between md:text-sm text-xs items-center">
          <div className="flex space-x-4 items-center">
            <div
              
              className={`${
                credential?.status ? "bg-greem-500" : "bg-gray-400"
              } md:h-6 h-4 md:w-14 w-12  rounded-2xl p-2`}
            >
              <div
               
                className={`${
                  credential?.status ? "translate-x-6" : "translate-x-[-8px]"
                } transform duration-300  md:h-6 h-4 md:w-6 w-4 mt-[-8px] bg-white rounded-full`}
              ></div>
            </div>
          </div>
        </div>
    )
}

export default Switch