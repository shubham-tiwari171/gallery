import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { MdOutlineDownloading } from "react-icons/md";
import axios from "axios";
import { Dialog, DialogTitle } from "@mui/material";
import Title from "../Title/Title";
import "./Uploadform.css";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
const UploadForm = () => {
  const [randomDivisions, setRandomDivisions] = useState([]);
  const [randomImages, setRandomImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(15);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { isLoggedIn } = useSelector((state) => state.user);
  console.log(isLoggedIn);
  useEffect(() => {
    let interval = setTimeout(() => {
      getImage();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  //changing the size if dive on page changes

  useEffect(() => {
    let interval = setTimeout(() => {
      changeSize();
    }, 1000);
    return () => clearInterval(interval);
  }, [currentPage, randomImages]);

  // changing the size if dive on per page

  useEffect(() => {
    let interval = setTimeout(() => {
      changeSize();
    }, 5000);
    return () => clearInterval(interval);
  });

  function handleChangePage(event, page) {
    setCurrentPage(page);
  }

  const getImage = async () => {
    try {
      const response = await axios.get("http://localhost:4000/images");
      setRandomImages(response.data);
    } catch (error) {
      console.error("Error fetching random images:", error);
    }
  };

  const changeSize = () => {
    const paginatedImages = paginateImages(currentPage);
    const divs = paginatedImages.map((image) => {
      const height = Math.floor(Math.random() * (500 - 400 + 1)) + 300 + "px";
      const width = Math.floor(Math.random() * (500 - 400 + 1)) + 300 + "px";
      const divStyle = {
        height,
        width,
      };
      return (
        <div key={image.id} style={divStyle} className="box">
          <div className="image-container">
            <img
              src={image.urls.regular}
              alt={image.alt_description}
              className="image"
              onClick={() => handleOpenDialog(image)}
            />
          </div>
        </div>
      );
    });
    setRandomDivisions(divs);
  };

  const handleOpenDialog = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const paginateImages = (currentPage) => {
    const startIndex = (currentPage - 1) * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    return randomImages.slice(startIndex, endIndex);
  };

  const handleImageDownload = async () => {
    if (selectedImage) {
      try {
        const response = await axios.get(selectedImage.urls.full, {
          responseType: "blob", // Set the response type to 'blob'
        });

        // Create a temporary anchor element
        const randomImageNumber =
          Math.floor(Math.random() * (500 - 300 + 1)) + 300;
        const link = document.createElement("a");
        link.href = URL.createObjectURL(response.data);
        console.log(response.description);
        link.download =
          selectedImage.description === null ||
          selectedImage.description === undefined
            ? "Image" + randomImageNumber + ".jpg"
            : selectedImage.description + ".jpg";

        // Simulate a click event to trigger the download
        link.click();

        // Clean up the temporary anchor element
        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    }
  };

  return (
    <>
      {/* <Title /> */}
      <form>
        {/* <label>
          <input type="file" />
          <span>+</span>
        </label> */}
        <div
          className="d-flex justify-content-end mt-4"
          style={{ marginRight: "4rem" }}
        >
          {/* <Pagination
            count={Math.ceil(randomImages.length / imagesPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            color="secondary"
            style={{
              color: "#fff",
              backgroundColor: "white",
              marginTop: "1rem",
            }}
          /> */}
        </div>

        <div className="output">{randomDivisions}</div>

        <div
          className="d-flex justify-content-end mt-2"
          style={{ marginRight: "4rem" }}
        >
          <Pagination
            count={Math.ceil(randomImages.length / imagesPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </div>
        <Dialog open={open} onClose={handleCloseDialog}>
          {/* <DialogTitle>Image Dialog</DialogTitle> */}
          <div className="dialog-image-container">
            <MdOutlineDownloading
              className={"md-outline-downloading"}
              size={40}
              onClick={handleImageDownload}
            />
            {selectedImage && (
              <img
                src={selectedImage.urls.full}
                alt={selectedImage.alt_description}
                className="dialog-image-container"
              />
            )}
          </div>
        </Dialog>
      </form>
    </>
  );
};

export default UploadForm;
