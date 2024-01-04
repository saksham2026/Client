import React from "react";
import Navbar from "../../Components/Navbar";
import Buttun from "../../Components/Button";
import { Link } from "react-router-dom";
import "../../index.css";

function EntryPage() {
  return (
    <div className="bg-black h-screen w-screen flex flex-col gap-32 text-lg ">
      <Navbar />
      <div
        id="hero-section"
        className="flex items-center flex-col gap-2 sm:gap-4 text-2xl md:text-4xl"
      >
        <h1>Welcome to RetroCraftHub</h1>
        <h1>Connect with Producers</h1>
        <h1>& Freelancers</h1>
      </div>
      <div id="buttons" className="flex flex-col items-center ">
        <Link to="/login">
          <Buttun
            text="Login"
            className=" animate-login bg-black text-white font-bold px-4 py-2 w-44 rounded-t-lg rounded-b-none active:bg-green-800 active:ring active:ring-green-900"
          />
        </Link>

        <Link to="/register">
          <Buttun
            text="Get Started"
            className=" animate-register bg-black text-white font-bold px-4 py-2 w-44 rounded-t-none rounded-b-lg active:bg-green-800 active:ring active:ring-green-900"
          />
        </Link>
      </div>
    </div>
  );
}

export default EntryPage;
