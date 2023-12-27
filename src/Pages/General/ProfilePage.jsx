import React, { useEffect } from "react";
import Buttun from "../../Components/Button";
import Input from "../../Components/Input";
import { useState } from "react";
import axios from "axios";
import FormData from "form-data";
import Loader from "../../Components/Loader";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../Components/ImageUpload";
import { Axios } from "../../utils/user.apicalls";
const containerClasses = classNames("relative", "group");
const imageClasses = classNames(
  "w-[200px]",
  "h-[200px]",
  "rounded-full",
  "object-cover",
  "cursor-pointer"
);

function ProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [uploadImageDialogue, setUploadImageDialogue] = useState(false);
  const [email, setEmail] = useState(null);
  const [firstname, setFirstName] = useState(null);
  const [lastname, setLastName] = useState(null);
  const [aboutme, setAboutMe] = useState(null);
  const [paygrade, setPaygrade] = useState(null);
  const [experience, setExperience] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [username, setUsername] = useState(null);
  const [awards, setAwards] = useState(null);
  const [role, setRole] = useState(null);
  const [edit, setEdit] = useState(false);
  const [jobprofile, setJobProfile] = useState(null);
  function handleCancel() {
    setUploadImageDialogue(false);
  }
  function handleFileUplaod(event) {
    setUploadImageDialogue(false);
    event.preventDefault();
    const formdata = new FormData(document.querySelector("#imageupload"));
    confirm("Do you want to update Image?");
    axios
      .post("https://retrocraft-backend.onrender.com/api/v1/user/updateavatar", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      })
      .then((response) => {
        setProfileImageUrl(response.data.data);
      })
      .catch((error) => {
        alert("Can not upload image");
        setLoading(false);
      });
  }

  async function getUser() {
    Axios("https://retrocraft-backend.onrender.com/api/v1/user/getuser")
      .then((response) => {
        console.log(response);

        setEmail(response.data.data.user.email);
        setFirstName(response.data.data.user.firstname.toUpperCase());
        setProfileImageUrl(response.data.data.user.avatarUrl);
        setLastName(response.data.data.user.lastname.toUpperCase());
        setRole(response.data.data.user.role);
        setPaygrade(response.data.data.about[0].paygrade);
        setExperience(response.data.data.about[0].experience);
        setUsername(response.data.data.user.username);
        setMobile(response.data.data.user.mobile);
        setAboutMe(response.data.data.about[0].about);
        setJobProfile(response.data.data.about[0].jobprofile);
        setLoading(false);
      })
      .catch((error) => {
        navigate("/login");
      });
  }
  function handleUploadImage() {
    setUploadImageDialogue(true);
  }
  useEffect(() => {
    getUser();
  }, []);
  function handleEdit() {
    setEdit(!edit);
  }
  function handleLogout(){
    Axios("https://retrocraft-backend.onrender.com/api/v1/user/logout").then((res)=>{
      window.location.reload();
    }).catch((error)=>{
      window.location.reload();
    })
  }
  function handleSave(e) {
    setLoading(true);
    e.preventDefault();
    const formdata = new FormData(document.querySelector("#profile"));
    axios
      .post("https://retrocraft-backend.onrender.com/api/v1/user/setuser", formdata, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }
  return (
    <>
      {loading && <Loader />}
      {uploadImageDialogue && (
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
                onClick={handleCancel}
              />
            </div>
          </form>
        </>
      )}
      <form
        className="bg-gray-800 text-white h-screen w-screen overflow-x-hidden flex flex-col gap-10 py-10 px-4"
        method="post"
        onSubmit={handleSave}
        id="profile"
        encType="application/json"
      >
        <div className={containerClasses}>
          <img
            src={`${profileImageUrl}`}
            alt="Profile Image"
            className={imageClasses}
            onClick={handleUploadImage}
          />

          <Buttun
            type="button"
            text="Logout"
            className=" px-2 py-1 bg-white text-red-600 rounded-md mt-10 font-bold"
            onClick={handleLogout}
          />
          <Buttun
            type="button"
            text="Go Back"
            className=" px-2 py-1 bg-white text-red-600 rounded-md mt-10 font-bold"
            onClick={()=>{
              if(role =="Producer") navigate("/producerdashboard");
              if(role =="Freelancer")  navigate("/freelancerdashboard");
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
              readOnly={!edit}
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
              required="true"
              readOnly={!edit}
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
              type="email"
              required="true"
              readOnly
              inputClass="text-white px-2 py-1 outline-none bg-gray-500 w-[200px] rounded-md"
              divClass="flex gap-2 items-center"
              labelClass="w-[110px]"
            />
            <Input
              label="Profession"
              name="role"
              id="role"
              defaultValue={role}
              type="text"
              readOnly
              inputClass="text-white px-2 py-1 outline-none bg-gray-500 w-[200px] rounded-md"
              divClass="flex gap-2 items-center"
              labelClass="w-[110px]"
            />
            { role==="Freelancer" && (<Input
              label="Profile"
              name="jobprofile"
              id="jobprofile"
              defaultValue={jobprofile}
              type="text"
              readOnly={!edit}
              inputClass="text-white px-2 py-1 outline-none bg-gray-500 w-[200px] rounded-md"
              divClass="flex gap-2 items-center"
              labelClass="w-[110px]"
            />)}
            { role==="Freelancer" && (<Input
              label="Paygrade"
              name="paygrade"
              id="paygrade"
              defaultValue={paygrade}
              type="text"
              readOnly={!edit}
              inputClass="text-white px-2 py-1 outline-none bg-gray-500 w-[200px] rounded-md"
              divClass="flex gap-2 items-center"
              labelClass="w-[110px]"
            />)}
            <Input
              label="Username"
              name="username"
              id="username"
              defaultValue={username}
              type="text"
              readOnly
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
            readOnly={!edit}
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
            readOnly={!edit}
            defaultValue={experience}
            minLength="50"
            maxLength="1500"
            name="experience"
            id="experience"
            cols="30"
            rows="5"
            className="border-black border w-[350px] font-semibold p-2 bg-gray-500 outline-none rounded-lg md:w-[500px]"
          ></textarea>

          <div id="edit-save" className="flex gap-4 justify-center">
            <Buttun
              text="Save"
              className={` bg-green-500 text-white px-3 py-1 w-[65px] h-[35px] rounded-lg ${
                !edit ? "opacity-50" : null
              } `}
              onClick={handleSave}
              type="submit"
            />
            <Buttun
              text={`${edit ? "Cancel" : "Edit"}`}
              className={`bg-red-600 text-white px-3 py-1 w-[65px] h-[35px] rounded-lg flex items-center justify-center`}
              onClick={handleEdit}
              type="button"
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default ProfilePage;
