import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const CoursePage = () => {
  const initialSections = [
    { title: "introduction", completed: false, subSections: [] },
    { title: "chapter1", completed: false, subSections: [] },
    { title: "chapter2", completed: false, subSections: [] },
    { title: "chapter3", completed: false, subSections: [] },
    { title: "chapter4", completed: false, subSections: [] },
  ];

  const [sections, setSections] = useState(initialSections);
  const [activeSection, setActiveSection] = useState(0);

  const handleSectionClick = (index) => {
    setActiveSection(index);
  };

  const handleNext = () => {
    const newSections = [...sections];
    newSections[activeSection].completed = true;
    setSections(newSections);
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
    }
  };

  const handlePrevious = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  return (
    <div className="course-page">
      <Sidebar
        sections={sections}
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
        progress={(activeSection / sections.length) * 100}
        markSectionComplete={handleNext}
      />
      <MainContent
        content={sections[activeSection].title}
        onPrevious={handlePrevious}
        onNext={handleNext}
        progress={(activeSection / sections.length) * 100}
      />
    </div>
  );
};

export default CoursePage;
