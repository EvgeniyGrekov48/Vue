import type {AxiosInstance, CreateAxiosDefaults} from "axios";
import axios from "axios";

const config: CreateAxiosDefaults = {
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json",
    }
} as CreateAxiosDefaults;
const apiClient: AxiosInstance = axios.create(config);

export default apiClient;