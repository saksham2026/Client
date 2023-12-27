import { useParams } from "react-router-dom";
import { Axios } from "../../utils/user.apicalls";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";
import Buttun from "../../Components/Button";
import Input from "../../Components/Input";
import classNames from "classnames";
const containerClasses = classNames("relative", "group");
const imageClasses = classNames(
  "w-[200px]",
  "h-[200px]",
  "rounded-full",
  "object-cover",
  "cursor-pointer"
);





function ProducerPovToOthers() {
    const { username } = useParams();
const navigate = useNavigate();
const [loading, setLoading] = useState(true);
const [profileImageUrl, setProfileImageUrl] = useState(null);
const [email, setEmail] = useState(null);
const [firstname, setFirstName] = useState(null);
const [lastname, setLastName] = useState(null);
const [aboutme, setAboutMe] = useState(null);
const [experience, setExperience] = useState(null);
const [mobile, setMobile] = useState(null);
const [job, setJobs] = useState([]);
async function getUser() {
    setLoading(true)
  Axios(
    "https://retrocraft-backend.onrender.com/api/v1/user/getuserwithusername",
    { username },
    { withCredentials: true }
  )
    .then((response) => {
      console.log("Hello",response);
      setEmail(response.data.data.personalDetails[0].email);
      setFirstName(
        response.data.data.personalDetails[0].firstname.toUpperCase()
      );
      setProfileImageUrl(response.data.data.personalDetails[0].avatarUrl);
      setLastName(response.data.data.personalDetails[0].lastname.toUpperCase());
      setMobile(response.data.data.personalDetails[0].mobile);
      setExperience(response.data.data.professionalDetails[0].experience);
      setAboutMe(response.data.data.professionalDetails[0].about);
      setLoading(false);
    })
    .catch((error) => {
        setLoading(false);
      console.log("error is: ", error);
    });
}
async function getJobs() {
  // This is  a api call for listing jobs afferred by the producer.
  Axios("https://retrocraft-backend.onrender.com/api/v1/user/getjobsbyusername",{ username })
    .then((response) => {
      console.log("Jobs", response);
      setJobs(response.data.data);
      console.log("array",job);
      setLoading(false);
    })
    .catch((error) => {
      console.log("Hi", error);
      setLoading(false);
    });
}

useEffect(() => {
    getUser();
    getJobs();
  }, []);

  return (
    <>
    {loading && (<Loader/>)}
      <form
        className="bg-gray-800 text-white h-screen w-screen overflow-x-hidden flex flex-col gap-10 py-10 px-4"
        method="post"
        id="profile"
        encType="application/json"
      >
        <div className={containerClasses}>
          <img
            src={`${profileImageUrl}`}
            alt="Profile Image"
            className={imageClasses}
          />
          <Buttun
            type="button"
            text="Go Back"
            className=" px-2 py-1 bg-white text-red-600 rounded-md mt-10 font-bold"
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
        <h1 className="font-bold text-3xl">{firstname + " " + lastname}</h1>
        <div id="personal-details" className="flex flex-col gap-5">
          <div id="names" className="flex flex-col  gap-5 px-4">
            <Input
              label="First Name"
              name="firstname"
              id="firstname"
              required="true"
              type="text"
              defaultValue={firstname}
              readOnly
              inputClass="text-white px-2 py-1 outline-none bg-gray-500 w-[200px] rounded-md"
              divClass="flex gap-2 items-center"
              labelClass="w-[110px]"
            />
            <Input
              label="Last Name"
              name="lastname"
              id="lastname"
              defaultValue={lastname}
              type="text"
              readOnly
              inputClass="text-white px-2 py-1 outline-none bg-gray-500 w-[200px] rounded-md"
              divClass="flex gap-2 items-center"
              labelClass="w-[110px]"
            />
          </div>
          <div id="names" className="flex flex-col  gap-5 px-4">
            <Input
              label="Email"
              name="email"
              id="email"
              defaultValue={email}
              readOnly
              type="email"
              inputClass="text-white px-2 py-1 outline-none bg-gray-500 w-[200px] rounded-md"
              divClass="flex gap-2 items-center"
              labelClass="w-[110px]"
            />
            <Input
              label="Mobile"
              name="mobile"
              id="mobile"
              defaultValue={mobile}
              type="text"
              readOnly
              inputClass="text-white px-2 py-1 outline-none bg-gray-500 w-[200px] rounded-md"
              divClass="flex gap-2 items-center"
              labelClass="w-[110px]"
            />
          </div>
        </div>
        <div id="aboutme" className="flex flex-col gap-5 items-center">
          <h3 className=" font-bold font-mono text-2xl">About Me</h3>
          <textarea
            readOnly
            defaultValue={aboutme}
            minLength="50"
            maxLength="1500"
            name="aboutme"
            id="aboutme"
            cols="30"
            rows="5"
            className="border-black border w-[350px] font-semibold p-2 bg-gray-500 outline-none rounded-lg md:w-[500px]"
          ></textarea>
          <h3 className=" font-bold font-mono text-2xl">Work Experience</h3>
          <textarea
            readOnly
            defaultValue={experience}
            minLength="50"
            maxLength="1500"
            name="experience"
            id="experience"
            cols="30"
            rows="5"
            className="border-black border w-[350px] font-semibold p-2 bg-gray-500 outline-none rounded-lg md:w-[500px]"
          ></textarea>
        </div>
      </form>
      <div className="flex flex-col items-center gap-5 w-full">
          <h1 className="font-bold text-4xl">Jobs</h1>
          <div
            id="my-jobs-container"
            className="w-[300px] h-[200px] md:w-4/5 flex overflow-x-scroll gap-10 bg-transparent"
          >

            {Array.from(job).map((element, index) => {
              return (
                <div
                  key={element._id}
                  className="h-[200px] w-[200px] border rounded-md text-black flex flex-col items-center gap-7 bg-white"
                >
                  <h1>Job Description</h1>
                  <ul className="w-[200px] flex flex-col gap-2 px-4">
                    <li>Title:{" " + element.jobprofile}</li>
                    <li>Location:{" " +element.location}</li>
                    <li>Paygrade:{" "+ element.paygrade}</li>
                    <li>Time(in d):{" " + element.time}</li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
    </>
  );
}

export default ProducerPovToOthers;
