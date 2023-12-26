import React from "react";
import axios from "axios";
import Input from "./Input";
import FormData from "form-data";
import Buttun from "./Button";
import Loader from "./Loader";
import { useState } from "react";
function ImageUpload(props) {
  const [loading, setLoading] = useState(false);
  function handleFileUplaod(event) {
    setLoading(true)
    event.preventDefault();
    const formdata = new FormData(document.querySelector("#imageupload"));
    confirm("Do you want to update Image?");
    axios
      .post(props.url, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        setLoading(false);
        window.location.reload();
        console.log(response);
      })
      .catch((error) => {
        window.location.reload();
        setLoading(false);
      });
  }
  return (
    <>
      <form
        id="imageupload"
        className="absolute bg-gray-950 opacity-80 h-screen w-screen z-10 flex flex-col gap-10 items-center justify-center text-white"
        method="post"
        onSubmit={handleFileUplaod}
      >
        <Input
          required="true"
          type="file"
          label="Profile"
          name="avatar"
          id="avatar"
        />
        <div className="flex items-center gap-10">
        <Buttun
          text="Upload"
          className="bg-green-600 rounded-md px-3 py-1 text-black opacity-100"
        />
        <Buttun
          text="Cancel"
          className="bg-red-600 rounded-md px-3 py-1 opacity-100 text-white"
          type="button"
        />
        </div>
      </form>
    </>
  );
}

export default ImageUpload;
