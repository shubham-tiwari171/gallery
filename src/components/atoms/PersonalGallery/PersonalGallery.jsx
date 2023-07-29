import React, { useEffect, useState } from "react";
import { MdOutlineDownloading } from "react-icons/md";
import Button from "@mui/material/Button";
import styles from "./PersonalGallery.module.css";
import Checkbox from "@mui/material/Checkbox";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import Imagebaord from "../ImageBoard/Imagebaord";
import { padding } from "@mui/system";
const PersonalGallery = ({ open, handleCloseDialog, selectedImage }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleInputClick = (e) => {
    console.log(e.target.id);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      PaperProps={{
        sx: {
          maxWidth: "none",
          width: "80%",
          height: "100%",
        },
      }}
    >
      <DialogTitle>
        <div className={`${styles["dialog-heading"]}`}>
          <h3 style={{ fontWeight: "bold" }}>Personal Gallery</h3>
          <button className="btn btn-danger" onClick={handleCloseDialog}>
            <MdClose size={20} />
          </button>
        </div>
      </DialogTitle>
      <DialogContent>
        {/* <div className={`${styles["dialog-content"]}`}> */}
        {/* {user.board.map((board) => (
            <div className={`${styles["card"]}`}>
              <div className={`${styles["img-container"]}`}>
                <div className={`${styles["overlay"]}`}>
                  <input
                    type="checkbox"
                    id={board.id}
                    className={`${styles["myInput"]}`}
                    onClick={handleInputClick}
                  />
                  <div className={` ${styles["myButton"]}`}>
                    <MdDelete size={25} className={` ${styles["rotate"]}`} />
                  </div>
                </div>
                <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" />
              </div>
              <div className={`${styles["text"]}`}>{board.name}</div>
            </div>
          ))} */}
        <Imagebaord selectedImage={selectedImage} />
        {/* </div> */}
      </DialogContent>
      {/* <DialogActions
        sx={{ ".MuiDialogActions-root": { padding: "16px 24px" } }}
      >
        <button className="btn btn-dark btn-lg" onClick={handleCloseDialog}>
          Save Selected Image
        </button>
      </DialogActions> */}
    </Dialog>
  );
};

export default PersonalGallery;
