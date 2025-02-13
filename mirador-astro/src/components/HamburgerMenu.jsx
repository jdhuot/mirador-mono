import { useState } from "react";
import "../styles/hamburgerMenu.scss";

export default function HamburgerMenu({ menuItems }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="hamburger-container">
      {/* Burger Button */}
      <button className={`burger-menu ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Menu */}
      <nav className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className={item.submenu ? "dropdown" : ""}>
              <a href={item.link} onClick={item.submenu ? (e) => {
                e.preventDefault();
                toggleDropdown(index);
              } : undefined}>
                {item.title} {item.submenu && <span>▾</span>}
              </a>

              {/* Dropdown */}
              {item.submenu && (
                <ul className={`dropdown-menu ${openDropdown === index ? "show" : ""}`}>
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <a href={subItem.link}>{subItem.title}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li><a href="tel:+14037180125"><button class="button-secondary nav-button">(403) 718-0125</button></a></li>
        </ul>
      </nav>
    </div>
  );
}
