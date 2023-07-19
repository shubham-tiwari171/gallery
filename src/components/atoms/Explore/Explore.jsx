import React from "react";
import styles from "./Explore.moduele.css";
const Explore = () => {
  return (
    <div className={`${styles["explore-card-wrapper"]}`}>
      <div className={`${styles["explore-card-content"]}`}>
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
        <div className={`${styles["text"]}`}></div>
      </div>

      <div className={`${styles["card"]}`}>
        <div className={`${styles["img-container"]}`}>
          <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" />
        </div>

        <div className={`${styles["text"]}`}></div>
      </div>
    </div>
  );
};

export default Explore;
