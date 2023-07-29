import React, { useEffect, useState } from "react";
import { MdOutlineDownloading } from "react-icons/md";
import Button from "@mui/material/Button";
import styles from "./Imagedialog.module.css";
import { usePalette } from "react-palette";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import axios from "axios";
import { MdClose } from "react-icons/md";

const Imagedialog = ({ open, selectedImage, handleCloseDialog }) => {
  const { data, loading, error } = usePalette(selectedImage?.urls?.raw);
  const [dimensions, setDimensions] = useState({});

  useEffect(() => {
    if (selectedImage !== "") {
      getimageDimentations();
    }
  }, [selectedImage]);

  const getimageDimentations = () => {
    if (selectedImage?.urls) {
      Object.keys(selectedImage.urls).forEach((key) => {
        const img = new Image();
        img.src = selectedImage.urls[key];
        img.onload = () => {
          const { naturalWidth, naturalHeight } = img;
          const dimensions = `${naturalWidth} * ${naturalHeight}`;

          setDimensions((prevState) => ({
            ...prevState,
            [key]: dimensions,
          }));
        };
      });
    }
  };

  const handleImageDownload = async (imageQuality) => {
    if (
      selectedImage &&
      selectedImage.urls &&
      selectedImage.urls[imageQuality]
    ) {
      try {
        if (imageQuality !== "small_s3") {
          const response = await axios.get(selectedImage.urls[imageQuality], {
            responseType: "blob", // Set the response type to 'blob'
          });

          // Create a temporary anchor element
          const randomImageNumber =
            Math.floor(Math.random() * (500 - 300 + 1)) + 300;
          const link = document.createElement("a");
          link.href = URL.createObjectURL(response.data);
          link.download =
            selectedImage.description === null ||
            selectedImage.description === undefined
              ? "Image" + randomImageNumber + ".jpg"
              : selectedImage.description + ".jpg";

          // Simulate a click event to trigger the download
          link.click();

          // Clean up the temporary anchor element
          URL.revokeObjectURL(link.href);
        }
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    }
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
          <h3 style={{ fontWeight: "bold" }}>Image Preview </h3>
          <button className="btn btn-danger" onClick={handleCloseDialog}>
            <MdClose size={20} />
          </button>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className={`${styles["dialog-content"]}`}>
          <div className={`${styles["dialog-content-image"]}`}>
            {selectedImage && (
              <img
                src={selectedImage.urls.regular}
                alt={selectedImage.alt_description}
                className={`${styles["dialog-image-container"]}`}
              />
            )}
          </div>
          <div className={`${styles["dialog-content-download-variety"]}`}>
            {selectedImage &&
              Object.keys(selectedImage.urls)
                .filter((key) => key !== "small_s3" && key !== "raw")
                .map((key) => (
                  <button
                    key={key}
                    className={`${styles["download-button"]}`}
                    style={{ backgroundColor: data?.lightVibrant }}
                    onClick={() => handleImageDownload(key)}
                  >
                    Download {key.charAt(0).toUpperCase() + key.slice(1)} Image
                    <span
                      style={{
                        fontSize: "1rem",
                        fontStyle: "italic",
                        color: `#${"514c4c"}`,
                      }}
                    >
                      {" "}
                      ({dimensions[key]})
                    </span>
                  </button>
                ))}
          </div>
        </div>
      </DialogContent>
      {/* <DialogActions>
        <Button>Disagree</Button>
        <Button>Agree</Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default Imagedialog;
