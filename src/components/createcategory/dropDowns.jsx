import React, {useState} from 'react'
import { MdNavigateBefore } from 'react-icons/md';
export default function DropDowns({header, data, active, setActive, setActiveId}) {
    const [show, setShow] = useState(false);

    function toggleShow() {
        setShow(!show);
      }
    return (
        <div className='w-full'>
             <div className="block font-semibold mb-4 ">
           {header}
          </div>
        <div
          onClick={toggleShow}
          className="flex items-center justify-between relative mb-3 sm:mb-4 border  border-gray-200 focus:border-gray-500 hover:border-gray-500 rounded-sm  w-full h-11 px-4"
        >
          <span>{active}</span>
          <MdNavigateBefore
            className={` ${
              show ? "rotate-90" : "-rotate-90"
            } text-[22px] text-gray-500 `}
          />

          {show && (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="absolute w-full top-12 left-0"
            >
              <div onClick={toggleShow} className="w-full h-full z-[60] inset-0 fixed bg-none"></div>
              <div className="w-full z-[90] bg-white rounded-sm shadow-lg h-fit max-h-[200px] py-4 overflow-y-auto relative">
                <div className="flex flex-col items-start justify-start w-full">
                  {Array.isArray(data) &&
                    data?.map(({ name, eventName, _id }, idx) => {
                      return (
                        <div
                          onClick={() => {
                            setActive(name || eventName);
                            setActiveId(_id);
                            toggleShow();
                          }}
                          key={idx}
                          className="w-full"
                        >
                          <div className="cursor-pointer px-2 w-full py-3 border-b hover:bg-gray-100">
                            {name || eventName}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </div>

        </div>
    )
}