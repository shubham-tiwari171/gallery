import React from "react";
import styles from "./Loading.module.css";

const Loading = ({ top, left, right, bottom, height, className }) => {
  return (
    <div
      className={`${styles["loader"]} ${styles[className]}`}
      style={{
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        height: height,
      }}
    >
      <div className={`${styles["circle"]}`}></div>
      <div className={`${styles["circle"]}`}></div>
      <div className={`${styles["circle"]}`}></div>
      <div className={`${styles["circle"]}`}></div>
    </div>
  );
};

export default Loading;
