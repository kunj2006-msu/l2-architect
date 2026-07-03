'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Concepts', path: '/concepts' },
    { name: 'Live Prices', path: '/prices' },
    { name: 'Block Simulator', path: '/simulator' }
  ];

  return (
    <header className="global-header" id="main-header">
      <div class="header-container">
        <Link href="/" className="logo" id="header-logo">
          <span className="logo-icon"></span>L2_ARCHITECT
        </Link>
        
        <button 
          className="menu-toggle" 
          id="menu-toggle" 
          aria-expanded={isOpen} 
          aria-controls="nav-menu"
          onClick={toggleMenu}
        >
          {isOpen ? 'CLOSE_' : 'MENU_'}
        </button>

        <nav className="nav-menu-wrapper" id="nav-menu-wrapper">
          <ul className={`nav-menu ${isOpen ? 'open' : ''}`} id="nav-menu">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.path} className="nav-item">
                  <Link 
                    href={link.path} 
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
