import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/user.js";
import Loader from "../../Components/Loader.jsx";
import ProducerDashboard from "../ProducerPages/ProducerDashboard.jsx";
import FreelancerDashboard from "../FreelancerPages/FreelancerDashboard.jsx";
function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // This is for Loader component optional rendering.
  const [user, setUser] = useState(null);
  useEffect(()=>{
    getUser()
      .then((response) => {
        console.log("Hello",response);
        setUser(response.user)
        setLoading(false);
      })
      .catch((error) => {
        console.log("error",error);
        setLoading(false);
        navigate("/login");
      });
  },[])
  return (
    <>
    {loading && <Loader/>}
    {user?.role==="Producer" &&(<ProducerDashboard/>)}
    {user?.role==="Freelancer" &&(<FreelancerDashboard/>)}
    </>
  )
}

export default Dashboard;
