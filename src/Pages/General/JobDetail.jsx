import React, { useState }from "react";
import Loader from "../../Components/Loader";
import { Axios } from "../../utils/user.apicalls";
import Input from "../../Components/Input";
import Buttun from "../../Components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { deleteJob  } from "../../utils/user";
function JobDetail() {

    const { jobId } = useParams();
    const [role, setRole] = useState(null) // This is state I am using to diffrentiate between a Producer and a Freelancer.
    const navigate = useNavigate();
    const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  async function getRole(){
    Axios("https://retrocraft-backend.onrender.com/api/v1/user/getrole").then((response)=>{
      setRole(response.data.data.role);
    })
  }
  async function handleDelete(){
    console.log(jobId)
    deleteJob(jobId).then((r)=>{
      console.log("r", r);
      alert("Job deleted successfully")
      navigate(-1);
    }).catch((error)=>{
      alert("Could not delete job");
    })
  }
  async function getJob(){
    setLoading(true)
    Axios("https://retrocraft-backend.onrender.com/api/v1/user/getjobdetail",{ jobId }).then((response)=>{
        console.log(response)
        setJobDetails(response.data.data)
        setLoading(false)
    }).catch((error)=>{
        setLoading(false)
        console.log("Error", error);
    })
    
  }
  useState(()=>{
    getJob();
    getRole();
  },[])
  return (
    <>
    {loading && (<Loader/>)}
    <div className="overflow-x-hidden h-screen w-screen bg-black flex flex-col gap-10 items-center">
      
      <h1 className="font-bold text-4xl text-white mt-10">DESCRIPTION</h1>
      <form
        action=""
        method="post"
        id="job-form"
        className="text-white text-xl flex flex-col w-4/5 gap-3"
      >
        <Input
          label="Title"
          defaultValue={jobDetails?.jobprofile}
          name="title"
          id="title"
          options={["A", "B", "C", "D"]}
          inputClass="text-black outline-none text-xl w-[150px] p-2"
          divClass="flex gap-4 items-center"
          labelClass="w-[90px]"
          required={true}
          readOnly={true}
        />
        <Input
        defaultValue={jobDetails?.location}
          type="text"
          required={true}
          label="Location"
          name="location"
          id="location"
          divClass="flex gap-4 items-center"
          labelClass="w-[90px]"
          inputClass="w-[150px] outline-none text-black p-2"
          readOnly={true}
        />
        <Input
        defaultValue={jobDetails?.time}
          type="number"
          min={1}
          label="Time(in days)"
          name="time"
          id="time"
          divClass="flex gap-4 items-center"
          labelClass="w-[90px]"
          inputClass="w-[150px] outline-none text-black p-2"
          required={true}
          readOnly={true}
        />
        <Input
        defaultValue={jobDetails?.paygrade}
          label="Paygrade"
          name="paygrade"
          id="paygrade"
          inputClass="text-black outline-none text-xl w-[150px] p-2"
          divClass="flex gap-4 items-center"
          labelClass="w-[90px]"
          required={true}
          readOnly={true}
        />
        <div className="flex flex-col gap-4">
          <label htmlFor="jobdescription">Description</label>
          <textarea
          defaultValue={jobDetails?.jobDescription}
            name="jobdescription"
            id="jobdescription"
            rows="5"
            className="p-4 text-lg outline-none text-black"
            required
            readOnly={true}
          ></textarea>
        </div>
        <Buttun
          type="button"
          text="Go Back"
          className="px-3 py-1 text-red-600 bg-white rounded-md"
          onClick={()=>{
            navigate(-1)
          }}
        />
        {role=="Freelancer" && (<Buttun
          type="button"
          text="Apply"
          className="px-3 py-1 text-black bg-green-600 rounded-md"
        />)}
        {role=="Producer" &&(<Buttun
          type="button"
          text="Delete"
          className="px-3 py-1 text-black bg-red-600 rounded-md"
          onClick={handleDelete}
        />)}
        
      </form>
    </div>
    </>
  )
}

export default JobDetail;

