import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import type { NavLinkRenderProps } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Import icons for mobile menu

// Define types for props
interface NavItem {
  name: string;
  path: string;
}

interface NavbarProps {
  brandName: string;
  navItems: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ brandName, navItems }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand name */}
        <Link to="/" className="navbar-brand">
          {brandName}
        </Link>

        {/* Mobile menu button */}
        {/* The Menu and X icons from lucide-react are used here */}
        <button className="mobile-menu-button" onClick={toggleMobileMenu} aria-label="Toggle navigation">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation links */}
        <div className="nav-links-desktop">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }: NavLinkRenderProps) =>
                isActive ? 'nav-links-desktop-link active' : 'nav-links-desktop-link'
              }
              end={item.path === '/'}
            >
              {item.name}
            </NavLink>
          ))}
          {/* Example of a dashboard button */}
          <Link to="/dashboard" className="dashboard-button">
            Dashboard
          </Link>
        </div>
      </div>

      {/* Mobile navigation links (conditionally rendered) */}
      {isMobileMenuOpen && (
        <div className="nav-links-mobile">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }: NavLinkRenderProps) =>
                isActive ? 'nav-links-mobile-link active' : 'nav-links-mobile-link'
              }
              onClick={toggleMobileMenu} // Close menu on link click
              end={item.path === '/'}
            >
              {item.name}
            </NavLink>
          ))}
          {/* Example of a dashboard button for mobile */}
          <Link to="/dashboard" className="dashboard-button-mobile" onClick={toggleMobileMenu}>
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;