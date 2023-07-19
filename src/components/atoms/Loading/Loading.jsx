import React from "react";
import styles from "./Loading.module.css";

const Loading = ({ top }) => {
  return (
    <div className={`${styles["loader"]}`} style={{ top: top }}>
      <div className={`${styles["circle"]}`}></div>
      <div className={`${styles["circle"]}`}></div>
      <div className={`${styles["circle"]}`}></div>
      <div className={`${styles["circle"]}`}></div>
    </div>
  );
};

export default Loading;
