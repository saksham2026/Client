import React from "react";
import Input from "../../Components/Input";
import Buttun from "../../Components/Button";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const formdata = new FormData(document.querySelector("#auth-input"));

    axios
      .post("https://retrocraft-backend.onrender.com/api/v1/user/login", formdata, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      })
      .then((res) => {
        document.querySelector("#login-heading").innerText == "Login Successfull !!"
        setLoading(false);
        if(res.data.statusCode==200){
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        setLoading(false);
        if(error.response.status == 405) {
          alert("You need to Register first");
          navigate("/register")
        }
        console.log(error);
      });
  }

  return (
    <>
      {loading && <Loader />}
      <div className="bg-neutral-900 h-screen w-screen sm:text-xl md:text-2xl items-center flex flex-col gap-5 text-yellow-300">
        <Navbar />
        <div id="login-container" className="flex flex-col items-center py-10 border border-gray-600 rounded-md bg-neutral-950 w-[220px] sm:w-[300px] md:w-[500px] ">
          <h1 id='login-heading'>Login</h1>
          <form
            id="auth-input"
            className="flex flex-col px-2 items-center gap-3 mt-4 w-full"
            onSubmit={handleSubmit}
          >
            <Input
              label="Username"
              id="username"
              name="username"
              type="username"
              required={true}
              placeholder="Your username"
              inputClass="bg-transparent border-green-800 border-2 outline-none text-2xl px-2 py-2 sm:w-full"
              divClass="flex flex-col w-full"
              labelClass="font-bold text-2xl"
            />
            
            <Input
              label="Password"
              type="password"
              name="password"
              id="password"
              required={true}
              inputClass="bg-transparent border-green-800 border-2 outline-none text-2xl px-2 py-2 sm:w-full"
              divClass="flex flex-col w-full"
              labelClass="font-bold text-2xl"
            />
            <Buttun
              text="Login"
              type="Submit"
              className="mt-10 outline-none bg-green-600 text-white text-2xl rounded w-[150px] p-3"
            />
            <p>
              Don't have a account?{" "}
              <Link to="/register" className="font-bold outline-none">
                Get Started
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
