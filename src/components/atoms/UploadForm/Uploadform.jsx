import React, { useEffect, useState } from "react";
import "./Uploadform.css";
import { useSelector } from "react-redux";
import { LuDownload } from "react-icons/lu";
import Imagedialog from "../ImageDialog/Imagedialog";
import Loading from "../Loading/Loading";
import { getAllImages, getSearchedImages } from "../../../api/apiEndpoint";
import PersonalGallery from "../PersonalGallery/PersonalGallery";

const UploadForm = () => {
  const { searchedText } = useSelector(
    (state) => state.imageSearchSliceReducer
  );
  const [randomImages, setRandomImages] = useState([]);
  const [previousSearchResult, setPreviousSearchResult] = useState([]);
  const [imagesPerPage, setImagesPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [initialLoadings, setInitialLoadings] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [count, setCount] = useState(0);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [seachedData, setSeachedData] = useState([]);
  const [withoutSeachedData, setWithoutSeachedData] = useState([]);
  useEffect(() => {
    getImage();
  }, [pageNo, searchedText]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, []);

  const getImage = async () => {
    try {
      let response;
      if (searchedText === "") {
        if (pageNo === 1 || (pageNo > 1 && count === 0)) {
          setIsLoading(true);
          setPreviousSearchResult([]);
          setRandomImages([]);
          setCount((prev) => prev + 1);
        }

        if (pageNo > 1 && count === 0) {
          setRandomImages([]);
          setCount((prev) => prev + 1);
        }

        response = await getAllImages(pageNo, imagesPerPage);
        setRandomImages((prev) => [...prev, ...response?.data]);
        setTotalPageCount(Number(response.headers["x-total-count"]));
      } else {
        try {
          if (pageNo === 1 || randomImages) {
            setRandomImages([]);
          }
          response = await getSearchedImages(
            pageNo,
            imagesPerPage,
            searchedText
          );
          setRandomImages((prev) => [...prev, ...response]);
          setPreviousSearchResult(response);
        } catch (e) {
          alert("Invalid response:", response);
        }
      }
      //setRandomImages((prev) => [...prev, ...response.data]);
      setInitialLoadings(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      setIsLoading(true);
      setPageNo((prevPageNo) => prevPageNo + 1);
    }
  };

  const handleOpenDialog = (image, e) => {
    if (e.target.classList.contains("save-button")) {
      return;
    }
    setSelectedImage(image);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handeleOpenSaveDialog = (image, e) => {
    // console.log("SaveToBordCard");
    setSelectedImage(image);
    setOpenSaveDialog(true);
  };

  const handeleCloseSaveDialog = () => {
    setOpenSaveDialog(false);
  };

  return (
    <>
      {initialLoadings && randomImages.length === 0 ? (
        <Loading />
      ) : (
        <div className="output">
          {randomImages.map((image, index) => (
            <div
              key={image.id}
              className={`card ${
                index % 3 === 0
                  ? " card_small"
                  : index % 3 === 1
                  ? " card_medium"
                  : " card_large"
              }`}
            >
              <img
                src={image.urls.regular}
                alt={image.alt_description}
                className={"image"}
              />
              <div
                className={"overlay"}
                onClick={(e) => handleOpenDialog(image, e)}
              >
                <div className={"overlay-content"}>
                  <div>
                    <button
                      className={"save-button btn btn-danger"}
                      onClick={(e) => handeleOpenSaveDialog(image, e)}
                    >
                      Save
                    </button>
                  </div>
                  <div
                    className={"LuDownload"}
                    onClick={(e) => handleOpenDialog(image, e)}
                  >
                    <LuDownload size={30} />{" "}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedImage !== "" && (
        <Imagedialog
          open={open}
          selectedImage={selectedImage}
          handleCloseDialog={handleCloseDialog}
          setOpen={setOpen}
        />
      )}

      <PersonalGallery
        open={openSaveDialog}
        handleCloseDialog={handeleCloseSaveDialog}
        setOpenSaveDialog={setOpenSaveDialog}
        selectedImage={selectedImage}
      />

      {isLoading && randomImages.length !== Number(totalPageCount) && (
        <div className={"bottom-loading"}>
          <Loading top={5} />
        </div>
      )}

      {!initialLoadings && randomImages.length === Number(totalPageCount) && (
        <div className={"bottom-loading no-data-found"}>
          <p>No data found</p>
        </div>
      )}
    </>
  );
};

export default UploadForm;
