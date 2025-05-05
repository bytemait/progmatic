import axios from "axios";
import { login } from "../store/userSlice";
import { AppDispatch } from "../store/store";

export const loginUser = async (dispatch: AppDispatch) => {
  try {
    // Fetch user data from backend `/getUserData`
    const response = await axios.get("/getUserData", {
      withCredentials: true, // Include cookies if necessary
    });

    const userData = response.data;

    // Dispatch login action with modified user data
    dispatch(login({ user: userData, role: userData.site_admin ? "admin" : "user" }));
  } catch (error) {
    console.error("Login error:", error);
  }
};
