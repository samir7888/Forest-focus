import React from "react";
import Link from "next/link";
import styles from "../../styles/pages/About.module.scss";

export default function About() {
  return (
    <div className={styles.aboutPage}>
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
            <span className={styles.emoji}>🌲</span>
            About ForestFocus
          </h1>
          <p className={styles.subtitle}>
            Grow your productivity with nature-inspired focus sessions
          </p>
        </header>

        {/* Main Content */}
        <main className={styles.mainContent}>
          {/* Introduction Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.icon}>🌱</span>
              What is ForestFocus?
            </h2>
            <div className={styles.content}>
              <p>
                ForestFocus is a nature-themed Pomodoro timer designed to help
                you maintain focus and boost productivity through structured
                work sessions. Inspired by the tranquility and growth of
                forests, our app creates a calming environment that encourages
                deep focus and sustainable work habits.
              </p>
              <p>
                The Pomodoro Technique, developed by Francesco Cirillo, breaks
                work into focused 25-minute intervals followed by short breaks.
                This method has been proven to improve concentration, reduce
                mental fatigue, and increase overall productivity.
              </p>
            </div>
          </section>

          {/* Features Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.icon}>✨</span>
              Key Features
            </h2>
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>⏰</div>
                <h3 className={styles.featureTitle}>Customizable Timer</h3>
                <p className={styles.featureDescription}>
                  Set your own focus and break durations (1-120 minutes) to
                  match your workflow and preferences.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🌳</div>
                <h3 className={styles.featureTitle}>Visual Progress</h3>
                <p className={styles.featureDescription}>
                  Watch your productivity forest grow with each completed
                  session through beautiful visual indicators.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>📊</div>
                <h3 className={styles.featureTitle}>Session Tracking</h3>
                <p className={styles.featureDescription}>
                  Monitor your progress with detailed statistics including
                  completed sessions, total focus time, and streaks.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>💾</div>
                <h3 className={styles.featureTitle}>Local Storage</h3>
                <p className={styles.featureDescription}>
                  Your data stays private and secure, stored locally on your
                  device with no account required.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>📱</div>
                <h3 className={styles.featureTitle}>Responsive Design</h3>
                <p className={styles.featureDescription}>
                  Works seamlessly across all devices - desktop, tablet, and
                  mobile for focus sessions anywhere.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🎨</div>
                <h3 className={styles.featureTitle}>Forest Theme</h3>
                <p className={styles.featureDescription}>
                  Enjoy a calming, nature-inspired interface designed to reduce
                  distractions and promote focus.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.icon}>🔄</span>
              How It Works
            </h2>
            <div className={styles.stepsContainer}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Set Your Timer</h3>
                  <p className={styles.stepDescription}>
                    Choose your focus duration (default 25 minutes) and break
                    time (default 5 minutes) in the settings.
                  </p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Start Focusing</h3>
                  <p className={styles.stepDescription}>
                    Click start and focus on your task. Watch the visual
                    indicator grow as you progress through your session.
                  </p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Take a Break</h3>
                  <p className={styles.stepDescription}>
                    When the timer completes, take a well-deserved break. The
                    app will automatically switch to break mode.
                  </p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Track Progress</h3>
                  <p className={styles.stepDescription}>
                    Monitor your completed sessions and watch your productivity
                    forest grow with each successful focus period.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.icon}>🎯</span>
              Why Use the Pomodoro Technique?
            </h2>
            <div className={styles.benefitsList}>
              <div className={styles.benefit}>
                <span className={styles.benefitIcon}>🧠</span>
                <div className={styles.benefitContent}>
                  <h3>Improved Focus</h3>
                  <p>
                    Short, focused bursts help maintain concentration and reduce
                    mental fatigue.
                  </p>
                </div>
              </div>
              <div className={styles.benefit}>
                <span className={styles.benefitIcon}>⚡</span>
                <div className={styles.benefitContent}>
                  <h3>Increased Productivity</h3>
                  <p>
                    Regular breaks prevent burnout and maintain high performance
                    throughout the day.
                  </p>
                </div>
              </div>
              <div className={styles.benefit}>
                <span className={styles.benefitIcon}>📈</span>
                <div className={styles.benefitContent}>
                  <h3>Better Time Management</h3>
                  <p>
                    Structured intervals help you estimate and plan tasks more
                    effectively.
                  </p>
                </div>
              </div>
              <div className={styles.benefit}>
                <span className={styles.benefitIcon}>🎉</span>
                <div className={styles.benefitContent}>
                  <h3>Sense of Achievement</h3>
                  <p>
                    Completing sessions provides regular wins and motivation to
                    continue.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to Grow Your Focus?</h2>
              <p className={styles.ctaDescription}>
                Start your first Pomodoro session and begin cultivating your
                productivity forest today.
              </p>
              <Link href="/" className={styles.ctaButton}>
                <span className={styles.ctaIcon}>🌲</span>
                Start Timer
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
