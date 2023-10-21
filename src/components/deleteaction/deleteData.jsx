import React,{useState} from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { LoaderIcon } from "lucide-react";
export default function DeleteData({close, deleteFunction, id}) {
    const {token} = useSelector((state) => state.user)
    const [loading, setloading] = useState(false)
    async function deletes() {
        setloading(true)
        await deleteFunction( token, id)
        .then((res) => {
            console.log(res)
            setloading(false)
            close()
            window.location.reload()
           
            toast.success(`Deleted Successfully`)
        })
        .catch((err) => {
            console.log(err)
            setloading(false)
        })
    }
    console.log(id)
    return  (
            <div
            onClick={close}
            className="w-full h-full inset-0 z-[50] bg-black bg-opacity-10 fixed ">
              <div
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="w-[95%] sm:w-[350px] h-fit m-auto absolute inset-0 bg-white rounded-sm p-6 space-y-10">
                <p>Do you wish to continue?</p>
                <div className="w-full items-center justify-between flex">
                  <button
                  onClick={deletes}
                  className="w-[70px] h-[44px] flex items-center justify-center rounded-sm hover:bg-gray-200 text-center">
                  {loading ? <LoaderIcon className="text-[22px] animate-spin"/> : '  Yes'}
                  </button>
                  <button
                    onClick={close}
                    className="w-[70px] h-[44px] flex items-center justify-center rounded-sm hover:bg-gray-200 text-center"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
    )
    
}