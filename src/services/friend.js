import axios from "axios";
import CONFIG from "../config";

const token = localStorage.getItem("AUTH_TOKEN"); // get token once

export const sendFriendRequest = async (receiverId) => {
    try {
        const senderId = localStorage.getItem("userId");
        const response = await axios.post(
            `${CONFIG.API_URL}/friend/postrequest`,
            { senderId, receiverId },
            { headers: { Authorization: `Bearer ${token}` } } // include token
        );
        return response.data;
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Server error" };
    }
};

export const GetFriendRequests = async (userId) => {
    try {
        const response = await axios.get(`${CONFIG.API_URL}/friend/getrequests`, {
            params: { userId },
            headers: { Authorization: `Bearer ${token}` }
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
            `${CONFIG.API_URL}/friend/acceptrequest?requestId=${requestId}`,
            null,
            { headers: { Authorization: `Bearer ${token}` } }
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
            `${CONFIG.API_URL}/friend/rejectrequest?requestId=${requestId}`,
            null,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("Reject request failed:", error);
        return { success: false, message: "Server error" };
    }
};

export const getFriends = async (userId) => {
    try {
        const response = await axios.get(`${CONFIG.API_URL}/friend/getfriends`, {
            params: { userId },
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Fetching friends failed:", error);
        return { success: false, message: "Server error" };
    }
};

export const unfriend = async (friendId) => {
    try {
        const userId = localStorage.getItem("userId");
        const response = await axios.post(
            `${CONFIG.API_URL}/friend/unfriend?friendId=${friendId}&userId=${userId}`,
            null,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("Unfriend failed:", error);
        return { success: false, message: "Server error" };
    }
};
