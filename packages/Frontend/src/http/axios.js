import axios from "axios";
import { VITE_API_URL } from "../config/env";

const callAPI = async (method, url, data = {}, headers = {}) => {
  try {
    const options = {
      method,
      url: `${VITE_API_URL}${url}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
      withCredentials: true,
    };

    if (["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
      options.data = data;
    }

    const response = await axios(options);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "API request failed"
    );
  }
};

export default callAPI;
