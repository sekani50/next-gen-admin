import React,{useState} from 'react';
import Container from '../container/container';
import { IoMdSearch } from "react-icons/io";
import { BsArrowDownShort } from "react-icons/bs";
import { IoFilterSharp } from "react-icons/io5";
import RecordWidget from '../record/recordWidget';
import { useEffect } from 'react';
import { getShortlist } from '../../Utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import user from "../../assets/png/customerpic.png"
import { LoaderIcon } from 'lucide-react';
import empty from "../../assets/png/emptyorder.png"
import { MdNavigateBefore } from 'react-icons/md';
const ShortListed = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {token} = useSelector((state) => state.user)
  const [page, setPage] = useState(0)
  const [totalItems,setTotalItems] = useState(0)
  const [loading, setloading] = useState(false)
  const [data, setdata] = useState([])
  const [currentPage, setcurrentPage] = useState(0)
  useEffect(() => {
    async function getList() {
      setloading(true)
        await getShortlist(token, id)
        .then((res) => {
          console.log(res)
          const { data} = res.data;
          setloading(false);
          setdata(data.data);
          const totalPage = Math.ceil(data?.paging?.totalItems / 10);
          console.log(totalPage);
          setcurrentPage(data?.paging?.currentPage);
          
          setTotalItems(totalPage);
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getList()
  },[])

  console.log(data[0]?.participant)
    return (
        <Container>
               <div className="w-full mx-auto px-2  sm:px-6 py-4 h-fit">



        <button
        onClick={() => {
          navigate(-1)
        }}
        className='flex items-center mb-3 sm:mb-6 gap-1'>
          <MdNavigateBefore className='text-[22px]'/>
          <span>Back</span>
        </button>
               <div className="w-full hidden mb-2 justify-between items-center ">
          <div className="border text-gray-500 px-2  flex items-center justify-center space-x-2 border-gray-500 rounded-sm h-11">
            <IoFilterSharp className="text-[22px]" />
            <div>Filter</div>
          </div>

          <div className="w-[60%] relative sm:w-[40%] h-12">
            <input
              type="search"
              placeholder="search"
              className="border border-gray-500 focus:border-gray-700 hover:border-gray-700 rounded-sm focus:outline-none w-full h-11 pl-10 pr-4"
            />
            <div className="absolute h-fit w-fit top-3 left-3">
              <IoMdSearch className="text-[22px] text-gray-400" />
            </div>
          </div>
        </div>

        <div className="dashboard-scroll-style w-full h-fit overflow-y-hidden overflow-x-auto py-2">
          <div className="min-w-[1000px] w-full  rounded-lg shadow-lg py-4">
            <div className="grid grid-cols-7 bg-gray-200 text-gray-500 gap-6 rounded-t-lg border-b w-full items-center py-4 px-4">
              <div className="flex pl-3 col-span-2 items-center space-x-2">
                <p className="">Participants</p>
                <BsArrowDownShort className="text-[22px]" />
              </div>
            
              <div className="flex col-span-2 items-center space-x-2">
                <p className="">Category</p>
                <BsArrowDownShort className="text-[22px]" />
              </div>
              <div className="flex items-center space-x-2">
                <p className="">Votes</p>
                <BsArrowDownShort className="text-[22px]" />
              </div>
              <div className="flex items-center space-x-2">
                <p className="">Status</p>
                <BsArrowDownShort className="text-[22px]" />
              </div>

              <p className="w-1 h-1 "></p>
            </div>
            {loading && (
              <div className="w-full items-center justify-center flex h-[300px]">
                <div className="justify-center flex w-fit h-fit items-center">
                  <LoaderIcon className="w-10 animate-spin text-[#005ABC]" />
                </div>
              </div>
            )}
            {!loading && data?.length === 0 && (
              <div className="w-full h-[300px] flex justify-center items-center">
                <span className="w-[200px] h-[200px]">
                  <img className="w-full h-full" src={empty} alt="" />
                </span>
              </div>
            )}
          {data?.map(({participant, status,category },j) => {
            return (
              <div key={j}>
              <RecordWidget
                id={participant?._id}
                email={participant?.email}
                name={`${participant?.firstName} ${participant?.lastName}`}
                image={participant?.profileImage?.url || user}
                status={status || ''}
                votes={participant?.votes || '0'}
                category={category?.name || ''}
                catId={category?._id}
              
              />
              </div>
            )
           })}

           
          </div>
        </div>
        <div className="flex w-full my-3 justify-between items-center">
        {currentPage > 1 ? (
            <button
            onClick={() => {
              setPage(page -1)
            }}
            className="border border-[#017297] text-[#017297] rounded-lg px-4 py-2">
              Previous
            </button>
          ) : (
            <div className="w-1 h-1"></div>
          )}
          <p>{`page ${currentPage} of ${totalItems}`}</p>
          {currentPage === totalItems ? (
            <div className="w-1 h-1"></div>
          ) : (
            <button
            onClick={() => {
              setPage(page+1)
            }}
            className="bg-[#017297] text-white rounded-lg px-4 py-2">
              Next
            </button>
          )}
        </div>
               </div>
            
        </Container>
    )
}

export default ShortListed