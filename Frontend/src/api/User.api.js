import axiosInstance from "../utils/axiosInstance.js";

export const loginUser  = async (password , email)=>
{
    const {data} = await axiosInstance.post("/api/auth/login", {email , password})
    return data
}

export const registerUser  = async (name , password , email)=>
{
    const {data} = await axiosInstance.post("/api/auth/register", {name , email , password})
    return data
}

import axios from "axios";

export const logoutUser = async () => {
  const response = await axiosInstance.post("/api/auth/logout"); // or your logout endpoint
  console.log("Response: ", response)
  return response.data;
};

export const getCurrentUser = async()=>
{
    const {data} = await axiosInstance.get("/api/auth/me")
    return data;
}

export const getAllUserUrls = async ()=>
{
    const {data} = await axiosInstance.post("/api/user/urls")
    console.log("NEW DATA: ", data)
    return data;
}