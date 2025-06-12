import React from 'react';
// PersonaBio will now be passed as a prop, so direct import here might not always be needed depending on usage.
// If PersonaBio is still directly used for other dynamic content within PersonaPage, keep the import.
// For this change, we'll assume it's primarily passed as a child.

// Define the props for the PersonaPage component
interface PersonaPageProps {
  // Children allows PersonaBio (or any other component) to be passed into PersonaPage
  children: React.ReactNode;
  // title: string; // Removed title prop
  // intro: string; // Removed intro prop
}

export const PersonaPage: React.FC<PersonaPageProps> = ({ children }) => { // Removed title, intro from destructuring
  return (
    <div className="persona-page-container">
      {/* <h1 className="persona-page-title">{title}</h1> */} {/* Removed title rendering */}
      {/* <p className="persona-page-intro"> */}
        {/* {intro} */} {/* Removed intro rendering ----- probably decide this part later-------------------------*/}
      {/* </p> */}

      {/* The PersonaBio component (or any other child) is rendered here */}
      {children}

      {/* You can add more content or other elements here */}
    </div>
  );
};
