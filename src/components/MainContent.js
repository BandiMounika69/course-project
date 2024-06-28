import React from "react";
import { Link } from "react-router-dom";
import "./MainContent.css";

const MainContent = ({ content, onPrevious, onNext, progress }) => {
  const sectionImages = {
    introduction: "https://example.com/introduction.jpg",
    chapter1: "https://example.com/chapter1.jpg",
    chapter2: "https://example.com/chapter2.jpg",
    chapter3: "https://example.com/chapter3.jpg",
    chapter4: "https://example.com/chapter4.jpg",
  };

  const getContent = () => {
    if (content.endsWith(".mp4")) {
      return (
        <video controls onEnded={onNext}>
          <source src={content} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else if (sectionImages[content]) {
      return (
        <img
          src={sectionImages[content]}
          alt={content}
          className="section-image"
        />
      );
    } else {
      return <div>{content}</div>;
    }
  };

  const roundedProgress = Math.round(progress);

  return (
    <div className="main-content">
      <div className="breadcrumb">
        <Link to="/Sidebar">Back to courses</Link>
      </div>
      <div className="progress-bar">
        <div
          className="progress-bar-inner"
          style={{ width: `${roundedProgress}%` }}
        >
          {roundedProgress}%
        </div>
      </div>
      <div className="content">{getContent()}</div>
      <div className="navigation-buttons">
        <button onClick={onPrevious}>Previous</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default MainContent;
