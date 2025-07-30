import React from "react";
import Link from "next/link";
import styles from "../../styles/pages/Contact.module.scss";

export default function Contact() {
  return (
    <div className={styles.contactPage}>
      {/* Forest decorative elements */}
      <div className={`${styles.forestDecoration} ${styles.topLeft}`}>🌲</div>
      <div className={`${styles.forestDecoration} ${styles.topRight}`}>🌿</div>
      <div className={`${styles.forestDecoration} ${styles.bottomLeft}`}>
        🍃
      </div>
      <div className={`${styles.forestDecoration} ${styles.bottomRight}`}>
        🌳
      </div>

      <div className={styles.container}>
        {/* Page Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>
            <span className={styles.emoji}>📧</span>
            Contact Us
          </h1>
          <p className={styles.subtitle}>
            Get in touch with the ForestFocus team
          </p>
        </header>

        {/* Main Content */}
        <main className={styles.mainContent}>
          {/* Contact Information Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.icon}>🌱</span>
              Get In Touch
            </h2>
            <div className={styles.content}>
              <p>
                We'd love to hear from you! Whether you have questions,
                feedback, or suggestions for improving ForestFocus, don't
                hesitate to reach out.
              </p>
              <p>
                Your input helps us grow and improve the ForestFocus experience
                for everyone in our productivity community.
              </p>
            </div>
          </section>

          {/* Contact Methods */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.icon}>📬</span>
              Contact Methods
            </h2>
            <div className={styles.contactGrid}>
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>📧</div>
                <h3 className={styles.contactTitle}>Email</h3>
                <p className={styles.contactDescription}>
                  Send us an email for general inquiries, feedback, or support
                  questions.
                </p>
                <a
                  href="mailto:hello@forestfocus.app"
                  className={styles.contactLink}
                >
                  hello@forestfocus.app
                </a>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>🐛</div>
                <h3 className={styles.contactTitle}>Bug Reports</h3>
                <p className={styles.contactDescription}>
                  Found a bug or technical issue? Let us know so we can fix it
                  quickly.
                </p>
                <a
                  href="mailto:bugs@forestfocus.app"
                  className={styles.contactLink}
                >
                  bugs@forestfocus.app
                </a>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>💡</div>
                <h3 className={styles.contactTitle}>Feature Requests</h3>
                <p className={styles.contactDescription}>
                  Have an idea for a new feature? We'd love to hear your
                  suggestions!
                </p>
                <a
                  href="mailto:features@forestfocus.app"
                  className={styles.contactLink}
                >
                  features@forestfocus.app
                </a>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.icon}>❓</span>
              Frequently Asked Questions
            </h2>
            <div className={styles.faqContainer}>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  Is my data stored securely?
                </h3>
                <p className={styles.faqAnswer}>
                  Yes! All your session data is stored locally on your device
                  using localStorage. We don't collect or store any personal
                  information on our servers.
                </p>
              </div>

              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  Can I use ForestFocus offline?
                </h3>
                <p className={styles.faqAnswer}>
                  Once the app is loaded, the timer functionality works offline.
                  Your session data is saved locally and will persist between
                  visits.
                </p>
              </div>

              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  How do I reset my session statistics?
                </h3>
                <p className={styles.faqAnswer}>
                  You can reset your session history from the main timer page.
                  Look for the reset option in your session statistics display.
                </p>
              </div>

              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  Can I customize the timer durations?
                </h3>
                <p className={styles.faqAnswer}>
                  Absolutely! Click the settings button on the timer page to
                  customize both focus and break durations (1-120 minutes).
                </p>
              </div>
            </div>
          </section>

          {/* Response Time Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.icon}>⏰</span>
              Response Times
            </h2>
            <div className={styles.responseInfo}>
              <div className={styles.responseItem}>
                <span className={styles.responseIcon}>🚀</span>
                <div className={styles.responseContent}>
                  <h3>General Inquiries</h3>
                  <p>We typically respond within 24-48 hours</p>
                </div>
              </div>

              <div className={styles.responseItem}>
                <span className={styles.responseIcon}>🔧</span>
                <div className={styles.responseContent}>
                  <h3>Bug Reports</h3>
                  <p>Critical bugs are addressed within 24 hours</p>
                </div>
              </div>

              <div className={styles.responseItem}>
                <span className={styles.responseIcon}>💭</span>
                <div className={styles.responseContent}>
                  <h3>Feature Requests</h3>
                  <p>We review and respond within 3-5 business days</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to Start Focusing?</h2>
              <p className={styles.ctaDescription}>
                Head back to the timer and begin your next productive session in
                your growing digital forest.
              </p>
              <Link href="/" className={styles.ctaButton}>
                <span className={styles.ctaIcon}>🌲</span>
                Back to Timer
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
