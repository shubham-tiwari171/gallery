import React from "react";
import Header from "../atoms/Header/Header";
import UploadForm from "../atoms/UploadForm/Uploadform";
export const Pages = () => {
  return (
    <>
      <div className="page-content">
        <section id="header" className="section">
          <div className="section-content">
            <Header />
          </div>
        </section>
        <section id="header" className="section">
          <div className="section-content">
            <UploadForm />
          </div>
        </section>
      </div>
    </>
  );
};
