import axios from "axios";
import CONFIG from "../config";

export const getUsers = async () => {
    try {
        const adminId = localStorage.getItem("userId");
        const token = localStorage.getItem("AUTH_TOKEN");
        const response = await axios.get(
            `${CONFIG.API_URL}/admin/users`,
            {
                params: { adminId },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error("Error fetching users:", error);
        return {
            success: false,
            error: error.message || "Unknown error",
        };
    }
};

export const getReports = async () => {
    try {
        const token = localStorage.getItem("AUTH_TOKEN");
        const response = await axios.get(
            `${CONFIG.API_URL}/admin/allreports`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error("Error fetching users:", error);
        return {
            success: false,
            error: error.message || "Unknown error",
        };
    }
};



export const deleteUser = async (id) => {
    try {
        const token = localStorage.getItem("AUTH_TOKEN");
        const response = await axios.delete(
            `${CONFIG.API_URL}/admin/deleteuser/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
    
        return {
            success: true,
            data: response.data,
        };
    }catch (error) {
    console.error("Error fetching users:", error);
    return {
        success: false,
        error: error.message || "Unknown error",
    };
}
};

export const deletePost = async (id) => {
    try {
        const token = localStorage.getItem("AUTH_TOKEN");
        const response = await axios.delete(
            `${CONFIG.API_URL}/admin/deletepost/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
    
        return {
            success: true,
            data: response.data,
        };
    }catch (error) {
    console.error("Error fetching users:", error);
    return {
        success: false,
        error: error.message || "Unknown error",
    };
}
};

export const dismissReport = async (id) => {
    try {
        const token = localStorage.getItem("AUTH_TOKEN");
        const response = await axios.delete(
            `${CONFIG.API_URL}/admin/deletereport/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
    
        return {
            success: true,
            data: response.data,
        };
    }catch (error) {
    console.error("Error fetching users:", error);
    return {
        success: false,
        error: error.message || "Unknown error",
    };
}
};