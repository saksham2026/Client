import axios from "axios";

async function getUser(){
    const response = await axios.post("https://retrocraft-backend.onrender.com/api/v1/user/getuser", {}, {withCredentials: true});
    return response.data.data;
}

async function deleteJob(jobId){
    const response = await axios.post("https://retrocraft-backend.onrender.com/api/v1/user/deletejob",{ jobId },{ withCredentials: true});
    return response;
}
export { getUser, deleteJob};