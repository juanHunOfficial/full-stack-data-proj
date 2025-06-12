import React from 'react';

// Define the props for the PersonaBio component
interface PersonaBioProps {
  name: string;
  bio: string;
  professionalBackground: string[];
  interests: string[];
  experience: string[];
}

export const PersonaBio: React.FC<PersonaBioProps> = ({
  name,
  bio,
  professionalBackground,
  interests,
  experience,
}) => {
  return (
    <div className="persona-bio-card">
      <h3 className="persona-bio-name">{name}</h3>
      <p className="persona-bio-text">{bio}</p>

      <div className="persona-bio-section">
        <h4 className="persona-bio-section-title">Professional Background</h4>
        <ul className="persona-bio-list">
          {professionalBackground.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="persona-bio-section">
        <h4 className="persona-bio-section-title">Interests</h4>
        <ul className="persona-bio-list">
          {interests.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="persona-bio-section">
        <h4 className="persona-bio-section-title">Experience</h4>
        <ul className="persona-bio-list">
          {experience.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
