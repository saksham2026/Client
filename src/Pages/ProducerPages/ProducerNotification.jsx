import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";
import Buttun from "../../Components/Button";

import { useToast } from "@chakra-ui/react";
function ProducerNotification() {
  const toast = useToast();
  const [notifications, setNotifications] = useState(null);
  const [loading, setLoading] = useState(false);

  // This is the api call for getting all the notifications.
  const getNotifications = async () => {
    setLoading(true);
    axios
      .post(
        "https://retrocraft-backend.onrender.com/api/v1/user/getproposals",
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setLoading(false);
        console.log("Notify", response.data.data);
        setNotifications(response.data.data);
      })
      .catch((error) => {
        // alert("Some error occurred");
      });
  };

  // This function is called, when the proposal is accepted.
  const handleAccept = async (event) => {
    axios
      .post(
        "https://retrocraft-backend.onrender.com/api/v1/user/accepted",
        {
          jobId: event.target.value,
          freelancer: event.target.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        toast({
          title: "Freelancer has been notified",
          description: "Proposal for Job accepted",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((error) => {
        console.log("Some error occurred", error);
        if (error.response.status) {
        }
      });
  };

  // This function is called, when the proposal is rejected.
  const handleReject = async (event) => {
    console.log(event.target);
    axios
      .post(
        "https://retrocraft-backend.onrender.com/api/v1/user/rejected",
        {
          jobId: event.target.value,
          freelancer: event.target.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("rejected", response);
        toast({
          title: "Proposal Rejected Successfully",
          description: "Proposal for Job rejected",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((error) => {
        toast({
          title: "Some error occurred while rejecting the Proposal",
          description: "Proposal could not be rejected",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };

  useEffect(() => {
    getNotifications();
  }, []);
  return (
    <>
    {(<div className="h-[100vh] w-[100vw] text-white bg-gray-950 gap-10 flex flex-col items-center p-8">
      <h1 className="font-bold text-3xl">NOTIFICATIONS</h1>

      <div className="notfication-container border w-[300px] bg-gray-950 rounded-xl h-[700px] overflow-y-scroll overflow-x-hidden pt-5 flex gap-5 items-center flex-col">
       {(notifications?.length == 0)&&<>No Notifications</>}
        {!(notifications?.length == 0) && notifications !== null &&
          Array.from(notifications).map((Element) => {
            return (
              <div
                id="notification"
                className="w-[80%] h-[50px] bg-white rounded-lg flex items-center gap-2 px-4"
              >
                <img
                  className="h-[40px] w-[40px] rounded-full"
                  src={Element.freelancer.avatarUrl}
                  alt=""
                />
                <div id="links" className="text-black flex flex-col ">
                  <Link
                    className="underline"
                    to={`/freelancer/${Element.freelancer.username}`}
                  >
                    Freelancer
                  </Link>
                  <Link className="underline" to={`/job/${Element.jobId._id}`}>
                    Job
                  </Link>
                </div>
                <div className="flex gap-2 items-center ml-3">
                  <Buttun
                    id={Element.freelancer._id}
                    value={Element.jobId._id}
                    className="h-[30px] w-[30px] text-md text-black font-bold bg-green-600 rounded-full flex items-center justify-center"
                    text="A"
                    onClick={handleAccept}
                  />
                  <Buttun
                    id={Element.freelancer._id}
                    value={Element.jobId._id}
                    className="h-[30px] w-[30px] text-md text-white font-bold bg-red-600 rounded-full flex items-center justify-center"
                    text="R"
                    onClick={handleReject}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>)}
    </>
  );
}

export default ProducerNotification;
