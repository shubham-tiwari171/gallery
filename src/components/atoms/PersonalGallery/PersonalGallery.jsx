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

const PersonalGallery = ({ open, handleCloseDialog }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
        <div className={`${styles["dialog-content"]}`}>
          {user.board.map((board) => (
            <div className={`${styles["card"]}`}>
              <div className={`${styles["img-container"]}`}>
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
              <div className={`${styles["text"]}`}> {board.name}</div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalGallery;
