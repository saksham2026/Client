import axios from "axios";
const Axios = async (url, formdata) => {
  const response = await axios.post(url, formdata, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });
  return response;
};

export { Axios };
