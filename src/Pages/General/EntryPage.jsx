import React from "react";
import Navbar from "../../Components/Navbar";
import Buttun from "../../Components/Button";
import { Link } from "react-router-dom";

function EntryPage() {
  return (
    <div className="bg-green-100 h-screen w-screen flex flex-col gap-32 text-lg ">
      <Navbar />
      <div
        id="hero-section"
        className="font-bold flex items-center flex-col gap-2 sm:gap-4 font-mono sm:text-2xl"
      >
        <h1>Welcome to RetroCraftHub</h1>
        <h1>Connect with Producers</h1>
        <h1>& Freelancers</h1>
      </div>
      <div id="buttons" className="flex flex-col gap-3 items-center ">
        <Link to="/login">
          <Buttun
            text="Login"
            className="bg-green-600 text-white font-bold px-4 py-2 w-44 rounded-md active:bg-green-800 active:ring active:ring-green-900"
          />
        </Link>

        <Link to="/register">
          <Buttun
            text="Get Started"
            className="bg-green-600 text-white font-bold px-4 py-2 w-44 rounded-md active:bg-green-800 active:ring active:ring-green-900"
          />
        </Link>
      </div>
    </div>
  );
}

export default EntryPage;
