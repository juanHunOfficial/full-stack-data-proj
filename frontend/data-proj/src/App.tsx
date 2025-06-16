import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import { HomePage } from './pages/HomePage';
import Navbar from './components/Navbar';
import { PersonaPage } from './pages/PersonaPage'; // Import PersonaPage
import personas from './assets/personaData.json'; // Import personas data from a JSON file

// Define types for a SINGLE persona object
// Renamed from 'personas' to 'PersonaData' to avoid name collision with the imported value
interface PersonaData {
  id: string; // Add an ID for easy lookup in routes
  name: string;
  bio: string;
  professionalBackground: string[];
  interests: string[];
  experience: string[];
}

// Define type for navigation items
interface NavItem {
  name: string;
  path: string; // Use 'path' for React Router 'to' prop
}


function App() {
  // 'personas' is already imported from the JSON file and is implicitly typed as PersonaData[]
  // No need for a redundant declaration like // const personas: Array<PersonaData> = personas

  // Dynamically create navItems based on persona data
  const navItems: NavItem[] = [
    { name: 'Home', path: '/' }, // Root path for Home
    // Ensure personas is an array before mapping
    ...(personas as PersonaData[]).map(p => ({ name: p.name.split(' ')[0], path: `/persona/${p.id}` })), // e.g., /persona/james
    { name: 'Contact', path: '/contact' }, // Path for the contact page
    { name: 'About', path: '/about' } // Path for the about page
  ];

  return (
    <div className="app-container">
      {/* Navbar with updated navItems for React Router */}
      <Navbar
        brandName="Professional Service"
        navItems={navItems}
      />

      {/* Define your routes using Routes and Route */}
      <Routes>
        {/* Route for the Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* Dynamic route for persona pages */}
        {/* :personaId is a URL parameter that can be accessed via useParams hook */}
        <Route
          path="/persona/:personaId"
          element={<PersonaPage personas={personas as PersonaData[]} />} // Pass personas data to PersonaPage, explicitly cast
        />

        {/* Route for the Contact page */}
        <Route
          path="/contact"
          element={
            <main className="main-content">
              <section id="contact-us">
                <h2 className="section-heading">Contact Us</h2>
                <p>This is the placeholder for our Contact Us page. Please reach out to us!</p>
              </section>
            </main>
          }
        />

        {/* Route for a dedicated About page */}
        <Route
          path="/about"
          element={
            <main className="main-content">
              <section id="about-page">
                <h2 className="section-heading">About Our Company</h2>
                <p>
                  We are a leading provider of professional services, dedicated to delivering innovative solutions
                  and exceptional value to our clients. Our team comprises experts across various domains,
                  committed to excellence and driving success.
                </p>
                <p>
                  Learn more about our mission, vision, and values on this page.
                </p>
              </section>
            </main>
          }
        />

        {/* A catch-all route for 404 Not Found pages */}
        <Route path="*" element={
          <main className="main-content">
            <section>
              <h2 className="section-heading">404 - Page Not Found</h2>
              <p>Oops! The page you are looking for does not exist.</p>
            </section>
          </main>
        } />
      </Routes>
    </div>
  );
}

export default App;