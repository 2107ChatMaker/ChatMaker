import axios from "axios";
import { env } from "process";

export const axiosIntance = axios.create(
    {
        baseURL: env.BASEURL,
        // network time-out
        timeout: 1000
    }
)

 