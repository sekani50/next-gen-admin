import React from "react";
import { MdNavigateBefore } from "react-icons/md";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { categoryDetail } from "../../Utils/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../container/container";

export default function CategoryDetail() {
    const {id} = useParams()
    const navigate = useNavigate()
    const {token} = useSelector((state) => state.user)
    const [catData, setCatData] = useState(null)

    useEffect(() => {
        async function getDetail() {
            await categoryDetail(token, id) 
            .then((res) => {
                //console.log(res.data.data)
                setCatData(res.data.data)
            })
            .catch((err) => {
                //console.log(err)
            })
        }
        getDetail()
    },[])
    return (
       <Container>
         <div className="w-full mx-auto px-2  sm:px-6 py-4 h-fit">
    <div className="bg-white py-4 px-2 sm:px-4 flex  flex-col mx-auto w-full sm:w-[500px] rounded-sm h-fit ">
      <div className="mb-5 sm:mb-7 w-full justify-between flex gap-3 items-center">
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          <MdNavigateBefore className="text-[24px]" />
        </button>
        <h2 className="font-semibold text-lg sm:text-xl">{catData?.name}</h2>

        <div className="h-1 w-1"></div>
      </div>
      
      <div className="grid mb-3 sm:mb-4 grid-cols-6 w-full gap-4 items-center">
        <h3 className="font-semibold">Event:</h3>
        <p className="col-span-5">{catData?.event}</p>
      </div>
      <div className="grid  mb-3 sm:mb-4  grid-cols-6 w-full gap-4 items-center">
        <h3 className="font-semibold">Talent:</h3>
        <p className="col-span-5">{catData?.talent}</p>
      </div>

      <div className="w-full flex flex-col gap-4 items-start justify-start">
        <h3 className="font-semibold">Description</h3>
        <div className="flex flex-wrap w-full text-justify justify-start">
          {catData?.description}
        </div>

      </div>
    </div>
    </div>
       </Container>
    )
}