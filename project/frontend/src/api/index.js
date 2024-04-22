// setup axios
import { notification } from "antd";
import axios from "axios";
import { Toast } from "react-bootstrap";

const BASE_URL = "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem("compileTokenApp");
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
});

apiClient.interceptors.response.use(undefined, (error) => {
  // Errors handling
  try {
    const { response } = error;
    const { data } = response;
    if (data) {
      if (data.status !== 200 || data.status !== 201) {
        notification.error({
          message: "Error",
          description: data.message,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

export default apiClient;
