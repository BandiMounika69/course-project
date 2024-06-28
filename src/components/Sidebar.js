import React, { useState, useEffect } from "react";
import "./Sidebar.css";

const Sidebar = ({ sections, activeSection, onSectionClick }) => {
  const [collapseState, setCollapseState] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarks")) || []
  );

  useEffect(() => {
    const storedCollapseState =
      JSON.parse(localStorage.getItem("collapseState")) || 0;
    setCollapseState(storedCollapseState);
  }, []);

  const handleToggle = () => {
    const newState = (collapseState + 1) % 3;
    setCollapseState(newState);
    localStorage.setItem("collapseState", JSON.stringify(newState));
  };

  const getCollapseClass = () => {
    switch (collapseState) {
      case 1:
        return "partially-collapsed";
      case 2:
        return "collapsed";
      default:
        return "";
    }
  };

  const filteredSections = sections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (section.subSections &&
        section.subSections.some((subSection) =>
          subSection.title.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );

  const toggleBookmark = (sectionIndex, subSectionIndex = null) => {
    let updatedBookmarks = [...bookmarks];
    const bookmarkKey =
      subSectionIndex !== null
        ? `section-${sectionIndex}-subSection-${subSectionIndex}`
        : `section-${sectionIndex}`;

    if (updatedBookmarks.includes(bookmarkKey)) {
      updatedBookmarks = updatedBookmarks.filter((key) => key !== bookmarkKey);
    } else {
      updatedBookmarks.push(bookmarkKey);
    }

    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  const isBookmarked = (sectionIndex, subSectionIndex = null) => {
    const bookmarkKey =
      subSectionIndex !== null
        ? `section-${sectionIndex}-subSection-${subSectionIndex}`
        : `section-${sectionIndex}`;

    return bookmarks.includes(bookmarkKey);
  };

  return (
    <div className={`sidebar ${getCollapseClass()}`}>
      <button className="toggle-button" onClick={handleToggle}>
        {collapseState === 0
          ? "Collapse"
          : collapseState === 1
          ? "Partially Collapse"
          : "Expand"}
      </button>
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredSections.map((section, index) => (
          <li key={index}>
            <div
              className={`section-item ${
                activeSection === index ? "active" : ""
              }`}
              onClick={() => onSectionClick(index)}
            >
              <span
                className={`status-icon ${
                  section.completed ? "completed" : "incomplete"
                }`}
              >
                {section.completed ? "✓" : "○"}
              </span>
              {section.title}
              <button
                className={`bookmark-button ${
                  isBookmarked(index) ? "bookmarked" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(index);
                }}
              >
                {isBookmarked(index) ? "★" : "☆"}
              </button>
            </div>
            {section.subSections && activeSection === index && (
              <ul>
                {section.subSections.map((subSection, subIndex) => (
                  <li
                    key={subIndex}
                    className={`sub-section ${
                      subSection.completed ? "completed" : ""
                    } ${activeSection === index && "active-sub-section"}`}
                    onClick={() => onSectionClick(index, subIndex)}
                  >
                    <span
                      className={`status-icon ${
                        subSection.completed ? "completed" : "incomplete"
                      }`}
                    >
                      {subSection.completed ? "✓" : "○"}
                    </span>
                    {subSection.title}
                    <button
                      className={`bookmark-button ${
                        isBookmarked(index, subIndex) ? "bookmarked" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(index, subIndex);
                      }}
                    >
                      {isBookmarked(index, subIndex) ? "★" : "☆"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
