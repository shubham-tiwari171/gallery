import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import axios from "axios";
import { MdHome, MdExplore, MdLogout, MdLogin } from "react-icons/md";
import { RxPlus } from "react-icons/rx";
import { updatUserProfile } from "../../../api/apiEndpoint";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logout } from "../../../redux/reducers/reducers";
import { getUser } from "../../../api/apiEndpoint";
import { useNavigate } from "react-router-dom";
import { search } from "../../../redux/reducers/reducers";
import { getSearchedImages } from "../../../api/apiEndpoint";
const Header = () => {
  const [profile, setProfile] = useState({});
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { user, isUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const result = await getUser(user.id);
        setProfile(result);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [user.id]);

  const handleClick = () => {
    // Handle click logic
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSelectProfileImageClick = async (e) => {
    let pic = e.target.files[0];

    if (pic) {
      setProfile(URL.createObjectURL(pic));
      let updateUserProfile = {
        ...user,
        profileImage: URL.createObjectURL(pic),
      };

      dispatch(setUser(updateUserProfile));

      try {
        const response = await updatUserProfile(user.id, updateUserProfile);
        console.log(response.data);
      } catch (error) {
        console.error("Error updating user profile:", error);
      }
    }
  };

  const handleSerchedChange = (event) => {
    setSearchText(event.target.value);
    // console.log(event.target.value);
    // const response = await getSearchedImages(event.target.value);
    dispatch(search(event.target.value));
  };

  return (
    <>
      {/* Desktop view */}
      <div className={styles.navbar}>
        <div className={`${styles["menu-items"]} ${styles["icon-menu-items"]}`}>
          <img src="https://pngimg.com/d/pinterest_PNG62.png" alt="" />
        </div>
        <div className={styles["menu-items"]}>Home</div>
        <div
          className={styles["menu-items"]}
          onClick={() => navigate("/explore")}
        >
          Explore
        </div>
        <div className={styles["menu-items"]} onClick={handleClick}>
          Create
        </div>
        <div
          className={`${styles["menu-items"]} ${styles["search-menu-items"]}`}
          style={{ flexGrow: "3" }}
        >
          <input
            type="text"
            className={styles.myInput}
            placeholder="Search..."
            value={searchText}
            onChange={handleSerchedChange}
          />
        </div>
        <div className={styles["menu-items"]} onClick={handleLogoutClick}>
          Logout
        </div>
        <div
          className={`${styles["menu-items"]} ${styles["profile-menu-items"]}`}
        >
          <img src={user.profileImage} alt="" />

          <label htmlFor="fileUpload">
            <input
              type="file"
              id="fileUpload"
              name="fileUpload"
              className={styles["file-input"]}
              onChange={handleSelectProfileImageClick}
            />
          </label>
        </div>
      </div>

      {/* Mobile view */}
      <div className={`${styles["navbar-mobile"]}`}>
        <div
          className={`${styles["navbar-mobile-menu-items"]} ${styles["navbar-mobile-icon-menu-items"]}`}
        >
          <img src="https://pngimg.com/d/pinterest_PNG62.png" alt="" />
        </div>
        <div className={styles["navbar-mobile-menu-items"]} title="Home">
          <MdHome size={25} />
        </div>
        <div
          className={styles["navbar-mobile-menu-items"]}
          title="Explore"
          onClick={() => navigate("/explore")}
        >
          <MdExplore size={25} />
        </div>
        <div
          className={styles["navbar-mobile-menu-items"]}
          onClick={handleClick}
          title="Create board"
        >
          <RxPlus size={25} />
        </div>
        <div
          className={`${styles["navbar-mobile-menu-items"]} ${styles["search-menu-items"]}`}
          style={{ flexGrow: "1" }}
        >
          <input
            type="text"
            className={styles.myInput}
            placeholder="Search..."
            value={searchText}
            onChange={handleSerchedChange}
          />
        </div>
        <div
          className={styles["navbar-mobile-menu-items"]}
          onClick={handleLogoutClick}
          title="Logout"
        >
          <MdLogout size={25} />
        </div>
        <div
          className={`${styles["navbar-mobile-menu-items"]} ${styles["profile-menu-items"]}`}
          title="Profile"
        >
          <img src={user.profileImage} alt="" />

          <label htmlFor="fileUpload">
            <input
              type="file"
              id="fileUpload"
              name="fileUpload"
              className={styles["file-input"]}
              onChange={handleSelectProfileImageClick}
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default Header;
