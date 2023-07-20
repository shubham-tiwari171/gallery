import React from "react";
import styles from "./Explore.module.css";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { getUser, updatUserPersonalBoard } from "../../../api/apiEndpoint";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import TextField from "@mui/material/TextField";

const Explore = () => {
  const { user } = useSelector((state) => state.user);
  const handleCreateCard = () => {
    let newCard = { id: uuidv4(), name: "" };
    const updatedBoard = [...user.board, newCard];
    const updatedUser = { ...user, board: updatedBoard };
    updatUserPersonalBoard(user.id, updatedUser);
  };

  return (
    <div className={`${styles["explore-card-wrapper"]}`}>
      <div className={`${styles["explore-card"]}`}>
        <div className={`${styles["explore-img-container"]}`}>
          <div className={`${styles["overlay"]}`}>
            <input
              type="checkbox"
              name=""
              id=""
              className={`${styles["myInput"]}`}
            />
          </div>
          <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" />
        </div>
        <div className={`${styles["text"]}`}></div>
      </div>

      <div className={`${styles["explore-create-button"]}`}>
        <button className="btn btn-dark btn-lg" onClick={handleCreateCard}>
          Create Card
        </button>
        <div className={`${styles["explore-card-name"]}`}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Board Name" // Set a label for the input field
            type=""
          />
          <button className="btn btn-dark btn-lg" onClick={handleCreateCard}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Explore;
