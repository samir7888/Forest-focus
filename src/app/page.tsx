"use client";

import React, { useCallback } from "react";
import { PomodoroTimer } from "../components/Timer";
import { useSessionTracking } from "../hooks/useSessionTracking";
import styles from "../styles/pages/Home.module.scss";

export default function Home() {
  // Session tracking for statistics display
  const { sessionStats, resetStats } = useSessionTracking();

  // Handle session completion with user feedback
  const handleSessionComplete = useCallback((sessionCount: number) => {
    console.log(`Session ${sessionCount} completed!`);

    // Optional: Show browser notification if permission granted
    if (
      typeof window !== "undefined" &&
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      new Notification("🌲 ForestFocus Session Complete!", {
        body: `Great work! You've completed ${sessionCount} focus sessions today.`,
        icon: "/favicon.ico",
      });
    }
  }, []);

  // Handle stats reset
  const handleResetStats = useCallback(() => {
    if (
      window.confirm(
        "Are you sure you want to reset your session statistics? This action cannot be undone."
      )
    ) {
      resetStats();
    }
  }, [resetStats]);

  return (
    <div className={styles.homePage}>
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
            ForestFocus
          </h1>
          <p className={styles.subtitle}>
            Stay focused with nature-inspired Pomodoro sessions and grow your
            productivity forest
          </p>
        </header>

        {/* Main Content */}
        <main className={styles.mainContent}>
          {/* Welcome Message for New Users */}
          {sessionStats.completedSessions === 0 && (
            <div className={styles.welcomeMessage}>
              <p className={styles.message}>
                🌱 Welcome to ForestFocus! Start your first focus session and
                watch your productivity forest grow.
              </p>
            </div>
          )}

          {/* Session Statistics Overview */}
          <section className={styles.sessionOverview}>
            <h2 className={styles.overviewTitle}>
              <span className={styles.icon}>📊</span>
              Your Progress
            </h2>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statValue}>
                  {sessionStats.completedSessions}
                </span>
                <span className={styles.statLabel}>Sessions</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>
                  {Math.round(sessionStats.totalFocusTime)}
                </span>
                <span className={styles.statLabel}>Minutes</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>
                  {sessionStats.currentStreak}
                </span>
                <span className={styles.statLabel}>Streak</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>
                  {sessionStats.lastSessionDate
                    ? new Date(
                        sessionStats.lastSessionDate
                      ).toLocaleDateString()
                    : "Never"}
                </span>
                <span className={styles.statLabel}>Last Session</span>
              </div>
            </div>

            {/* Reset Statistics Option */}
            {sessionStats.completedSessions > 0 && (
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <button
                  onClick={handleResetStats}
                  style={{
                    background: "transparent",
                    border: "1px solid var(--warning-color)",
                    color: "var(--warning-color)",
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "var(--warning-color)";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--warning-color)";
                  }}
                >
                  Reset Statistics
                </button>
              </div>
            )}
          </section>

          {/* Main Timer Section */}
          <section className={styles.timerSection}>
            <PomodoroTimer
              initialFocusTime={25}
              initialBreakTime={5}
              onSessionComplete={handleSessionComplete}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
