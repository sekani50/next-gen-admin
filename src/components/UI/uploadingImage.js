"use client";
import React, { useEffect, useState } from "react";
import { BsCameraVideoFill, BsImage } from "react-icons/bs";

const UploadingImage = ({ setUploadedImage, text , type}) => {
  const [upload, setUpload] = useState("");
  const [isEdit, setEdit] = useState(false);

  const handleUpload = async (e) => {
    if (e.target.files[0]) {
      const files = e.target.files[0];
      const image = URL.createObjectURL(files);
      setUpload(image);
      setUploadedImage(files);

      //setEdit(true)
    }
  };
  useEffect(() => {
    if (upload) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [upload]);

  const editImage = () => {
    setUpload("");
    setUploadedImage(null);
  };

  return (
    <div className="mb-4 ">
      <div className="flex justify-between mb-3 items-start w-full">
        {isEdit && (
          <button
            onClick={editImage}
            className="text-white font-medium px-3 py-1 bg-red-600 rounded-lg hover:bg-red-700"
          >
            Edit
          </button>
        )}
      </div>

      <label
        htmlFor="upload"
        className="flex items-center overflow-hidden bg-gray-200 justify-center w-full h-[220px] rounded-sm border-dashed border border-gray-200"
      >
        {!upload && (
          <div className="flex flex-col space-y-2 items-center justify-center w-fit h-fit">
            {type === "video" ? (
              <BsCameraVideoFill className="text-black text-[25px] sm:text-[30px] " />
            ) : (
              <BsImage className="text-black text-[25px] sm:text-[30px] " />
            )}

            <div className="text-black uppercase font-light text-sm ">
              {text}
            </div>
          </div>
        )}

        {upload && (
          <img src={upload} alt="img" className="w-full h-full object-cover" />
        )}
        <input
          type="file"
          hidden
          id="upload"
          accept={
            type === "video" ? "video/*" : "image/png, image/jpg, image/jpeg"
          }
          onChange={(e) => {
            handleUpload(e);
          }}
        />
      </label>
    </div>
  );
};

export default UploadingImage;
