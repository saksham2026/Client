import React from "react";
import FormData from "form-data";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Buttun from "../../Components/Button";
import Input from "../../Components/Input";
import { useParams } from "react-router-dom";
import { Axios } from "../../utils/user.apicalls";
import Loader from "../../Components/Loader";
import axios from "axios";
import classNames from "classnames";

const inputClass = classNames(
  "outline-none",
  "rounded-md",
  "text-black",
  "px-1",
  "py-1",
  "text-md",
  "w-[200px]"
);

const labelClass = classNames("text-xl", "w-[100px]");

const divClass = classNames("flex", "items-center", "gap-3");
function ContactPage() {
  const [name, setName] = useState("");
  const { username } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  async function getUser() {
    setLoading(true);
    Axios("https://retrocraft-backend.onrender.com//api/v1/user/getuser", {
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
        setName(
          response.data.data.user.firstname.toUpperCase() +
            " " +
            response.data.data.user.lastname.toUpperCase()
        );
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }

  useEffect(() => {
    getUser();
  }, []);
  async function handleSubmit(event) {
    event.preventDefault();
    const formdata = new FormData(document.querySelector("#contact-form"));
    await axios.post("https://retrocraft-backend.onrender.com/api/v1/user/sendmail", formdata, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response)=>{
        console.log(response);
    })
  }
  return (
    <div className="bg-black h-screen w-screen p-5 overflow-x-hidden overflow-y-scroll">
      {loading && <Loader />}
      <Buttun
        text="Go Back"
        className="px-2 py-1 bg-white flex items-center justify-center text-red-600 font-bold rounded-md mb-10"
        onClick={() => {
          navigate(-1);
        }}
      />
      <form
        onSubmit={handleSubmit}
        method="post"
        id="contact-form"
        className="border text-white flex flex-col justify-center gap-5"
      >
        <Input
          defaultValue={name}
          name="name"
          label="Name"
          id="name"
          type="text"
          inputClass={inputClass}
          divClass={divClass}
          labelClass={labelClass}
          required
        />
        <Input
          defaultValue={username}
          name="username"
          label="Username"
          id="username"
          type="text"
          inputClass={inputClass}
          divClass={divClass}
          labelClass={labelClass}
          required
        />
        <Input
          placeholder="Gmail Password"
          name="password"
          label="Gmail Password"
          id="password"
          type="text"
          inputClass={inputClass}
          divClass={divClass}
          labelClass={labelClass}
          required
        />
        <Input
          placeholder="Subject"
          name="subject"
          label="Subject"
          id="subject"
          type="text"
          inputClass={inputClass}
          divClass={divClass}
          labelClass={labelClass}
          required
        />
        <label htmlFor="message" className="text-xl">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          rows="10"
          className="p-4 text-black outline-none"
          required
        ></textarea>
        <div className="flex justify-center">
          <Buttun
            type="submit"
            text="Send"
            className="bg-white py-2 flex justify-center items-center text-black px-4 rounded-lg"
          />
        </div>
      </form>
    </div>
  );
}

export default ContactPage;
