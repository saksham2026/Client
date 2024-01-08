import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Buttun from "../../Components/Button";
import { useState } from "react";
import { Axios } from "../../utils/user.apicalls";
import Loader from "../../Components/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function ProducerDashboard() {
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    axios
      .post(
        "https://retrocraft-backend/api/v1/user/getproposals",
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("Proposals", response);
        setNotifications(response.data.data.length);
      });
  }, []);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [freelancers, setFreelancers] = useState([]);
  const [producers, setProducers] = useState([]);
  const [jobs, setJobs] = useState([]);
  async function getUser() {
    setLoading(true);
    Axios("https://retrocraft-backend/api/v1/user/getuser")
      .then((response) => {
        setImage(response.data.data.user.avatarUrl);
      })
      .catch((error) => {
        navigate("/login");
      });
  }

  async function getProducersAndFreelancers() {
    Axios("https://retrocraft-backend/api/v1/user/getproducersandfreelancers", {
      withCredentials: true,
    }).then((response) => {
      setFreelancers(response.data.data.freelancers);
      setProducers(response.data.data.producers);
    });
  }

  async function getJobs() {
    Axios("https://retrocraft-backend/api/v1/user/getjobs")
      .then((response) => {
        setJobs(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Hi", error);
        setLoading(false);
      });
  }

  useEffect(() => {
    async function get() {
      await getUser();
      await getProducersAndFreelancers();
      await getJobs();
    }
    get();
  }, []);
  return (
    <>
      {loading && <Loader />}
      <div className="bg-black h-screen w-screen text-white flex flex-col items-center gap-8 overflow-y-scoll overflow-x-hidden pb-5">
        <nav className="h-[90px] w-screen bg-white text-black flex items-center gap-[20px] p-2">
          <img
            src={image}
            alt=""
            className="h-[70px] w-[70px] rounded-full object-cover"
          />
          <div className="flex items-center gap-4">
            <Link
              to="/profile"
              className="cursor-pointer bg-black rounded-xl text-white px-2 py-1 font-bold"
            >
              Profile
            </Link>
            <div
              id="notifications"
              className="relative flex items-center justify-center"
            >
              <Link to="/producernot">
                <i
                  className="fa-regular fa-bell text-3xl"
                  style={{ color: "#000000" }}
                ></i>
              </Link>
              {notifications != 0 && (
                <div className="w-[19px] h-[19px] rounded-full top-[-5px] right-[-4px] bg-red-600 absolute flex items-center justify-center text-white">
                  {notifications}
                </div>
              )}
            </div>
          </div>
        </nav>
        {jobs != [] && (
          <div className="flex flex-col items-center gap-5 w-full">
            <h1 className="font-bold text-4xl mt-[20px]">My Jobs</h1>
            <div
              id="my-jobs-container"
              className="w-[300px] h-[300px] md:w-4/5 flex overflow-x-scroll gap-10 items-center"
            >
              <Link to="/postjob">
                <div
                  id="job-cards"
                  className="h-[200px] w-[200px] bg-white rounded-md text-black flex flex-col items-center justify-center gap-7"
                >
                  <h1 className="w-[200px] flex justify-center font-bold text-3xl">
                    POST JOB
                  </h1>
                  <i
                    class="fa-solid fa-plus"
                    style={{ color: "#000000", fontSize: "4rem" }}
                  ></i>
                </div>
              </Link>

              {Array.from(jobs).map((element, index) => {
                return (
                  <Link to={`/job/${element._id}`}>
                    <div
                      key={element._id}
                      className="h-[200px] w-[200px] bg-white border rounded-md text-black flex flex-col items-center gap-7 hover:scale-105 transform transition duration-80"
                    >
                      <h1>Job Description</h1>
                      <ul className="w-[200px] flex flex-col gap-2 px-4">
                        <li>Title:{" " + element.jobprofile}</li>
                        <li>Location:{" " + element.location}</li>
                        <li>Paygrade:{" " + element.paygrade}</li>
                        <li>Time(in d):{" " + element.time}</li>
                      </ul>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
        {freelancers != [] && (
          <div className="flex flex-col items-center gap-5 w-full">
            <h1 className="font-bold text-4xl">Freelancers</h1>
            <div
              id="freelancers-container"
              className="w-[300px] h-[300px] flex md:w-4/5 overflow-x-scroll overflow-y-hidden gap-10 items-center px-3"
            >
              {Array.from(freelancers).map((element, index) => {
                return (
                  <>
                    {!element && <Loader />}
                    <div
                      key={element._id}
                      className="h-[200px] w-[200px] bg-white rounded-md text-black flex flex-col items-center gap-7 hover:scale-105 transform transition duration-80"
                    >
                      <Link to={`/freelancer/${element.username}`}>
                        <div className="w-[200px] flex flex-col gap-2 p-4 items-center">
                          <h1>
                            {element.firstname.toUpperCase() +
                              " " +
                              element.lastname.toUpperCase()}
                          </h1>
                          <img
                            src={element.avatarUrl}
                            alt=""
                            className="border h-[120px] w-[120px] rounded-full object-cover"
                          />
                        </div>
                      </Link>
                      <Buttun text="More Info" />
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex flex-col items-center gap-5 w-full">
          <h1 className="font-bold text-4xl">Producers</h1>
          <div
            id="freelancers-container"
            className="w-[300px] h-[200px] md:w-4/5 flex  overflow-x-scroll overflow-y-hidden gap-10"
          >
            {Array.from(producers).map((element, index) => {
              return (
                <>
                  {!element && <Loader />}
                  <div
                    key={element._id}
                    className="h-[200px] w-[200px] bg-white rounded-md text-black flex flex-col items-center gap-7"
                  >
                    <Link to={`/producer/${element.username}`}>
                      <div className="w-[200px] flex flex-col gap-2 p-4 items-center">
                        <h1>
                          {element.firstname.toUpperCase() +
                            " " +
                            element.lastname.toUpperCase()}
                        </h1>
                        <img
                          src={element.avatarUrl}
                          alt=""
                          className="border h-[120px] w-[120px] rounded-full object-cover"
                        />
                      </div>
                    </Link>
                    <Buttun text="More Info" />
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProducerDashboard;
