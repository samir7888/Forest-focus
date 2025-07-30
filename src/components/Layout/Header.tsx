"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdUnit } from "../AdSense";
import Icon from "../UI/Icon";
import styles from "../../styles/components/Header.module.scss";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${className || ""}`}>
      <div className={styles.container}>
        {/* Logo and Branding */}
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logoIcon}>
              <Icon
                name="forest"
                size={32}
                className="interactive"
                alt="ForestFocus logo"
              />
            </div>
            <span className={styles.logoText}>ForestFocus</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>
                <Icon name="tree" size={18} className="nav-icon" alt="" />
                Timer
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/about" className={styles.navLink}>
                <Icon name="leaf" size={18} className="nav-icon" alt="" />
                About
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/contact" className={styles.navLink}>
                <Icon name="sun" size={18} className="nav-icon" alt="" />
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label={`${isMobileMenuOpen ? "Close" : "Open"} mobile menu`}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span
            className={`${styles.hamburgerLine} ${
              isMobileMenuOpen ? styles.open : ""
            }`}
            aria-hidden="true"
          ></span>
          <span
            className={`${styles.hamburgerLine} ${
              isMobileMenuOpen ? styles.open : ""
            }`}
            aria-hidden="true"
          ></span>
          <span
            className={`${styles.hamburgerLine} ${
              isMobileMenuOpen ? styles.open : ""
            }`}
            aria-hidden="true"
          ></span>
        </button>

        {/* Mobile Navigation */}
        <nav
          id="mobile-navigation"
          className={`${styles.mobileNav} ${
            isMobileMenuOpen ? styles.open : ""
          }`}
          aria-label="Mobile navigation"
          aria-hidden={!isMobileMenuOpen}
        >
          <ul className={styles.mobileNavList} role="list">
            <li className={styles.mobileNavItem}>
              <Link
                href="/"
                className={styles.mobileNavLink}
                onClick={closeMobileMenu}
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                <Icon name="tree" size={20} className="nav-icon" alt="" />
                Timer
              </Link>
            </li>
            <li className={styles.mobileNavItem}>
              <Link
                href="/about"
                className={styles.mobileNavLink}
                onClick={closeMobileMenu}
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                <Icon name="leaf" size={20} className="nav-icon" alt="" />
                About
              </Link>
            </li>
            <li className={styles.mobileNavItem}>
              <Link
                href="/contact"
                className={styles.mobileNavLink}
                onClick={closeMobileMenu}
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                <Icon name="sun" size={20} className="nav-icon" alt="" />
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className={styles.mobileOverlay}
            onClick={closeMobileMenu}
            aria-hidden="true"
          ></div>
        )}
      </div>

      {/* AdSense Unit */}
      <div className={styles.adSection}>
        <AdUnit
          adSlot="1234567890"
          adFormat="auto"
          className="header-ad"
          style={{ maxWidth: "728px", margin: "0 auto" }}
        />
      </div>
    </header>
  );
};

export default Header;
