import React from 'react';
import { HomePage } from './pages/HomePage';  
import { PersonaPage } from './pages/PersonaPage';
import { PersonaBio } from './components/PersonaBio';  

// Define types (can also be imported from a shared types file if you have one)
interface NavItem {
  name: string;
  href: string;
}

interface PersonaData {
  name: string;
  bio: string;
  professionalBackground: string[];
  interests: string[];
  experience: string[];
}

export const Router: React.FC = () => {
  // Sample data for different personas (moved from App.tsx)
  const jamesData: PersonaData = {
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
  };

  const juanData: PersonaData = {
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
  };

  const kennyData: PersonaData = {
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
  };


  // State to force re-render on hash change
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);

  // Effect to listen for hash changes
  React.useEffect(() => {
    const handleHashChange = () => {
      forceUpdate();
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderCurrentPage = () => {
    const currentHash = window.location.hash.slice(1); // Get hash without '#'

    switch (currentHash) {
      case 'james-persona':
        return (
          <PersonaPage>
            <PersonaBio
              name={jamesData.name}
              bio={jamesData.bio}
              professionalBackground={jamesData.professionalBackground}
              interests={jamesData.interests}
              experience={jamesData.experience}
            />
          </PersonaPage>
        );
      case 'juan-persona':
        return (
          <PersonaPage>
            <PersonaBio
              name={juanData.name}
              bio={juanData.bio}
              professionalBackground={juanData.professionalBackground}
              interests={juanData.interests}
              experience={juanData.experience}
            />
          </PersonaPage>
        );
      case 'kenny-persona':
        return (
          <PersonaPage>
            <PersonaBio
              name={kennyData.name}
              bio={kennyData.bio}
              professionalBackground={kennyData.professionalBackground}
              interests={kennyData.interests}
              experience={kennyData.experience}
            />
          </PersonaPage>
        );
      case 'contact-us':
        return (
          <main className="main-content">
            <section id="contact-us">
              <h2 className="section-heading">Contact Us</h2>
              <p>This is the placeholder for our Contact Us page. Please reach out to us!</p>
              {/* You can add a contact form or contact details here */}
            </section>
          </main>
        );
      case 'home': // Default home page if hash is #home
      default:   // Also default if no hash or unrecognized hash
        return <HomePage />;
    }
  };

  return (
    <>
      {renderCurrentPage()}
    </>
  );
};

