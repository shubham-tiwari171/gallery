import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
//import axios from "axios";
import { MdHome, MdExplore, MdLogout, MdLogin, MdDelete } from "react-icons/md";
import { RxPlus } from "react-icons/rx";
//import { updatUserProfile } from "../../../api/apiEndpoint";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../redux/reducers/reducers";
//import { getUser } from "../../../api/apiEndpoint";
import { useNavigate, useLocation } from "react-router-dom";
import { search, deleteSelectedImage } from "../../../redux/reducers/reducers";
//import { getSearchedImages } from "../../../api/apiEndpoint";
//import { border } from "@mui/system";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  updateUser,
  uplaodProfileImage,
  //isProfileImageExist,
  signOutUser,
  uploadImage,
  getAllImages,
} from "../../../context/firebase";
// import { signInWithGoogle } from "../../../context/firebase";
import { getData } from "../../../context/realtimedatabse";
const Header = () => {
  const [open, setOpen] = useState(false);
  //const [profile, setProfile] = useState({});
  //const [fileUpload, setFileUpload] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [hideDeletePallete, sethideDeletePallete] = useState("");
  const dispatch = useDispatch();
  const { user, isLoggedIn, selectedImageId } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const location = useLocation();
  const boardId =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  useEffect(() => {
    return () => {
      sethideDeletePallete(false);
    };
  }, [location.pathname]);

  const handleUploadClick = () => {
    //getData();
    // uploadImage();
    getAllImages();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    if (value === "yes") {
      setOpen(false);
      sethideDeletePallete(false);

      const filteredBoard = user?.boards?.find(
        (board) => board?.id === boardId
      );
      const deletedImagesFromBoard = {
        ...filteredBoard,
        images: [],
      };

      const updatedBoards = user?.boards?.map((board) =>
        board?.id === boardId ? deletedImagesFromBoard : board
      );

      const updatedUser = {
        ...user,
        boards: updatedBoards,
      };

      dispatch(setUser(updatedUser));
      dispatch(deleteSelectedImage([]));
      updateUser(user.documentId, updatedUser);
    } else {
      setOpen(false);
      sethideDeletePallete(false);
    }
  };

  const handleImageDelete = (e) => {
    sethideDeletePallete(!hideDeletePallete);
  };

  const handleLogoutClick = () => {
    signOutUser();
    navigate("/login");
  };

  // const handleLogInClick = () => {
  //   dispatch(logout());
  //   navigate("/login");
  // };

  const handleSelectProfileImageClick = async (e) => {
    let profileImage = e.target.files[0];
    if (profileImage) {
      const imageUrl = await uplaodProfileImage(
        profileImage.name,
        profileImage
      );
      const updatedUserProfile = { ...user, profileImage: imageUrl };
      await updateUser(user.documentId, updatedUserProfile);
      dispatch(setUser(updatedUserProfile));
      // if (isProfileImageExist(profileImage.name)) {
      //   const imageUrl = await uplaodProfileImage(
      //     profileImage.name,
      //     profileImage
      //   );
      //   const updatedUserProfile = { ...user, profileImage: imageUrl };
      //   await updateUser(user.documentId, updatedUserProfile);
      //   dispatch(setUser(updatedUserProfile));
      // }
    }
  };

  const handleSerchedChange = (event) => {
    setSearchText(event.target.value);
    dispatch(search(event.target.value));
  };

  const handleRemoveSelectedImage = () => {
    const filteredBoard = user?.boards?.find((board) => board?.id === boardId);
    const deletedImagesFromBoard = {
      ...filteredBoard,
      images: filteredBoard?.images?.filter(
        (image) => !selectedImageId.includes(image.id)
      ),
    };

    const updatedBoards = user?.boards?.map((board) =>
      board?.id === boardId ? deletedImagesFromBoard : board
    );

    const updatedUser = {
      ...user,
      boards: updatedBoards,
    };

    sethideDeletePallete(!hideDeletePallete);

    dispatch(setUser(updatedUser));
    dispatch(deleteSelectedImage([]));
    updateUser(user.documentId, updatedUser);
  };

  const handleRemoveAllImage = () => {
    handleClickOpen();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmation Dialog</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete all images ?.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("no")} autoFocus>
            Disagree
          </Button>
          <Button onClick={() => handleClose("yes")}>Agree</Button>
        </DialogActions>
      </Dialog>

      {/* Desktop view */}
      <div className={styles.navbar}>
        <div className={`${styles["menu-items"]} ${styles["icon-menu-items"]}`}>
          <img src="https://pngimg.com/d/pinterest_PNG62.png" alt="" />
        </div>
        <div
          className={styles["menu-items"]}
          onClick={() => navigate("/uploadform")}
        >
          Home
        </div>
        <div
          className={styles["menu-items"]}
          onClick={() => navigate("/explore")}
        >
          Explore
        </div>
        <div className={styles["menu-items"]} onClick={handleUploadClick}>
          Upload
        </div>
        {location.pathname.includes("/savedImages") && (
          <div className={styles["menu-items"]} onClick={handleImageDelete}>
            Delete
          </div>
        )}
        <div
          className={`${styles["menu-items"]} ${styles["search-menu-items"]}`}
          style={{ flexGrow: "3" }}
        >
          <input
            type="text"
            className={styles.myInput}
            placeholder="Search..."
            value={searchText}
            onChange={handleSerchedChange}
          />
        </div>
        {isLoggedIn ? (
          <div
            className={styles["navbar-mobile-menu-items"]}
            onClick={handleLogoutClick}
            title="Logout"
            style={{
              display: "flex",
              width: "4rem",
              justifyContent: "center",
            }}
          >
            <MdLogout size={30} />
          </div>
        ) : (
          <div
            className={styles["navbar-mobile-menu-items"]}
            onClick={handleLogoutClick}
            title="Login"
            style={{
              display: "flex",
              width: "4rem",
              justifyContent: "center",
            }}
          >
            <MdLogin size={30} />
          </div>
        )}

        {/* <img src={user.profileImage} alt="" />

          <label htmlFor="fileUpload">
            <input
              type="file"
              id="fileUpload"
              name="fileUpload"
              className={styles["file-input"]}
              onChange={handleSelectProfileImageClick}
            />
          </label> */}
        <div className={styles.container}>
          <div className={`${styles["picture-container"]} `}>
            <div className={`${styles["picture"]} `}>
              <img
                src={user?.profileImage}
                className={`${styles["picture-src"]} `}
                id="wizardPicturePreview"
                title=""
              />
              <input
                type="file"
                id="wizard-picture"
                class=""
                onChange={handleSelectProfileImageClick}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className={`${styles["navbar-mobile"]}`}>
        <div
          className={`${styles["navbar-mobile-menu-items"]} ${styles["navbar-mobile-icon-menu-items"]}`}
        >
          <img src="https://pngimg.com/d/pinterest_PNG62.png" alt="" />
        </div>
        <div className={styles["navbar-mobile-menu-items"]} title="Home">
          <MdHome size={25} />
        </div>
        <div
          className={styles["navbar-mobile-menu-items"]}
          title="Explore"
          onClick={() => navigate("/explore")}
        >
          <MdExplore size={25} />
        </div>
        <div
          className={styles["navbar-mobile-menu-items"]}
          onClick={handleUploadClick}
          title="Create board"
        >
          <RxPlus size={25} />
        </div>
        {location.pathname.includes("/savedImages") && (
          <div
            className={styles["navbar-mobile-menu-items"]}
            onClick={handleImageDelete}
            title="Delete Image"
          >
            <MdDelete size={25} />
          </div>
        )}
        <div
          className={`${styles["navbar-mobile-menu-items"]} ${styles["search-menu-items"]}`}
          style={{ flexGrow: "1" }}
        >
          <input
            type="text"
            className={styles.myInput}
            placeholder="Search..."
            value={searchText}
            onChange={handleSerchedChange}
          />
        </div>
        {isLoggedIn ? (
          <div
            className={styles["navbar-mobile-menu-items"]}
            onClick={handleLogoutClick}
            title="Logout"
          >
            <MdLogout size={25} />
          </div>
        ) : (
          <div
            className={styles["navbar-mobile-menu-items"]}
            onClick={handleLogoutClick}
            title="Logout"
          >
            <MdLogin size={25} />
          </div>
        )}
        <div
          className={`${styles["navbar-mobile-menu-items"]} ${styles["profile-menu-items"]}`}
          title="Profile"
        >
          <img
            src={user?.profileImage}
            alt=""
            className={`${styles["picture-src"]} `}
          />

          <label htmlFor="fileUpload">
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

      {hideDeletePallete && (
        <div
          className={`${styles["delete-palete"]}`}
          onClick={handleImageDelete}
        >
          <button
            className="btn btn-danger"
            onClick={handleRemoveSelectedImage}
          >
            Remove Selected Image
          </button>
          <button className="btn btn-danger" onClick={handleRemoveAllImage}>
            Remove All
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
