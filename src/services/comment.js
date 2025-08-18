import axios from "axios";
import CONFIG from "../config";

const token = localStorage.getItem("AUTH_TOKEN"); // get token once

export const doGetComments = async (postId) => {
  try {
    const res = await axios.get(`${CONFIG.API_URL}/comment/getcomment`, {
      params: { postId },
      headers: { Authorization: `Bearer ${token}` } // include JWT
    });
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || err.message };
  }
};

export const doPostComment = async (postId, text) => {
  try {
    const userId = localStorage.getItem("userId");
    const res = await axios.post(
      `${CONFIG.API_URL}/comment/addcomment`,
      { postId, userId, text },
      { headers: { Authorization: `Bearer ${token}` } } // include JWT
    );
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || err.message };
  }
};
