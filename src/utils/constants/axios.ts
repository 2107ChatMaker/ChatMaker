import axios from "axios";


// an instance of AXIOS. use it to make fetch requests
const axiosInstance = axios.create(
    {

        // the base URL set in the .env file
        baseURL: process.env.BASEURL,

        // headers
        headers: {
            "Content-Type": "application/json",
        }
    }
);

export default axiosInstance;