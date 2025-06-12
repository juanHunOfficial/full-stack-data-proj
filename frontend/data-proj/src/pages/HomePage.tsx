import React from 'react';
import { Users, Briefcase, Award } from 'lucide-react'; // Importing relevant icons

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
    { name: "David Chen", role: "Lead Developer", description: "A key architect behind our core software solutions." },
  ];

  return (
    <main className="main-content">
      {/* Our Team Section */}
      <section id="our-team">
        <h2 className="section-heading">
          <Users size={28} color="#4f46e5" /> {/* Icon for Our Team */}
          Our Team
        </h2>
        <p>
          At Global Solutions Inc., we are a diverse group of passionate professionals dedicated to delivering excellence.
          Our collaborative environment fosters innovation and problem-solving, ensuring we meet our clients' needs with cutting-edge solutions.
        </p>
        <p className="mt-2">
          We believe in continuous learning and growth, empowering each team member to contribute their unique skills and perspectives to every project.
        </p>
      </section>

      {/* Project Overview Section */}
      <section id="project-overview">
        <h2 className="section-heading">
          <Briefcase size={28} color="#4f46e5" /> {/* Icon for Project Overview */}
          Project Overview
        </h2>
        <p>
          Our projects are driven by a clear understanding of our clients' challenges and a commitment to measurable results.
          From initial concept to final implementation, we maintain rigorous standards of quality and efficiency.
        </p>
        <p className="mt-2">
          We specialize in custom software development, data analytics, and cloud solutions, designed to optimize business operations and foster sustainable growth.
        </p>
      </section>

      {/* Meet the Team Section */}
      <section id="meet-the-team">
        <h2 className="section-heading">
          <Award size={28} color="#4f46e5" /> {/* Icon for Meet the Team */}
          Meet the Team
        </h2>
        <p>
          Get to know the individuals who make Global Solutions Inc. thrive. Each member brings a wealth of experience and expertise to their role, contributing to our collective success.
        </p>
        <div className="team-members-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member-card">
              <h3 className="team-member-name">{member.name}</h3>
              <p className="team-member-role">{member.role}</p>
              <p className="team-member-description">{member.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
