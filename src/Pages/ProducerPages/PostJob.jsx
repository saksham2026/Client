import React from "react";
import FormData from "form-data";
import Loader from "../../Components/Loader";
import { useState, useEffect } from "react";
import { Axios } from "../../utils/user.apicalls";
import Input from "../../Components/Input";
import Buttun from "../../Components/Button";
import Select from "../../Components/Select";
import { useNavigate } from "react-router-dom";
import Loader2 from "../../Components/Loader2";
function PostJob() {
    const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();
    const formdata = new FormData(document.querySelector("#job-form"));
    Axios("https://retrocraft-backend.onrender.com/api/v1/user/postjob", formdata)
      .then((response) => {
        setLoading(false);
        navigate("/producerdashboard")
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }
  return (
    <div className="overflow-x-hidden h-screen w-screen bg-black flex flex-col gap-10 items-center">
      
      <h1 className="font-bold text-4xl text-white mt-10">JOB DETAILS FORM</h1>
      <form
        action=""
        method="post"
        onSubmit={handleSubmit}
        id="job-form"
        className="text-white text-xl flex flex-col w-4/5 gap-3"
      >
        <Select
          label="Title"
          name="title"
          id="title"
          options={["A", "B", "C", "D"]}
          className="text-black outline-none text-xl w-[150px] p-2"
          divClass="flex gap-4 items-center"
          labelClass="w-[90px]"
          required={true}
        />
        <Input
          type="text"
          required={true}
          label="Location"
          name="location"
          id="location"
          divClass="flex gap-4 items-center"
          labelClass="w-[90px]"
          inputClass="w-[150px] outline-none text-black p-2"
        />
        <Input
          type="number"
          min={1}
          label="Time(in days)"
          name="time"
          id="time"
          divClass="flex gap-4 items-center"
          labelClass="w-[90px]"
          inputClass="w-[150px] outline-none text-black p-2"
          required={true}
        />
        <Select
          label="Paygrade"
          name="paygrade"
          id="paygrade"
          options={["A", "B", "C", "D"]}
          className="text-black outline-none text-xl w-[150px] p-2"
          divClass="flex gap-4 items-center"
          labelClass="w-[90px]"
          required={true}
        />
        <div className="flex flex-col gap-4">
          <label htmlFor="jobdescription">Description</label>
          <textarea
            name="jobdescription"
            id="jobdescription"
            rows="5"
            className="p-4 text-lg outline-none text-black"
            required
          ></textarea>
        </div>
        <Buttun
          type="submit"
          text={!loading?"Post":<Loader2 />}
          className="px-3 py-1 text-green-600 bg-white rounded-md"
        />
        
        <Buttun
          type="button"
          text="Go Back"
          className="px-3 py-1 text-red-600 bg-white rounded-md"
          onClick={()=>{
            navigate(-1)
          }}
        />
      </form>
    </div>
  );
}

export default PostJob;
