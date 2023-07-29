import React, { useState } from "react";
import styles from "./Explore.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getUser, updatUserPersonalBoard } from "../../../api/apiEndpoint";
import axios from "axios";
import ImageBaord from "../ImageBoard/Imagebaord";
const Explore = () => {
  return (
    <div className={`${styles["explore-wraper"]}`}>
      <ImageBaord />
    </div>
  );
};

export default Explore;
