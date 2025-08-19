import axios from "axios";
import CONFIG from "../config";


export const doReport = async (postId,userId) => {
  try {


    const res = await axios.post(`${CONFIG.API_URL}/post/report`, null, {
      headers: { Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}` },
      params: { postId:postId, userId: userId }
    });

    if (res.data.success) {
        return { success: true, data: res.data };
    } 
  } catch (err) {
    const message =
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Report failed";
    return { success: false, error: message };
  }
};

