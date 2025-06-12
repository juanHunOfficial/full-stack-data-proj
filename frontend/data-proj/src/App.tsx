// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
// import './App.css'; // No longer needed as styles are in styles.css
import { HomePage } from './pages/HomePage';
import Navbar from './components/Navbar';
import { PersonaPage } from './pages/PersonaPage'; // Import PersonaPage

// Define types (can be moved to a types.ts file for larger apps)
interface NavItem {
  name: string;
  path: string; // Use 'path' for React Router 'to' prop
}

interface PersonaData {
  id: string; // Add an ID for easy lookup in routes
  name: string;
  bio: string;
  professionalBackground: string[];
  interests: string[];
  experience: string[];
}

function App() {
  // Sample data for different personas (centralized here or in a separate data file)
  const personas: Array<PersonaData> = [
    {
      id: "james", // Use a unique ID that matches the route path
      name: "James Smith",
      bio: "James is a highly skilled data analyst with over 8 years of experience in market research and business intelligence. He excels at transforming complex datasets into actionable insights that drive strategic decisions. His analytical prowess and strategic thinking make him an invaluable asset to any project.",
      professionalBackground: [
        "Senior Data Analyst, Global Solutions Inc. (2020 - Present): Led analytics for key client projects, improving data-driven decision-making.",
        "Market Research Lead, Innovate Solutions (2015 - 2020): Conducted comprehensive market analyses and presented findings to executive teams.",
        "Data Specialist, Insightful Co. (2012 - 2015): Developed reporting dashboards and optimized data collection processes.",
        "B.S. in Statistics, State University (2012)",
      ],
      interests: [
        "Artificial Intelligence & Machine Learning in business applications",
        "Advanced Data Visualization techniques",
        "Mentoring aspiring data professionals",
        "Exploring new statistical methodologies",
        "Hiking and outdoor photography",
      ],
      experience: [
        "Successfully designed and implemented a predictive analytics model that increased sales forecast accuracy by 15% within the first year.",
        "Managed end-to-end data pipelines for over 20 critical client projects, ensuring data integrity and availability.",
        "Developed and delivered engaging presentations of complex data insights to both technical and non-technical stakeholders.",
        "Spearheaded a data governance initiative, resulting in a 20% improvement in data quality scores across key datasets.",
        "Contributed to open-source data analytics projects and presented at industry conferences.",
      ],
    },
    {
      id: "juan",
      name: "Juan Perez",
      bio: "Juan is a creative full-stack developer specializing in user-centric web applications. With a passion for clean code and intuitive design, he brings ideas to life from concept to deployment. His expertise spans both front-end frameworks and robust back-end systems.",
      professionalBackground: [
        "Lead Full-Stack Developer, Global Solutions Inc. (2021 - Present)",
        "Web Developer, CreativeTech Agency (2017 - 2021)",
        "B.S. in Computer Science, City University (2017)",
      ],
      interests: [
        "Building scalable web services",
        "Open-source contributions",
        "Competitive programming",
        "Digital art and graphic design",
        "Learning new programming languages",
      ],
      experience: [
        "Architected and deployed a new client portal, reducing user onboarding time by 30%.",
        "Implemented RESTful APIs and integrated with various third-party services.",
        "Optimized database queries, leading to a 20% improvement in application performance.",
        "Collaborated with UX/UI designers to translate wireframes into interactive web interfaces.",
        "Led weekly code review sessions to ensure code quality and knowledge sharing.",
      ],
    },
    {
      id: "kenny",
      name: "Kenny Brown",
      bio: "Kenny is an experienced project manager known for his exceptional leadership and organizational skills. He consistently delivers complex projects on time and within budget, effectively coordinating cross-functional teams and managing stakeholder expectations.",
      professionalBackground: [
        "Senior Project Manager, Global Solutions Inc. (2019 - Present)",
        "IT Project Coordinator, Enterprise Solutions (2014 - 2019)",
        "PMP Certified (2016)",
        "B.A. in Business Administration, National College (2013)",
      ],
      interests: [
        "Agile methodologies and Scrum mastery",
        "Risk management and mitigation strategies",
        "Team building and motivational leadership",
        "Strategic planning and execution",
        "Playing chess and hiking",
      ],
      experience: [
        "Successfully managed a portfolio of 5+ concurrent projects with a combined budget of over $5M.",
        "Implemented a new project management framework that improved team collaboration and communication by 25%.",
        "Identified and mitigated key project risks, preventing potential delays and cost overruns.",
        "Facilitated stakeholder workshops and managed communication channels for complex initiatives.",
        "Trained and mentored junior project managers in best practices and project lifecycle management.",
      ],
    }
  ];

  // Dynamically create navItems based on persona data
  const navItems: NavItem[] = [
    { name: 'Home', path: '/' }, // Root path for Home
    ...personas.map(p => ({ name: p.name.split(' ')[0], path: `/persona/${p.id}` })), // e.g., /persona/james
    { name: 'Contact', path: '/contact' }, // Path for the contact page
    { name: 'About', path: '/about' } // Path for the about page
  ];

  return (
    <div className="App-container"> {/* Replaced inline style with className */}
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
          element={<PersonaPage personas={personas} />} // Pass personas data to PersonaPage
        />

        {/* Route for the Contact page */}
        <Route
          path="/contact"
          element={
            <main className="main-content page-card"> {/* Added page-card class */}
              <section id="contact-us" className="text-center"> {/* Added text-center class */}
                <h2 className="section-heading">Contact Us</h2>
                <p className="page-text">This is the placeholder for our Contact Us page. Please reach out to us!</p>
                {/* You can add a contact form or contact details here */}
              </section>
            </main>
          }
        />

        {/* Route for a dedicated About page */}
        <Route
          path="/about"
          element={
            <main className="main-content page-card"> {/* Added page-card class */}
              <section id="about-page" className="text-center"> {/* Added text-center class */}
                <h2 className="section-heading">About Our Company</h2>
                <p className="page-text">
                  We are a leading provider of professional services, dedicated to delivering innovative solutions
                  and exceptional value to our clients. Our team comprises experts across various domains,
                  committed to excellence and driving success.
                </p>
                <p className="page-text margin-top-small">
                  Learn more about our mission, vision, and values on this page.
                </p>
              </section>
            </main>
          }
        />

        {/* Optional: A catch-all route for 404 Not Found pages */}
        <Route path="*" element={
          <main className="main-content page-card"> {/* Added page-card class */}
            <h2 className="section-heading text-center">404 - Page Not Found</h2> {/* Added text-center class */}
            <p className="page-text text-center">Oops! The page you are looking for does not exist.</p> {/* Added text-center class */}
          </main>
        } />
      </Routes>
    </div>
  );
}

export default App;
