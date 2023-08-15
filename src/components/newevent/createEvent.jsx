import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../container/container";
import UploadingImage from "../UI/uploadingImage";
import { toast } from "react-hot-toast";
import {
  createEvent,
  imageUpload,
  updateEvent,
  videoUpload,
} from "../../Utils/api";
import { useSelector } from "react-redux";
import { LoaderIcon } from "lucide-react";
const CreateEvent = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState(state?.data?.eventName || "");
  const [description, setDescription] = useState(
    state?.data?.description || ""
  );
  const [category, setCategory] = useState(
    state?.data?.categories?.toString() || ""
  );
  const [uploadImage, setUploadImage] = useState("");
  const [uploadVideo, setUploadVideo] = useState("");
  const [uploadv, setUploadv] = useState(state?.data?.video?.url || "");
  const [uploadim, setUploadim] = useState(state?.data?.coverImage?.url || "");
  const { token } = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);
  const [videoloading, setvloading] = useState(false);
  const [imageloading, setiloading] = useState(false);
  const [eventCover, setCover] = useState(state?.data?.coverImage || null);
  const [eventVideo, setVideo] = useState(state?.data?.video || null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  //console.log(state?.data)

  async function createNewEvent() {
    let eventCover;
    let eventVideo;
    setloading(true);
    const formdatas = new FormData();
    formdatas.append("image", uploadImage);
    setiloading(true);
    await imageUpload(token, formdatas)
      .then((res) => {
        console.log(res);
        //setIsImage(true);
        setiloading(false);
        eventCover = res.data.data;
        toast.success("Image successfully uploaded");
      })
      .catch((err) => {
        console.log(err);
        setiloading(false);
        toast.error("Image not uploaded");
      });

    const formdata = new FormData();
    formdata.append("video", uploadVideo);
    setvloading(true);
    await videoUpload(token, formdata)
      .then((res) => {
        console.log(res);
        // setIsVideo(true);
        setvloading(false);
        eventVideo = res.data.data;
        toast.success("Video successfully uploaded");
      })
      .catch((err) => {
        console.log(err);
        setvloading(false);
        toast.error("Video not uploaded");
      });

    const payload = {
      eventName: name,
      description: description,
      categories: category,
      eventCover,
      eventVideo,
      contestStart: start,
      contestEnd: end,
    };

    for (let i in payload) {
      if (payload[i] === "") {
        toast(`${i} is required`);
        return;
      }
    }

    if (state?.data?.id) {
      {
        eventCover &&
          eventVideo &&
          (await updateEvent(token, state?.data?.id, payload)
            .then((res) => {
              console.log(res);
              toast.success("Event updated successfully");
              setloading(false);
              navigate("/events");
            })
            .catch((error) => {
              console.log(error);
              setloading(false);
              const { error: err } = error.response.data;
              if (err) {
                toast.error(err.message);
              }
              const { message } = error.response.data.error;
              if (message) {
                toast.error(message);
              }
              const { message: mm } = error.response.data;
              if (mm) {
                toast.error(mm);
              }
            }));
      }
    } else {
      {
        eventCover &&
          eventVideo &&
          (await createEvent(token, payload)
            .then((res) => {
              console.log(res);
              toast.success("Event created successfully");
              setloading(false);
              window.location.reload();
            })
            .catch((error) => {
              console.log(error);
              setloading(false);
              const { error: err } = error.response.data;
              if (err) {
                toast.error(err.message);
              }
              const { message } = error.response.data.error;
              if (message) {
                toast.error(message);
              }
              const { message: mm } = error.response.data;
              if (mm) {
                toast.error(mm);
              }
            }));
      }
    }
  }


  return (
    <div className="w-full h-full overflow-x-hidden">
      <Container>
        <div
          onClick={() => {
            navigate(-1);
          }}
          className="w-fit cursor-pointer h-fit p-3"
        >
          <BiArrowBack className="w-[28px]" />
        </div>
        <div className="w-full sm:w-[650px] mx-auto px-2 space-y-4 sm:space-y-6 sm:px-6 py-4 h-fit">
          <div className="text-lg sm:text-xl font-semibold">
            Event: <span className="mr-1 text-[#017297]">SpaceX</span>
          </div>
          <div className="text-red-600">
            Please ensure to upload a video and image for the event
          </div>
          <div className="form-group space-y-4 w-full">
            <label className="block  " htmlFor="name">
              Event Name
            </label>
            <input
              className="block form__input border border-gray-200 focus:border-gray-500 hover:border-gray-500 rounded-sm focus:outline-none w-full h-11 px-4"
              type="name"
              placeholder="spaceX"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="form-group space-y-4 w-full">
            <p>Description</p>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="w-full border py-4 border-gray-200 focus:border-gray-500 hover:border-gray-500 rounded-sm focus:outline-none resize-none h-[280px] sm:h-[350px] px-4"
            ></textarea>
          </div>
          <div className="space-y-4 w-full">
            <div className="space-y-2">
              <p>Create Category</p>
              <p className="text-red-600 text-[11px] sm:text-xs">
                Use coma as separator (e.g Male, Female, Others)
              </p>
            </div>
            <textarea
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="w-full border py-4 border-gray-200 focus:border-gray-500 hover:border-gray-500 rounded-sm focus:outline-none resize-none h-[280px] sm:h-[350px] px-4"
            ></textarea>
          </div>

          <div className="w-full flex items-center justify-center space-x-3">
            <div className="form-group space-y-4 w-full">
              <label className="block  " htmlFor="date">
                Event Start Date
              </label>
              <input
                className="block form__input border border-gray-200 focus:border-gray-500 hover:border-gray-500 rounded-sm focus:outline-none w-full h-11 px-4"
                type="date"
                placeholder=""
                name="date"
                value={start}
                onChange={(e) => {
                  setStart(e.target.value);
                }}
              />
            </div>
            <div className="form-group space-y-4 w-full">
              <label className="block  " htmlFor="date">
                Event End Date
              </label>
              <input
                className="block form__input border border-gray-200 focus:border-gray-500 hover:border-gray-500 rounded-sm focus:outline-none w-full h-11 px-4"
                type="date"
                placeholder=""
                name="date"
                value={end}
                onChange={(e) => {
                  setEnd(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="form-group space-y-4 w-full">
            <div className="flex space-x-6 items-center">
              <p>Upload Event Cover</p>
            </div>
            <UploadingImage
              setUploadedImage={setUploadImage}
              text={"Upload Image"}
              type={"image"}
              upload={uploadim}
              setUpload={setUploadim}
            />
          </div>
          <div className="form-group space-y-4 w-full">
            <div className="flex space-x-6 items-center">
              <p>Upload Event Video</p>
            </div>
            <UploadingImage
              setUploadedImage={setUploadVideo}
              text={"Upload Video"}
              type={"video"}
              upload={uploadv}
              setUpload={setUploadv}
            />
          </div>

          <button
            onClick={createNewEvent}
            className="w-[120px] text-white flex items-center justify-center bg-[#017297] h-[44px] rounded-sm "
          >
            {loading ? (
              <LoaderIcon className="text-[22px] animate-spin" />
            ) : (
              " Create Event"
            )}
          </button>
        </div>
      </Container>
    </div>
  );
};

export default CreateEvent;
