import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Buttun from "../../Components/Button";
import { useState } from "react";
import { Axios } from "../../utils/user.apicalls";
import axios from "axios";
import Loader from "../../Components/Loader";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";
import Select from "../../Components/Select";
function FreelancerDashboard() {
  const [jobLoading, setJobLoading] = useState(false);
  const [filter, setFilter] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [freelancers, setFreelancers] = useState([]);
  const [producers, setProducers] = useState([]);
  const [jobs, setJobs] = useState([]);

  // Getting User from Backend
  async function getUser() {
    setLoading(true);
    Axios("https://retrocraft-backend.onrender.com/api/v1/user/getuser")
      .then((response) => {
        setImage(response.data.data.user.avatarUrl);
      })
      .catch((error) => {
        navigate("/login");
      });
  }

  // Handling Filter
  function handleFilter() {
    setFilter(!filter);
  }

  // Cancel filter for jobs
  function handleCancel() {
    setFilter(!filter);
  }

  // Getting jobs after filtering
  function handleSubmit(event) {
    setFilter(false);
    setJobLoading(true);
    event.preventDefault();
    console.log("Saksham");
    const formdata = new FormData(document.querySelector("#filters"));
    axios
      .post(
        "https://retrocraft-backend.onrender.com/api/v1/user/filterjobs",
        formdata,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setJobLoading(false);
        console.log(response);
        setJobs(response.data.data);
      })
      .catch((error) => {
        alert("Can not filter the jobs. Sorry!");
        setJobLoading(false);
      });
  }

  // Getting producers and freelancers for the freelancer feed .
  async function getProducersAndFreelancers() {
    Axios(
      "https://retrocraft-backend.onrender.com/api/v1/user/getproducersandfreelancers",
      {
        withCredentials: true,
      }
    ).then((response) => {
      setFreelancers(response.data.data.freelancers);
      setProducers(response.data.data.producers);
    });
  }

  // Getting all the available jobs.
  async function getAllJobs() {
    Axios("https://retrocraft-backend.onrender.com/api/v1/user/getalljobs")
      .then((response) => {
        console.log("Jobs", response);
        setJobs(response.data.data);
        console.log("array", jobs);
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
      await getAllJobs();
    }
    get();
  }, []);

  return (
    <>
      {/* // This is the loader for our website. */}
      {loading && <Loader />}
      {/* // It is being rendered conditionally between server request and response.
      // Overlay for filter starts */}
      {filter && (
        <div className="absolute bg-black h-screen w-screen flex flex-col items-center p-5">
          <div id="toggle" className="w-full flex h-[60px] justify-end pl-2">
            <Buttun
              text="Cancel"
              className="p-1 bg-red-600 rounded-md text-white"
              onClick={handleCancel}
            />
          </div>

          <form
            id="filters"
            className="border w-full flex flex-col items-center text-white gap-5"
            method="post"
            onSubmit={handleSubmit}
          >
            {/* // Filter for job profile */}
            <Select
              label="Job Profile"
              name="jobprofile"
              id="jobprofile"
              options={["A", "B", "C", "D"]}
              divClass="flex items-center gap-5"
              className="w-[150px] bg-white text-black outline-none"
              labelClass="w-[150px] text-whie font-bold"
            />
            {/* // Filter for pay grade */}
            <Select
              label="Paygrade"
              name="paygrade"
              id="paygrade"
              options={[">= A", ">= B", ">= C", ">= D"]}
              divClass="flex items-center gap-5 "
              className="w-[150px] bg-white text-black outline-none"
              labelClass="w-[150px] text-whie font-bold"
            />
            {/* // Filter for duration of the jobs */}
            <Select
              label="Duration(in d <=)"
              name="duration"
              id="duration"
              type="number"
              options={[20, 50, 90, 120]}
              divClass="flex items-center gap-5 "
              className="w-[150px] bg-white text-black outline-none"
              labelClass="w-[150px] text-whie font-bold"
            />
            <div
              id="apply"
              className="flex w-full justify-center h-[60px] items-center"
            >
              <Buttun
                text="Apply"
                type="submit"
                className="bg-green-600 text-white p-1 rounded"
              />
            </div>
          </form>
        </div>
      )}
      {/* // Overlay for filter ends // Code for the FreelancerDashboard */}
      <div className="bg-black h-screen w-screen text-white flex flex-col items-center gap-8 overflow-y-scoll overflow-x-hidden pb-5">
        <nav className="h-[90px] w-screen bg-white text-black flex items-center gap-[20px] p-2">
          {" "}
          {/* // Navbar // Image of the freelancer. */}
          <img
            src={image}
            alt=""
            className="h-[70px] w-[70px] rounded-full object-cover"
          />
          {/* // Utility options in the Navbar */}
          <div className="flex items-center gap-3">
            <Link
              to="/profile"
              className="cursor-pointer bg-black rounded-xl text-white px-2 py-1 font-bold"
            >
              Profile
            </Link>
            <Buttun
              type="button"
              text="Filter Jobs"
              onClick={handleFilter}
              className="px-2 cursor-pointer bg-black rounded text-white p-2"
            />
          </div>
          {/* // Navbar ends here. */}
        </nav>
        {/* // This is the new jobs feild. This will contain all the jobs available. */}
        <div className="flex flex-col items-center gap-5 w-full">
          <h1 className="font-bold text-4xl">{`${
            !loading && !jobLoading
              ? `${Array.from(jobs).length == 0 ? "No Jobs" : "New Jobs"}`
              : "Finding"
          }`}</h1>
          <div
            id="my-jobs-container"
            className="w-[300px] h-[200px] md:w-4/5 flex overflow-x-scroll gap-10"
          >
            {Array.from(jobs).length != 0 &&
              !jobLoading &&
              Array.from(jobs).map((element, index) => {
                return (
                  <Link to={`/job/${element._id}`}>
                    <div
                      key={element._id}
                      className="h-[200px] w-[200px] bg-white border rounded-md text-black flex flex-col items-center gap-7"
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
          {/* // The jobs container ends here. */}
        </div>
        {/* // This is the container which list the other freelancers that are on
        our site. */}
        <div className="flex flex-col items-center gap-5 w-full">
          <h1 className="font-bold text-4xl">Freelancers</h1>
          <div
            id="freelancers-container"
            className="w-[300px] h-[200px] flex md:w-4/5 overflow-x-scroll overflow-y-hidden gap-10"
          >
            {Array.from(freelancers).map((element, index) => {
              return (
                <>
                  {!element && <Loader />}
                  <div
                    key={element._id}
                    className="h-[200px] w-[200px] bg-white rounded-md text-black flex flex-col items-center gap-7"
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
          {/* // Freelancer container ends here. */}
        </div>
        {/* // This is the container where the freelancer can see the producers
        available on the site. */}
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
          {/* // Producer containers ends here. */}
        </div>
      </div>
    </>
  );
}

export default FreelancerDashboard;
