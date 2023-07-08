import axios from "axios";
export const createUser = async (user) => {
  try {
    let result = await axios.post(" https://pixico.onrender.com/users", user);
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const getAllUser = async () => {
  try {
    let result = await axios.get("https://pixico.onrender.com/users");
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async (id) => {
  try {
    let result = await axios.get(`https://pixico.onrender.com/${id}`);
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

export const updatUserProfile = async (id, user) => {
  try {
    let result = await axios.put(`https://pixico.onrender.com/${id}`, user);
    return result;
  } catch (e) {
    console.log(e);
  }
};
