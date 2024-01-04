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
    if (validateEmail()) {
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
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
          })
          .then((res) => {
            setLoading(false);
            navigate("/login");

          })
          .catch((error) => {
            if (error.response.status == 410) alert("Username already taken.")
            if (error.response.status == 409) alert("Email is already taken.")
            if (error.response.status == 411) alert("Phone Number already taken")
            setLoading(false)
          });
      }
    }

  }

  return (
    <>
      {loading && <Loader />}

      <div className="bg-neutral-950 text-yellow-300 h-screen w-screen overflow-hidden flex flex-col items-center gap-8 py-5">
        <Navbar />
        <form
          id="register-container"
          className="px-3 py-3 flex flex-col gap-2 items-center w-full sm:w-[350px] md:w-3/5 overflow-y-scroll border bg-neutral-950 border-gray-600"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-2xl text-green-400">Register</h1>
          <div className=" sm:flex flex-col md:grid md:grid-cols-2 md:gap-10">

            <Input
              label="First Name"
              name="firstname"
              type="text"
              id="firstname"
              required={true}
              inputClass="bg-transparent border-green-800 border-2 outline-none text-2xl px-2 py-2 sm:w-full"
              divClass="flex flex-col w-full gap-2"
              labelClass="font-bold text-2xl"
            />
            <Input
              label="Last Name"
              name="lastname"
              type="text"
              id="lastname"
              required={true}
              inputClass="bg-transparent border-green-800 border-2 outline-none text-2xl px-2 py-2 sm:w-full"
              divClass="flex flex-col w-full gap-2"

              labelClass="font-bold text-2xl"
            />

            <Input
              label="Username"
              name="username"
              type="text"
              id="username"
              required={true}
              inputClass="bg-transparent border-green-800 border-2 outline-none text-2xl px-2 py-2 sm:w-full"
              divClass="flex flex-col w-full gap-2"

              labelClass="font-bold text-2xl"
            />
            <Input
              label="Email"
              name="email"
              type="text"
              id="email"
              required={true}
              inputClass="bg-transparent border-green-800 border-2 outline-none text-2xl px-2 py-2 sm:w-full"
              divClass="flex flex-col w-full gap-2"

              labelClass="font-bold text-2xl"
            />
            <Input
              label="Phone"
              name="mobile"
              type="tel"
              id="mobile"
              placeholder="+91 XXXXXXXXXX"
              pattern="+91 [0-9]{10}"
              required={true}
              inputClass="bg-transparent border-green-800 border-2 outline-none text-2xl px-2 py-2 sm:w-full"
              divClass="flex flex-col w-full gap-2"

              labelClass="font-bold text-2xl"
            />
            <Select
              label="Role"
              name="role"
              id="role"
              className="bg-transparent border-green-800 border-2 outline-none text-2xl px-2 py-2 sm:w-full text-white"
              options={["Producer", "Freelancer"]}
              divClass="flex flex-col w-full gap-2"

              labelClass="font-bold text-2xl"
              optionsClassname='bg-black'
            />
            <Input
              label="Password"
              type="password"
              name="password"
              id="password"
              required={true}
              inputClass="bg-transparent border-green-800 border-2 outline-none text-2xl px-2 py-2 sm:w-full"
              divClass="flex flex-col w-full gap-2"

              labelClass="font-bold text-2xl"
            />
            <Input
              label="Confirm"
              type="password"
              name="confirmpassword"
              id="confirmPassword"
              required={true}
              inputClass="bg-transparent border-green-800 border-2 outline-none text-2xl px-2 py-2 sm:w-full"
              divClass="flex flex-col w-full gap-2"

              labelClass="font-bold text-2xl"
            />
          </div>
          <div id="profile-image">
            <Input
              id="profile"
              label="Upload Profile Image"
              type="file"
              name="avatar"
              divClass="flex flex-col w-full items-center gap-2"
            />
          </div>
          <Buttun
            text="Register"
            className="button-effect bg-green-600 text-white font-bold px-3 py-3 mt-3 w-[200px]"
            type="submit"
          />
          <p className="font-bold text-xl flex gap-2">
            Already a user?{" "}
            <div className="link-login">
            <Link to="/login" className="font-bold ">
              Login
            </Link>
            </div>
          </p>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;
