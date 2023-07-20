import React, { useState } from "react";
import styles from "./Explore.module.css";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { getUser, updatUserPersonalBoard } from "../../../api/apiEndpoint";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import TextField from "@mui/material/TextField";
import { setUser } from "../../../redux/reducers/reducers";
const Explore = () => {
  const { user } = useSelector((state) => state.user);
  const [isVisible, setIsVisible] = useState(true); // Initially, the "Create Card" button is visible
  const [boardName, setBoardName] = useState(""); // State to manage the board name input
  const dispatch = useDispatch();

  const handleBoardNameChange = (event) => {
    setBoardName(event.target.value);
  };

  const handleCreateCard = () => {
    setIsVisible(false); // Hide the "Create Card" button
  };

  const handleSaveCard = () => {
    let isBoardExist = user.board.find((board) => board.name === user.board);
    if (!isBoardExist) {
      let newCard = { id: uuidv4(), name: boardName, image: [] };
      const updatedBoard = [...user.board, newCard];
      const updatedUser = { ...user, board: updatedBoard };
      dispatch(setUser(updatedUser));
      updatUserPersonalBoard(user.id, updatedUser);
      setIsVisible(true);
      setBoardName("");
    }
  };

  return (
    <div className={`${styles["explore-card-wrapper"]}`}>
      {user.board.map((board) => (
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
          <div className={`${styles["text"]}`}>{board.name}</div>
        </div>
      ))}

      <div className={`${styles["explore-create-button"]}`}>
        {isVisible ? (
          <button className="btn btn-dark btn-lg" onClick={handleCreateCard}>
            Create Card
          </button>
        ) : (
          <div className={`${styles["explore-card-name"]}`}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Board Name"
              value={boardName}
              onChange={handleBoardNameChange}
              size="small"
            />
            <button className="btn btn-dark btn-lg" onClick={handleSaveCard}>
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
