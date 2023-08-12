import React from "react";
import {BiArrowBack} from 'react-icons/bi'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../container/container";
import UploadingImage from "../UI/uploadingImage";
const CreateEvent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [age, setAge] = useState();
  const [uploadImage, setUploadImage] = useState("");
  const [uploadVideo, setUploadVideo] = useState("");
  return (
    <div className="w-full h-full overflow-x-hidden">
      <Container>
        <div
        onClick={() => {
            navigate(-1)
        }}
        className="w-fit cursor-pointer h-fit p-3">
            <BiArrowBack className="w-[28px]"/>

        </div>
        <div className="w-full sm:w-[650px] mx-auto px-2 space-y-4 sm:space-y-6 sm:px-6 py-4 h-fit">
          <div className="text-lg sm:text-xl font-semibold">
            Event: <span className="mr-1 text-[#017297]">SpaceX</span>
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
              className="w-full border border-gray-200 focus:border-gray-500 hover:border-gray-500 rounded-sm focus:outline-none resize-none h-[280px] sm:h-[350px] px-4"
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
              className="w-full border border-gray-200 focus:border-gray-500 hover:border-gray-500 rounded-sm focus:outline-none resize-none h-[280px] sm:h-[350px] px-4"
            ></textarea>
          </div>
          <div className="form-group space-y-4 w-full">
            <label className="block  " htmlFor="name">
              Age Limit
            </label>
            <input
              className="block form__input border border-gray-200 focus:border-gray-500 hover:border-gray-500 rounded-sm focus:outline-none w-full h-11 px-4"
              type="text"
              placeholder="18-25"
              name="text"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
          </div>
          <div className="form-group space-y-4 w-full">
            <p>Upload Event Cover</p>
            <UploadingImage
              setUploadedImage={setUploadImage}
              text={"Upload Image"}
              type={"image"}
            />
          </div>
          <div className="form-group space-y-4 w-full">
            <p>Upload Event Video</p>
            <UploadingImage
              setUploadedImage={setUploadVideo}
              text={"Upload Video"}
              type={"video"}
            />
          </div>

          <button className="px-6 text-white bg-[#017297] py-2 rounded-sm w-fit">
            Create Event
          </button>
        </div>
      </Container>
    </div>
  );
};

export default CreateEvent;
