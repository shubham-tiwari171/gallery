import React from "react";
import styles from "./SavedImagesShow.module.css";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { deleteSelectedImage } from "../../../redux/reducers/reducers";

const SavedImagesShow = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [checked, setChecked] = useState(false);
  const location = useLocation();
  const boardId =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const { user, selectedImageId } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const selectedBoard = user?.boards?.find((board) => board.id === boardId);
  const images = selectedBoard ? selectedBoard.images : [];

  const handleCheckboxChange = (e, index) => {
    // if (
    //   selectedImageId.length === images.length &&
    //   e.target.checked === false
    // ) {
    //   setChecked(true);
    // } else if (
    //   selectedImageId.length === images.length &&
    //   e.target.checked === true
    // ) {
    //   setChecked(false);
    // } else {
    const updatedSelectedImages = e.target.checked
      ? [...selectedImages, images[index].id]
      : selectedImages.filter((id) => id !== images[index].id);
    setSelectedImages(updatedSelectedImages);
    dispatch(deleteSelectedImage(updatedSelectedImages));
    // }
  };

  return (
    <div className={`${styles["saved-iamge-wrapper"]}`}>
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`card ${
            index % 3 === 0
              ? styles["card_small"]
              : index % 3 === 1
              ? styles["card_medium"]
              : styles["card_large"]
          }`}
        >
          <input
            type="checkbox"
            id={image.id}
            className={`${styles["myInput"]}`}
            onClick={(e) => handleCheckboxChange(e, index)}
          />

          <img
            src={image.urls.regular}
            alt={image.alt_description}
            className={styles.image}
          />
        </div>
      ))}
    </div>
  );
};

export default SavedImagesShow;
