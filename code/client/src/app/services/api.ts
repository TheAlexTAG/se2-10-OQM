import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api/",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const getUserInfo = async () => {
  try {
    const response = await api.get("/sessions/current");
    return response.data;
  } catch (err: any) {
    const errDetails = err.response?.data;
    throw new Error(
      errDetails?.error
        ? errDetails.error
        : errDetails?.errors?.[0]?.msg || "Unknown error"
    );
  }
};

const login = async (username: string, password: string) => {
  const response = await api.post("/sessions", { username, password });
  return response.data;
};

const logout = async () => {
  const response = await api.delete("/sessions/current");
  return response.data;
};

const getAllServices = async () => {
  try {
    const response = await axios.get(`/getAllServices`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch services:", error);
    throw error;
  }
};

const addTicket = async (serviceName: string) => {
  try {
    const response = await axios.post(`/addTicket`, { serviceName });
    return response.data;
  } catch (error) {
    console.error("Failed to add ticket:", error);
    throw error;
  }
};

const getAllTickets = async () => {
  try {
    const response = await axios.get(`/getAllTickets`);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch tickets:", error);
    throw error;
  }
};

const API = {
  getUserInfo,
  login,
  logout,
  getAllServices,
  addTicket,
  getAllTickets,
};

export default API;
