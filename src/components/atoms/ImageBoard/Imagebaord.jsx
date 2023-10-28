// ImageBoard.js
import React, { useEffect, useState } from "react";
import styles from "./ImageBoard.module.css";
import { useSelector, useDispatch } from "react-redux";
// import { getUser, updatUserPersonalBoard } from "../../../api/apiEndpoint";
import { v4 as uuidv4 } from "uuid";
import TextField from "@mui/material/TextField";
import { setUser } from "../../../redux/reducers/reducers";
import { MdClose, MdMoreVert, MdDelete, MdEdit, MdSave } from "react-icons/md";
import { ImShare } from "react-icons/im";
import { updateUser, getUser } from "../../../context/firebase";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useLocation } from "react-router-dom";
const ImageBoard = ({ selectedImage }) => {
  const { user } = useSelector((state) => state.user);
  const [boards, setBoards] = useState([]);
  const [users, setUsers] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [boardName, setBoardName] = useState("");
  const [isEditableBoardIdExist, setIsEditableBoardIdExist] = useState(null);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [cardHoverStates, setCardHoverStates] = useState(
    user?.boards?.length > 0 ? user.boards.map(() => false) : []
  );
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
    severity: "warning",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // async function fetchData() {
  //   const response = await getUser(user.id);
  //   setBoards(response?.data?.board);
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // async function fetchData() {
  //   let currentUser = await getUser(user.documentId);
  //   setBoards(currentUser?.boards);
  // }
  const handleSnackbarClose = () => {
    setOpenSnackbar((prevState) => ({
      ...prevState,
      open: false,
    }));
    setSnackbarMessage("");
  };

  const handleBoardNameChange = (event) => {
    setBoardName(event.target.value);
  };

  const handleCreateCard = () => {
    setBoardName("");
    setIsEditableBoardIdExist(null);
    setIsVisible(false);
  };

  const handleSaveCard = async () => {
    if (!isEditableBoardIdExist) {
      //let currentUser = getUser(user.documentId);
      //let currentUser = await getUser(user?.authenticatedUid);
      let isBoardExist = user?.boards?.some(
        (board) => board.name === boardName.trim()
      );
      if (!isBoardExist && boardName.trim() !== "") {
        let newCard = {
          id: uuidv4(),
          name: boardName.trim(),
          isEditable: false,
          createdAt: new Date().toISOString(),
          cardBackground: "./wallpaper-thumb.jpg",
          images: [],
        };
        const updatedBoard = [newCard, ...user.boards];
        const updatedUser = { ...user, boards: updatedBoard };
        setIsVisible(true);
        // updatUserPersonalBoard(user.id, updatedUser);
        updateUser(user.documentId, updatedUser);
        dispatch(setUser(updatedUser));
        setBoardName("");
        // fetchData();
      } else {
        setOpenSnackbar((prevState) => ({
          ...prevState,
          open: true,
          severity: "error",
        }));
        setSnackbarMessage("Board with the same name already exists.");
      }
    } else {
      if (boardName !== "") return handleEditBoardName();
    }
  };

  const handleInputChecked = (e) => {
    if (e.target.checked) {
      setSelectedBoardId(e.target.id);
    } else {
      setSelectedBoardId(null);
    }
  };

  const handleBoardNameClose = () => {
    setBoardName("");
    setIsVisible(true);
  };

  const handleDeleteBoard = (boardId) => {
    let filterData = user?.boards?.filter((board) => board.id !== boardId);
    const updatedUser = { ...user, boards: [...filterData] };
    dispatch(setUser(updatedUser));
    // updatUserPersonalBoard(user.id, updatedUser);
    updateUser(user.documentId, updatedUser);
  };

  const handleEditBoardName = () => {
    let filterDataIndex = user?.boards?.findIndex(
      (board) => board.id === isEditableBoardIdExist
    );

    if (filterDataIndex !== -1) {
      let updatedBoard = [...user?.boards];
      updatedBoard[filterDataIndex] = {
        ...updatedBoard[filterDataIndex],
        name: boardName.trim(),
        isEditable: false,
      };

      const updatedUser = { ...user, boards: updatedBoard };

      dispatch(setUser(updatedUser));
      // updatUserPersonalBoard(user.id, updatedUser);
      updateUser(user.documentId, updatedUser);
      setIsVisible(true);
      setBoardName("");
      setIsEditableBoardIdExist("");
    }
  };

  const handleEditClick = (boardId) => {
    // let filterDataIndex = user.board.findIndex(
    //   (board) => board.id === isEditableBoardIdExist
    // );

    // if (filterDataIndex !== -1) {
    //   let updatedBoard = [...user.board];
    //   updatedBoard[filterDataIndex] = {
    //     ...updatedBoard[filterDataIndex],
    //     isEditable: true,
    //   };
    //   const updatedUser = { ...user, board: updatedBoard };
    //   dispatch(setUser(updatedUser));
    // }
    let filterData = user?.boards?.find((board) => board.id === boardId);
    setBoardName(filterData.name);
    setIsEditableBoardIdExist(boardId);
    // setIsVisible(false);
  };

  // Function to handle hover for a specific card
  const handleCardHover = (cardIndex, isHovered) => {
    const newCardHoverStates = [...cardHoverStates];
    newCardHoverStates[cardIndex] = isHovered;
    setCardHoverStates(newCardHoverStates);
  };

  const handleSaveImage = () => {
    if (selectedBoardId) {
      const boardIndex = user?.boards?.findIndex(
        (board) => board.id === selectedBoardId
      );
      if (boardIndex !== -1) {
        const updatedBoard = user.boards[boardIndex];

        if (
          updatedBoard?.images.some((image) => image.id === selectedImage.id)
        ) {
          setOpenSnackbar((prevState) => ({
            ...prevState,
            open: true,
            severity: "error",
          }));
          setSnackbarMessage("Image is already saved in this board.");
        } else {
          const updatedBoardWithImage = {
            ...updatedBoard,
            cardBackground: selectedImage?.urls?.regular,
            images: [selectedImage, ...updatedBoard?.images],
          };

          const updatedBoards = user.boards.map((board, index) =>
            index === boardIndex ? updatedBoardWithImage : board
          );

          const updatedUser = { ...user, boards: updatedBoards };
          dispatch(setUser(updatedUser));
          updateUser(user.documentId, updatedUser);
          setOpenSnackbar((prevState) => ({
            ...prevState,
            open: true,
            severity: "success",
          }));
          setSnackbarMessage(`Image saved successfully.`);
        }
      }

      setSelectedBoardId(null);
    } else {
      setOpenSnackbar((prevState) => ({
        ...prevState,
        open: true,
        severity: "error",
      }));
      setSnackbarMessage("Please select a board to save the image.");
    }
  };
  return (
    <>
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: openSnackbar.vertical,
          horizontal: openSnackbar.horizontal,
        }}
        key={openSnackbar.vertical + openSnackbar.horizontal}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={openSnackbar.severity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <div className={`${styles["image-board-card-wrapper"]}`}>
        {user?.boards?.length !== 0 &&
          user?.boards?.map((board, index) => (
            <div key={board.id} className={`${styles["image-board-card"]}`}>
              <div className={`${styles["image-board-img-container"]}`}>
                <div className={`${styles["overlay"]}`}>
                  <input
                    // checked={selectedBoardId === null ? false : true}
                    type="checkbox"
                    id={board.id}
                    className={`${styles["myInput"]}`}
                    onClick={handleInputChecked}
                    checked={selectedBoardId === board.id}
                  />
                  <div
                    className={` ${styles["moreIconGrow"]}`}
                    onMouseEnter={() => handleCardHover(index, true)}
                    onMouseLeave={() => handleCardHover(index, false)}
                  >
                    <MdMoreVert
                      size={22}
                      className={`${styles[""]}`}
                      title="More"
                    />
                    <div className={`${styles["mdIcon"]}`}>
                      <MdDelete
                        title="Delete"
                        size={20}
                        className={` ${
                          cardHoverStates[index] ? "" : styles["hidden"]
                        }`}
                        onClick={() => handleDeleteBoard(board.id)}
                      />
                    </div>
                    <div className={`${styles["mdIcon"]}`}>
                      <MdEdit
                        title="Edit"
                        size={20}
                        className={` ${
                          cardHoverStates[index] ? "" : styles["hidden"]
                        }`}
                        onClick={() => handleEditClick(board.id)}
                      />
                    </div>
                    {location.pathname.includes("explore") ? null : (
                      <div className={`${styles["mdIcon"]}`}>
                        <MdSave
                          title="Save"
                          size={20}
                          className={` ${
                            cardHoverStates[index] ? "" : styles["hidden"]
                          }`}
                          onClick={() => handleSaveImage(board.id)}
                        />
                      </div>
                    )}
                    <div className={`${styles["mdIcon"]}`}>
                      <ImShare
                        title="Show saved images"
                        size={20}
                        className={` ${
                          cardHoverStates[index] ? "" : styles["hidden"]
                        }`}
                        onClick={() =>
                          navigate(`/savedImages/${board.name}/${board.id}`)
                        }
                      />
                    </div>
                    <div className={`${styles["mdIcon"]}`}>
                      <MdClose
                        title="Cancle edit"
                        size={20}
                        className={` ${
                          cardHoverStates[index] ? "" : styles["hidden"]
                        }`}
                        onClick={() => setIsEditableBoardIdExist(null)}
                      />
                    </div>
                  </div>
                </div>
                <img src={board?.cardBackground} alt="" />
                {/* {user?.boards?.map((image) => (
                  <img src={user} />
                ))} */}
              </div>
              {isEditableBoardIdExist === board.id ? (
                <div className={`${styles["edit-board-name-text-field"]}`}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Board Name"
                    value={boardName}
                    type=""
                    onChange={handleBoardNameChange}
                    size="small"
                    sx={{
                      ".MuiInputBase-input": {
                        width: "10rem",
                      },
                    }}
                  />
                  <button className="btn btn-dark " onClick={handleSaveCard}>
                    Save
                  </button>
                </div>
              ) : (
                <div className={`${styles["text"]}`}> {board.name} </div>
              )}
            </div>
          ))}

        <div className={`${styles["image-board-create-button"]}`}>
          {isVisible ? (
            <button className="btn btn-dark btn-lg" onClick={handleCreateCard}>
              Create Card
            </button>
          ) : (
            <div className={`${styles["image-board-card-name"]}`}>
              <div
                className={`${styles["image-board-card-name-heading"]}`}
                onClick={handleBoardNameClose}
              >
                <button className="btn btn-danger">
                  <MdClose size={20} />
                </button>
              </div>

              <div className={`${styles["image-board-card-name-inner"]}`}>
                <div
                  className={`${styles["image-board-card-name-inner-text-field"]}`}
                >
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Board Name"
                    value={boardName}
                    type=""
                    onChange={handleBoardNameChange}
                    fullWidth
                  />
                </div>

                <button
                  className="btn btn-dark btn-lg"
                  onClick={handleSaveCard}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageBoard;
