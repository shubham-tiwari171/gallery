import axios from "axios";

export const createUser = async (user) => {
  try {
    let result = await axios.post(" https://pixico.onrender.com/users", user);
    return result;
  } catch (e) {}
};

export const getAllImages = async (pageNo, imagesPerPage) => {
  try {
    let result = await axios.get(
      `https://pixico.onrender.com/images?_page=${pageNo}&_limit=${imagesPerPage}`
      // `https://pixico.onrender.com/images?q=${searchedText}`
    );
    return result;
  } catch (e) {}
};

export const getSearchedImages = async (
  pageNo,
  imagesPerPage,
  searchedText
) => {
  try {
    let result = await axios.get(
      // `https://pixico.onrender.com/images?_page=${pageNo}&_limit=${imagesPerPage}&q=${searchedText}`
      `https://api.unsplash.com/search/photos?page=${pageNo}&query=${searchedText}&client_id=QNpeykICsQORXG2RqN-Tb2FL10cs6gdjCBgVMnLAess`
    );
    return result.data.results;
    // return result;
  } catch (e) {}
};

export const getAllUser = async () => {
  try {
    let result = await axios.get("https://pixico.onrender.com/users");
    return result.data;
  } catch (e) {}
};

export const getUser = async (id) => {
  try {
    let result = await axios.get(`https://pixico.onrender.com/${id}`);
    return result.data;
  } catch (e) {}
};

export const updatUserProfile = async (id, user) => {
  try {
    let result = await axios.put(`https://pixico.onrender.com/${id}`, user);
    return result;
  } catch (e) {}
};
