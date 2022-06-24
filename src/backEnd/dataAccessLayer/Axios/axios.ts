import axios from "axios";

// an instance of AXIOS. use it to make fetch requests
export const axiosIntance = axios.create(
    {
        // the base URL set in the .env file
        baseURL: process.env.BASEURL,
        // network time-out
        timeout: 1000
    }
);