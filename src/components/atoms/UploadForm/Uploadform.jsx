import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { MdOutlineDownloading } from "react-icons/md";
import axios from "axios";
import { Dialog, DialogTitle } from "@mui/material";
import "./Uploadform.css";

const UploadForm = () => {
  const [randomDivisions, setRandomDivisions] = useState([]);
  const [randomImages, setRandomImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    let interval = setTimeout(() => {
      getImage();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval = setTimeout(() => {
      changeSize();
    }, 1000);
    return () => clearInterval(interval);
  }, [currentPage, randomImages]);

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
      const height = Math.floor(Math.random() * (500 - 300 + 1)) + 300 + "px";
      const width = Math.floor(Math.random() * (500 - 300 + 1)) + 300 + "px";
      const divStyle = {
        height,
        width,
      };
      return (
        <div key={image.id} style={divStyle} className="box">
          <div className="image-container">
            <img
              src={image.urls.small}
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
        const link = document.createElement("a");
        link.href = URL.createObjectURL(response.data);
        console.log(response.description);
        link.download = selectedImage.description + ".jpg"; // Specify the desired filename

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
    <form>
      <label>
        <input type="file" />
        <span>+</span>
      </label>
      <Pagination
        count={Math.ceil(randomImages.length / imagesPerPage)}
        page={currentPage}
        onChange={handleChangePage}
        variant="outlined"
        shape="rounded"
        color="primary"
      />
      <div className="output">{randomDivisions}</div>

      <Dialog open={open} onClose={handleCloseDialog}>
        {/* <DialogTitle>Image Dialog</DialogTitle> */}
        <div className="dialog-image-container">
          <MdOutlineDownloading
            className={"md-outline-downloading"}
            size={40}
            onClick={handleImageDownload}
          />
          {/* <button className="btn btn-primary md-outline-downloading">
            Download
          </button> */}
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
  );
};

export default UploadForm;
