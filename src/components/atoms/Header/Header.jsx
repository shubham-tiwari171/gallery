import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import axios from "axios";
import { RxCamera } from "react-icons/rx";
import { updatUserProfile } from "../../../api/apiEndpoint";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../redux/reducers/reducers";
import { getUser } from "../../../api/apiEndpoint";

const Header = () => {
  const [profile, setProfile] = useState({});
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

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

  return (
    <>
      <div className={styles.navbar}>
        <div className={`${styles["menu-items"]} ${styles["icon-menu-items"]}`}>
          <img src="https://pngimg.com/d/pinterest_PNG62.png" alt="" />
        </div>
        <div className={styles["menu-items"]}>Home</div>
        <div className={styles["menu-items"]}>Explore</div>
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
          />
        </div>
        <div className={styles["menu-items"]}>Logout</div>
        <div
          className={`${styles["menu-items"]} ${styles["profile-menu-items"]}`}
        >
          <img src={user.profileImage} alt="" />

          <label htmlFor="fileUpload">
            {/* <RxCamera
              className={`${styles["rx-camera"]} ${styles["file-upload-label"]}`}
            /> */}
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
