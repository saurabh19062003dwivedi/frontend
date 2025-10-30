 import axios from "axios";

// // 1. बेस URL .env से लें, या डिफ़ॉल्ट के रूप में HTTP://localhost:4000
 const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

// const axiosInstance = axios.create({
//   baseURL: BASE_URL, // .env वैल्यू या डिफ़ॉल्ट URL
//   // headers: {
//   //   "Content-Type": "application/json",
//   // },
//   withCredentials: true, // CORS के लिए आवश्यक
//   timeout: 10000, // 10 सेकंड का टाइमआउट
// });

// // 2. बेहतर एरर हैंडलिंग
// export const apiConnector = async (method, url, bodyData, headers, params) => {
//   try {
//     const response = await axiosInstance({
//       method: method.toUpperCase(),
//       url: url,
//       data: bodyData ,
//       headers: headers || {},
//       params: params ,
//     });
//     return response;
//   } catch (error) {
//     console.error("API Error:", error);
//     throw error; // कॉलिंग कंपोनेंट में हैंडल करें
//   }
// };
//import axios from "axios";
// import { BASE_URL } from "../utils/constants";

// Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

// API connector function
export const apiConnector = async (
  method,
  url,
  bodyData,
  headers = {},
  params = {}
) => {
  try {
    const isFormData = bodyData instanceof FormData;

    const response = await axiosInstance({
      method: method.toUpperCase(),
      url: url,
      data: bodyData,
      headers: {
        ...headers,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
      params: params,
    });

    return response.data;
  } catch (error) {
    console.log("API Error: ", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Something went wrong",
    };
  }
};
