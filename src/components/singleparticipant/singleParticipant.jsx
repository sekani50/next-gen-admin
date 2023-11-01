import React, { useState, useEffect } from "react";
import Container from "../container/container";
import { singleParticipant } from "../../Utils/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import user from "../../assets/png/customerpic.png"
const SingleParticipant = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { token } = useSelector((state) => state.user);
  const [data, setdata] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    async function singles() {
      await singleParticipant(token, state?.data?.catId, id)
        .then((res) => {
          console.log(res);
          const { data } = res.data;
          setdata(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    singles();
  }, []);
  return (
    <Container>
      <div className="w-full mx-auto px-2  sm:px-6 py-4 h-fit">
      <div
          onClick={() => {
            navigate(-1);
          }}
          className="w-fit cursor-pointer h-fit p-3"
        >
          <BiArrowBack className="w-[28px]" />
        </div>
        <div className="space-y-4 sm:w-[630px] flex flex-col items-center w-[95%] mx-auto">
          <div className="text-lg text-center font-semibold">
            
            <span>Participant</span>
            {" "}
           
          </div>

          <div className="w-[200px] h-[200px] rounded-md border">
            <img src={data?.participant?.profileImage?.url || user} alt="" className="w-full h-full rounded-md"/>
          </div>

          <div className="space-y-3 flex flex-col">
          <p>Name: <span>{`${data?.participant?.firstName || ""} ${data?.participant?.lastName || ""}`}</span></p>
          <p>Stage Name: <span>{data?.participant?.stageName || ""}</span></p>
          <p>Talent/Skill: <span>{data?.participant?.talent?.name || ""}</span></p>
          <p>Email: <span>{data?.participant?.email || ""}</span></p>
          <p>Phone Number: <span>{data?.participant?.phoneNumber || ""}</span></p>
          <p>Portfolio link: <span>{data?.registeredData?.portfolio || ""}</span></p>
          <p>City: <span>{data?.participant?.city || ""}</span></p>
          <p>Country: <span>{data?.participant?.country?.name || ""}</span></p>
          </div>


        </div>
      </div>
    </Container>
  );
};

export default SingleParticipant;
