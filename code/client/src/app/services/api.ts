/*import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

export default api;
*/
const BASE_URL = new URL("http://localhost:3001/api/");
const getUserInfo = async () => {
  try {
    const response = await fetch(BASE_URL + "users/sessions/current", {
      credentials: "include",
    });
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      const errDetails = await response.json();
      throw new Error(
        errDetails.error ? errDetails.error : errDetails.errors[0].msg
      );
    }
  } catch (err) {
    //console.error("Error fetching user: ", err);
    throw err;
  }
};

const API = { getUserInfo };

export default API;
