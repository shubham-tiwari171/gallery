import axios from "axios";
export const createUser = async (user) => {
  try {
    let result = await axios.post("http://localhost:4000/users", user);
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const getAllUser = async () => {
  try {
    let result = await axios.get("http://localhost:4000/users");
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async (id) => {
  try {
    let result = await axios.get(`http://localhost:4000/users/${id}`);
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

export const updatUserProfile = async (id, user) => {
  try {
    let result = await axios.put(`http://localhost:4000/users/${id}`, user);
    return result;
  } catch (e) {
    console.log(e);
  }
};
