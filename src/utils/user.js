import axios from "axios";

async function getUser(){
    const response = await axios.post("https://retrocraft-backend.onrender.com/api/v1/user/getuser", {}, {headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },withCredentials: true});
    return response.data.data;
}

async function deleteJob(jobId){
    const response = await axios.post("https://retrocraft-backend.onrender.com/api/v1/user/deletejob",{ jobId },{ headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },withCredentials: true});
    return response;
}
export { getUser, deleteJob};