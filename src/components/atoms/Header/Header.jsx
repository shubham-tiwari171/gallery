import React from "react";
import styles from "./Header.module.css";
import axios from "axios";
const Header = () => {
  const handleClick = async () => {};
  return (
    <>
      <div className={`${styles["navbar"]}`}>
        <div
          className={`${styles["menu-items"]} ${styles["icon-menu-items"]}`}
        ></div>
        <div className={`${styles["menu-items"]}`}>Home </div>
        <div className={`${styles["menu-items"]}`}>Explore</div>
        <div className={`${styles["menu-items"]}`} onClick={handleClick}>
          Create
        </div>
        <div
          className={`${styles["menu-items"]} ${styles["search-menu-items"]}`}
          style={{ flexGrow: "3" }}
        >
          <input
            type="text"
            className={`${styles["myInput"]}`}
            placeholder="Enter your text"
          />
        </div>
        <div className={`${styles["menu-items"]}`}>Create</div>
        <div className={`${styles["menu-items"]}`}>Create</div>
      </div>
    </>
  );
};
// className={`${styles["menu-items"]}`} style={{ flexGrow: "3" }}
export default Header;
