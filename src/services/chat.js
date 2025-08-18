import axios from "axios";
import CONFIG from "../config";

const token = localStorage.getItem("AUTH_TOKEN"); // get JWT from localStorage

export const doGetChats = async (userId, friendId) => {
  try {
    const res = await axios.get(`${CONFIG.API_URL}/chat/get/${userId}/${friendId}`, {
      headers: { Authorization: `Bearer ${token}` } // add JWT header
    });

    return res.data.map((m) => ({
      ...m,
      key: `${m.timestamp}-${m.senderId}-${m.receiverId}`,
    }));
  } catch (err) {
    console.error("Failed to fetch messages:", err);
    return [];
  }
};

export const doSendMessage = async (senderId, receiverId, content) => {
  try {
    const message = { senderId, receiverId, content };
    await axios.post(`${CONFIG.API_URL}/chat/send`, message, {
      headers: { Authorization: `Bearer ${token}` } // add JWT header
    });
    return { success: true };
  } catch (err) {
    console.error("Failed to send message:", err);
    return { success: false, error: err.response?.data?.message || err.message };
  }
};
