import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for internal navigation
import { Users, Briefcase, Award } from 'lucide-react'; // Importing relevant icons
// No longer needed, styles are in styles.css
// import './HomePage.css';

// Define a simple interface for team members if you were to list them
interface TeamMember {
  name: string;
  role: string;
  description: string;
}

export const HomePage: React.FC = () => {
  // Placeholder data for team members
  const teamMembers: TeamMember[] = [
    { name: "Alice Johnson", role: "CEO", description: "Leads with a vision for innovative solutions and strategic growth." },
    { name: "Bob Williams", role: "CTO", description: "Oversees all technological development and infrastructure." },
    { name: "Carol Davis", role: "Head of Marketing", description: "Drives our brand presence and customer engagement strategies." },
  ];

  return (
    <main className="main-content page-card"> {/* Used custom class */}
      {/* Welcome Section */}
      <section id="home-welcome" className="home-section text-center"> {/* Used custom classes */}
        <h1 className="home-heading">Welcome to Our Professional Service</h1> {/* Used custom class */}
        <p className="home-subheading">Connecting you with top-tier professionals for your needs.</p> {/* Used custom class */}
        <div className="button-group"> {/* Used custom class */}
          {/* Use Link for internal navigation to /contact */}
          <Link to="/contact" className="button button-primary"> {/* Used custom classes */}
            Contact Us
          </Link>
          {/* Use Link for internal navigation to /about */}
          <Link to="/about" className="button button-secondary"> {/* Used custom classes */}
            Learn More
          </Link>
        </div>
      </section>

      {/* Our Team Section */}
      <section id="our-team" className="home-section section-divider"> {/* Used custom classes */}
        <h2 className="section-heading with-icon"> {/* Used custom classes */}
          <Users size={28} color="#4f46e5" /> {/* Icon for Our Team */}
          <span>Our Team</span>
        </h2>
        <p className="section-text">
          At Global Solutions Inc., we are a diverse group of passionate professionals dedicated to delivering excellence.
          Our collaborative environment fosters innovation and problem-solving, ensuring we meet our clients' needs with cutting-edge solutions.
        </p>
        <p className="section-text margin-top-small">
          We believe in continuous learning and growth, empowering each team member to contribute their unique skills and perspectives to every project.
        </p>
      </section>

      {/* Project Overview Section */}
      <section id="project-overview" className="home-section section-divider"> {/* Used custom classes */}
        <h2 className="section-heading with-icon"> {/* Used custom classes */}
          <Briefcase size={28} color="#4f46e5" /> {/* Icon for Project Overview */}
          <span>Project Overview</span>
        </h2>
        <p className="section-text">
          Our projects are driven by a clear understanding of our clients' challenges and a commitment to measurable results.
          From initial concept to final implementation, we maintain rigorous standards of quality and efficiency.
        </p>
        <p className="section-text margin-top-small">
          We specialize in custom software development, data analytics, and cloud solutions, designed to optimize business operations and foster sustainable growth.
        </p>
      </section>

      {/* Meet the Team Section */}
      <section id="meet-the-team" className="home-section section-divider"> {/* Used custom classes */}
        <h2 className="section-heading with-icon"> {/* Used custom classes */}
          <Award size={28} color="#4f46e5" /> {/* Icon for Meet the Team */}
          <span>Meet the Team</span>
        </h2>
        <p className="section-text margin-bottom-medium">
          Get to know the individuals who make Global Solutions Inc. thrive. Each member brings a wealth of experience and expertise to their role, contributing to our collective success.
        </p>
        <div className="team-members-grid"> {/* Used custom class */}
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member-card"> {/* Used custom class */}
              <h3 className="team-member-name">{member.name}</h3> {/* Used custom class */}
              <p className="team-member-role">{member.role}</p> {/* Used custom class */}
              <p className="team-member-description">{member.description}</p> {/* Used custom class */}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};