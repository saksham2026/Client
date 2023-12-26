import React from "react";
import Navbar from "../../Components/Navbar";
import Input from "../../Components/Input";
import Select from "../../Components/Select";
import Buttun from "../../Components/Button";
import FormData from "form-data";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Loader from "../../Components/Loader";
import { useNavigate } from "react-router-dom";
function RegisterPage() {
    const navigate = useNavigate();
  function validateEmail() {
    let email = document.getElementById('email').value;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      return true;
    } else {
      alert('Invalid email format');
      return false;
    }
  }
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if(validateEmail()){
      if (
        document.querySelector("#password").value !==
        document.querySelector("#confirmPassword").value 
      ) {
        alert("Password and Confirm Password must be same");
      } else {
        setLoading(true);
        const formdata = new FormData(
          document.querySelector("#register-container")
        );
        axios
          .post("https://retrocraft-backend.onrender.com/api/v1/user/register", formdata, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            setLoading(false);
            navigate("/login");
            
          })
          .catch((error) => {
            if(error.response.status==410) alert("Username already taken.")
            if(error.response.status==409) alert("Email is already taken.")
            if(error.response.status==411) alert("Phone Number already taken")
            setLoading(false)});
      }
    }
    
  }

  return (
    <>
      {loading && <Loader />}

      <div className="bg-neutral-800 text-yellow-300 h-screen w-screen overflow-hidden flex flex-col items-center gap-8">
        <Navbar />
        <form
          id="register-container"
          className="px-3  flex flex-col gap-2 items-center w-full sm:w-3/5 lg:w-1/5 overflow-y-scroll"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-2xl text-green-400">Register</h1>
          <Input
            label="First Name"
            name="firstname"
            type="text"
            id="firstname"
            required={true}
            inputClass="bg-transparent border-green-800 border-2 outline-none text-xl px-2 py-1 sm:w-full rounded-lg"
            divClass="flex flex-col w-full"
          />
          <Input
            label="Last Name"
            name="lastname"
            type="text"
            id="lastname"
            required={true}
            inputClass="bg-transparent border-green-800 border-2 outline-none text-xl px-2 py-1 sm:w-full rounded-lg"
            divClass="flex flex-col w-full"
          />

          <Input
            label="Username"
            name="username"
            type="text"
            id="username"
            required={true}
            inputClass="bg-transparent border-green-800 border-2 outline-none text-xl px-2 py-1 sm:w-full rounded-lg"
            divClass="flex flex-col w-full"
          />
          <Input
            label="Email"
            name="email"
            type="text"
            id="email"
            required={true}
            inputClass="bg-transparent border-green-800 border-2 outline-none text-xl px-2 py-1 sm:w-full rounded-lg"
            divClass="flex flex-col w-full"
          />
          <Input
            label="Phone"
            name="mobile"
            type="tel"
            id="mobile"
            placeholder="+91 XXXXXXXXXX"
            pattern="+91 [0-9]{10}"
            required={true}
            inputClass="bg-transparent border-green-800 border-2 outline-none text-xl px-2 py-1 sm:w-full rounded-lg"
            divClass="flex flex-col w-full"
          />
          <Select
            label="Role"
            name="role"
            id="role"
            className="bg-transparent border-green-800 border-2 outline-none text-xl px-2 py-1 sm:w-full rounded-lg text-white"
            options={["Producer", "Freelancer"]}
            divClass="flex flex-col w-full"
            optionsClassname='bg-black'
          />
          <Input
            label="Password"
            type="password"
            name="password"
            id="password"
            required={true}
            inputClass="bg-transparent border-green-800 border-2 outline-none text-xl px-2 py-1 sm:w-full rounded-lg"
            divClass="flex flex-col w-full"
          />
          <Input
            label="Confirm"
            type="password"
            name="confirmpassword"
            id="confirmPassword"
            required={true}
            inputClass="bg-transparent border-green-800 border-2 outline-none text-xl px-2 py-1 sm:w-full rounded-lg"
            divClass="flex flex-col w-full"
          />
          <Input
            label="Upload Profile Image"
            type="file"
            name="avatar"
            divClass="flex flex-col w-full"
          />
          <Buttun
            text="Register"
            className="bg-green-600 text-white font-bold px-2 py-2 w-44 mt-3 rounded-md"
            type="submit"
          />
          <p>
            Already a user?{" "}
            <Link to="/login" className="font-bold ">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;
