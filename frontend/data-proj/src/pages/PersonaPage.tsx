import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { PersonaBio } from '../components/PersonaBio';
// No longer needed, styles are in styles.css
// import './PersonaPage.css';

// Define types for PersonaData (re-used from App.tsx or a types.ts file)
interface PersonaData {
  id: string;
  name: string;
  bio: string;
  professionalBackground: string[];
  interests: string[];
  experience: string[];
}

interface PersonaPageProps {
  personas: PersonaData[]; // Expect personas data as a prop
}

export const PersonaPage: React.FC<PersonaPageProps> = ({ personas }) => {
  // Use useParams to get the dynamic part of the URL (e.g., 'james' from /persona/james)
  const { personaId } = useParams<{ personaId: string }>();

  // Find the persona data based on the personaId from the URL
  const currentPersona = personas.find(p => p.id === personaId);

  if (!currentPersona) {
    // Handle the case where the persona ID doesn't match any data
    return (
      <main className="main-content page-card"> {/* Used custom class */}
        <h2 className="section-heading text-center">Persona Not Found</h2> {/* Used custom class */}
        <p className="page-text text-center">The persona you are looking for does not exist.</p> {/* Used custom class */}
      </main>
    );
  }

  return (
    <main className="main-content"> {/* Used custom class */}
      {/* Render PersonaBio with the found persona's data */}
      <PersonaBio
        name={currentPersona.name}
        bio={currentPersona.bio}
        professionalBackground={currentPersona.professionalBackground}
        interests={currentPersona.interests}
        experience={currentPersona.experience}
      />
    </main>
  );
};