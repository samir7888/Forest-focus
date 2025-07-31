"use client";

import React from "react";
import Link from "next/link";
import { AdUnit } from "../AdSense";
import styles from "../../styles/components/Footer.module.scss";

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} ${className || ""}`}>
      <div className={styles.container}>
        {/* AdSense Unit Placement Area */}
        {/* <div className={styles.adSection}>
          <AdUnit
            adSlot="0987654321"
            adFormat="auto"
            className="footer-ad"
            style={{ maxWidth: "728px", margin: "0 auto" }}
          />
        </div> */}

        {/* Footer Content */}
        <div className={styles.content}>
          {/* Logo and Description */}
          <div className={styles.brandSection}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>🌲</div>
              <span className={styles.logoText}>ForestFocus</span>
            </div>
            <p className={styles.description}>
              Stay focused and productive with our nature-inspired Pomodoro
              timer.
            </p>
          </div>

          {/* Navigation Links */}
          <div className={styles.linksSection}>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkGroupTitle}>Navigation</h4>
              <ul className={styles.linkList}>
                <li className={styles.linkItem}>
                  <Link href="/" className={styles.link}>
                    Timer
                  </Link>
                </li>
                <li className={styles.linkItem}>
                  <Link href="/about" className={styles.link}>
                    About
                  </Link>
                </li>
                <li className={styles.linkItem}>
                  <Link href="/contact" className={styles.link}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.linkGroupTitle}>Resources</h4>
              <ul className={styles.linkList}>
                <li className={styles.linkItem}>
                  <a
                    href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pomodoro Technique
                  </a>
                </li>
                <li className={styles.linkItem}>
                  <a
                    href="#"
                    className={styles.link}
                    onClick={(e) => e.preventDefault()}
                  >
                    Privacy Policy
                  </a>
                </li>
                <li className={styles.linkItem}>
                  <a
                    href="#"
                    className={styles.link}
                    onClick={(e) => e.preventDefault()}
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright and Credits */}
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            <p>&copy; {currentYear} ForestFocus. All rights reserved.</p>
          </div>
          <div className={styles.credits}>
            <p>Made with 🌱 for productivity and focus</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
