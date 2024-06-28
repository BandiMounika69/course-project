import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import "./App.css";

const sections = [
  {
    title: "Introduction",
    subSections: [
      { title: "Video 1", src: "path/to/video1.mp4", completed: false },
      { title: "Video 2", src: "path/to/video2.mp4", completed: false },
      { title: "Video 3", src: "path/to/video3.mp4", completed: false },
    ],
    completed: false,
  },
  {
    title: "Chapter 1",
    subSections: [
      { title: "Video 1", src: "path/to/video1.mp4", completed: false },
      { title: "Video 2", src: "path/to/video2.mp4", completed: false },
      { title: "Video 3", src: "path/to/video3.mp4", completed: false },
    ],
    completed: false,
  },
  {
    title: "Chapter 2",
    subSections: [
      { title: "Video 1", src: "path/to/video1.mp4", completed: false },
      { title: "Video 2", src: "path/to/video2.mp4", completed: false },
      { title: "Video 3", src: "path/to/video3.mp4", completed: false },
    ],
    completed: false,
  },
  {
    title: "Chapter 3",
    subSections: [
      { title: "Video 1", src: "path/to/video1.mp4", completed: false },
      { title: "Video 2", src: "path/to/video2.mp4", completed: false },
      { title: "Video 3", src: "path/to/video3.mp4", completed: false },
    ],
    completed: false,
  },
  {
    title: "Discussion",
    completed: false,
  },
  {
    title: "Certificate",
    completed: false,
  },
];

const App = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [activeSubSection, setActiveSubSection] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const storedProgress = JSON.parse(localStorage.getItem("progress")) || 0;
    setProgress(storedProgress);
  }, []);

  const handleSectionClick = (sectionIndex, subSectionIndex = null) => {
    setActiveSection(sectionIndex);
    setActiveSubSection(subSectionIndex);
    const totalSections = sections.length;
    const totalSubSections = sections[sectionIndex].subSections
      ? sections[sectionIndex].subSections.length
      : 0;
    const progress =
      subSectionIndex !== null
        ? ((sectionIndex + subSectionIndex / totalSubSections) /
            totalSections) *
          100
        : (sectionIndex / totalSections) * 100;
    setProgress(progress);
    localStorage.setItem("progress", JSON.stringify(progress));
  };

  const handlePrevious = () => {
    if (activeSubSection !== null && activeSubSection > 0) {
      handleSectionClick(activeSection, activeSubSection - 1);
    } else if (activeSection > 0) {
      handleSectionClick(activeSection - 1);
    }
  };

  const handleNext = () => {
    const newSections = [...sections];
    if (
      activeSubSection !== null &&
      activeSubSection < sections[activeSection].subSections.length - 1
    ) {
      newSections[activeSection].subSections[activeSubSection].completed = true;
      handleSectionClick(activeSection, activeSubSection + 1);
    } else if (activeSection < sections.length - 1) {
      newSections[activeSection].completed = true;
      handleSectionClick(activeSection + 1);
    }
    const newProgress =
      activeSubSection !== null
        ? ((activeSection +
            (activeSubSection + 1) /
              sections[activeSection].subSections.length) /
            sections.length) *
          100
        : ((activeSection + 1) / sections.length) * 100;
    setProgress(newProgress);
    localStorage.setItem("progress", JSON.stringify(newProgress));
  };

  return (
    <div className="app">
      <Sidebar
        sections={sections}
        activeSection={activeSection}
        activeSubSection={activeSubSection}
        onSectionClick={handleSectionClick}
      />
      <MainContent
        content={
          activeSubSection !== null
            ? sections[activeSection].subSections[activeSubSection].src
            : sections[activeSection].title
        }
        onPrevious={handlePrevious}
        onNext={handleNext}
        progress={progress}
      />
    </div>
  );
};

export default App;
