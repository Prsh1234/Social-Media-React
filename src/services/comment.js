import axios from "axios";
import CONFIG from "../config";

export const doGetComments = async (postId) => {
  try {
    const res = await axios.get(`${CONFIG.API_URL}/comment/getcomment?postId=${postId}`);
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const doPostComment = async (postId, text) => {
  try {
    const userId = localStorage.getItem("userId");
    const res = await axios.post(`${CONFIG.API_URL}/comment/addcomment`, { postId, userId, text });
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
