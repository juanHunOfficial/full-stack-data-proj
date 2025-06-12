import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Importing icons from lucide-react

// Define the type for a single navigation item
interface NavItem {
  name: string;
  href: string;
}

// Define the props for the Navbar component
interface NavbarProps {
  brandName: string;
  navItems: NavItem[];
}

// Navbar component
const Navbar: React.FC<NavbarProps> = ({ brandName, navItems }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Function to toggle the mobile menu state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand Name */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <a href="/" className="navbar-brand">
            {brandName}
          </a>
          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="mobile-menu-button"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="nav-links-desktop">
          {navItems.map((item: NavItem) => (
            <a
              key={item.name}
              href={item.href}
            >
              {item.name}
            </a>
          ))}
          <a
            href="#dashboard"
            className="dashboard-button"
          >
            Dashboard
          </a>
        </div>

        {/* Mobile Navigation Links (Conditional Rendering) */}
        {isOpen && (
          <div className="nav-links-mobile">
            {navItems.map((item: NavItem) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)} // Close menu on item click
              >
                {item.name}
              </a>
            ))}
            <a
              href="#dashboard"
              onClick={() => setIsOpen(false)}
              className="dashboard-button-mobile"
            >
              Dashboard
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; // Export the Navbar component
