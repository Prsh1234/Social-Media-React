import axios from "axios";
import CONFIG from "../config";

export const sendFriendRequest = async (receiverId) => {
    try {
        const senderId = localStorage.getItem("userId");
        const response = await axios.post(`${CONFIG.API_URL}/friend/postrequest`, { senderId, receiverId });
        return response.data; // { success: true/false, message: "..." }
    } catch (error) {
        return { success: false, message: error.response.data.message };
    }
};

export const GetFriendRequests = async (userId) => {
    try {
        const response = await axios.get(`${CONFIG.API_URL}/friend/getrequests`, {
            params: { userId: userId } // ✅ Correct way to send query params
        });
        return response.data; 
    } catch (error) {
        console.error("Fetching friend requests failed:", error);
        return { success: false, message: "Server error" };
    }
};


export const acceptFriendRequest = async (requestId) => {
    try {
        const response = await axios.post(
            `${CONFIG.API_URL}/friend/acceptrequest?requestId=${requestId}`
        );
        return response.data;
    } catch (error) {
        console.error("Accept request failed:", error);
        return { success: false, message: "Server error" };
    }
};

export const rejectFriendRequest = async (requestId) => {
    try {
        const response = await axios.post(
            `${CONFIG.API_URL}/friend/rejectrequest?requestId=${requestId}`
        );
        return response.data; // { success: true/false, message: "..." }
    } catch (error) {
        console.error("Reject request failed:", error);
        return { success: false, message: "Server error" };
    }
};
