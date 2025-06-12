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
    <div className="persona-bio-card"> {/* Used custom class */}
      <h3 className="persona-bio-name">{name}</h3> {/* Used custom class */}
      <p className="persona-bio-text">{bio}</p> {/* Used custom class */}

      <div className="persona-bio-section"> {/* Used custom class */}
        <h4 className="persona-bio-section-title">Professional Background</h4> {/* Used custom class */}
        <ul className="persona-bio-list"> {/* Used custom class */}
          {professionalBackground.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="persona-bio-section"> {/* Used custom class */}
        <h4 className="persona-bio-section-title">Interests</h4> {/* Used custom class */}
        <ul className="persona-bio-list"> {/* Used custom class */}
          {interests.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="persona-bio-section section-full-width"> {/* Used custom classes */}
        <h4 className="persona-bio-section-title">Experience & Achievements</h4> {/* Used custom class */}
        <ul className="persona-bio-list"> {/* Used custom class */}
          {experience.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};