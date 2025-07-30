import React, { useState, useCallback } from "react";
import { PomodoroTimerProps, TimerMode, TimerConfig } from "../../types/timer";
import { useTimer } from "../../hooks/useTimer";
import { useSessionTracking } from "../../hooks/useSessionTracking";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { TimerDisplay } from "./TimerDisplay";
import { TimerControls } from "./TimerControls";
import { VisualIndicator } from "./VisualIndicator";
import { SettingsPanel } from "../UI/SettingsPanel";
import { TimerErrorBoundary, StorageErrorBoundary } from "../UI/ErrorBoundary";
import styles from "../../styles/components/PomodoroTimer.module.scss";

/**
 * PomodoroTimer - Main orchestrator component that coordinates all timer functionality
 * Integrates timer logic, session tracking, and UI components
 */
export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  initialFocusTime = 25,
  initialBreakTime = 5,
  onSessionComplete,
}) => {
  // Settings panel state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Timer configuration with localStorage persistence and error handling
  const {
    value: timerConfig,
    setValue: setTimerConfig,
    error: storageError,
    isStorageAvailable,
  } = useLocalStorage<TimerConfig>("forestfocus-timer-config", {
    focusTime: initialFocusTime,
    breakTime: initialBreakTime,
    longBreakTime: 15,
    sessionsUntilLongBreak: 4,
  });

  // Session tracking hook
  const { sessionStats, incrementSession, updateTotalFocusTime } =
    useSessionTracking();

  // Timer completion handler
  const handleSessionComplete = useCallback(
    (sessionCount: number) => {
      // Increment session counter
      incrementSession();

      // Update total focus time (only for completed focus sessions)
      updateTotalFocusTime(timerConfig.focusTime);

      // Call external callback if provided
      onSessionComplete?.(sessionCount);

      // Optional: Show completion notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Session Complete!", {
          body: `Great job! You've completed ${sessionCount} focus sessions.`,
          icon: "/favicon.ico",
        });
      }
    },
    [
      incrementSession,
      updateTotalFocusTime,
      timerConfig.focusTime,
      onSessionComplete,
    ]
  );

  // Initialize timer hook with session completion handler
  const timer = useTimer({
    initialFocusTime: timerConfig.focusTime,
    initialBreakTime: timerConfig.breakTime,
    onSessionComplete: handleSessionComplete,
  });

  // Calculate progress percentage for visual indicator
  const calculateProgress = useCallback(() => {
    const totalTime =
      timer.mode === TimerMode.FOCUS
        ? timer.focusTime * 60
        : timer.breakTime * 60;
    const elapsed = totalTime - timer.timeRemaining;
    return totalTime > 0 ? (elapsed / totalTime) * 100 : 0;
  }, [timer.timeRemaining, timer.mode, timer.focusTime, timer.breakTime]);

  // Settings handlers
  const handleOpenSettings = useCallback(() => {
    setIsSettingsOpen(true);
  }, []);

  const handleCloseSettings = useCallback(() => {
    setIsSettingsOpen(false);
  }, []);

  // Settings save handler with localStorage persistence
  const handleSaveSettings = useCallback(
    (newConfig: TimerConfig) => {
      // Save to localStorage
      setTimerConfig(newConfig);

      // Update timer hook with new values
      timer.setFocusTime(newConfig.focusTime);
      timer.setBreakTime(newConfig.breakTime);
    },
    [setTimerConfig, timer]
  );

  return (
    <TimerErrorBoundary>
      <div
        className={styles.pomodoroTimer}
        role="application"
        aria-label="Pomodoro Timer Application"
      >
        {/* Storage Error Warning */}
        {storageError && (
          <div
            className={styles.storageWarning}
            role="alert"
            aria-live="polite"
          >
            <div className={styles.warningIcon} aria-hidden="true">
              ⚠️
            </div>
            <div className={styles.warningContent}>
              <span className={styles.warningTitle}>Storage Issue</span>
              <span className={styles.warningMessage}>
                {!isStorageAvailable
                  ? "Settings won't be saved between sessions"
                  : storageError.message}
              </span>
            </div>
          </div>
        )}

        {/* Session Statistics Display */}
        <StorageErrorBoundary>
          <div
            className={styles.sessionStats}
            role="region"
            aria-label="Session Statistics"
          >
            <div className={styles.statItem}>
              <span
                className={styles.statValue}
                aria-label={`${sessionStats.completedSessions} completed sessions`}
              >
                {sessionStats.completedSessions}
              </span>
              <span className={styles.statLabel} aria-hidden="true">
                Sessions
              </span>
            </div>
            <div className={styles.statItem}>
              <span
                className={styles.statValue}
                aria-label={`${Math.round(
                  sessionStats.totalFocusTime
                )} total focus minutes`}
              >
                {Math.round(sessionStats.totalFocusTime)}
              </span>
              <span className={styles.statLabel} aria-hidden="true">
                Minutes
              </span>
            </div>
            <div className={styles.statItem}>
              <span
                className={styles.statValue}
                aria-label={`${sessionStats.currentStreak} day streak`}
              >
                {sessionStats.currentStreak}
              </span>
              <span className={styles.statLabel} aria-hidden="true">
                Streak
              </span>
            </div>
          </div>
        </StorageErrorBoundary>

        {/* Main Timer Container */}
        <div
          className={styles.timerContainer}
          role="main"
          aria-label="Timer Interface"
        >
          {/* Visual Progress Indicator */}
          <div className={styles.visualSection}>
            <VisualIndicator
              progress={calculateProgress()}
              mode={timer.mode}
              isActive={timer.isActive}
            />
          </div>

          {/* Timer Display */}
          <div className={styles.displaySection}>
            <TimerDisplay
              timeRemaining={timer.timeRemaining}
              isActive={timer.isActive}
              mode={timer.mode}
            />
          </div>

          {/* Timer Controls */}
          <div className={styles.controlsSection}>
            <TimerControls
              isActive={timer.isActive}
              isPaused={timer.isPaused}
              onStart={timer.start}
              onPause={timer.pause}
              onReset={timer.reset}
              onSettings={handleOpenSettings}
            />
          </div>
        </div>

        {/* Current Mode Indicator */}
        <div
          className={styles.modeIndicator}
          role="status"
          aria-live="polite"
          aria-label="Current timer mode"
        >
          <div
            className={`${styles.modeStatus} ${
              timer.mode === TimerMode.FOCUS ? styles.focus : styles.break
            }`}
          >
            <span aria-hidden="true">
              {timer.mode === TimerMode.FOCUS ? "🌱" : "🌿"}
            </span>
            <span>
              {timer.mode === TimerMode.FOCUS ? "Focus Time" : "Break Time"}
            </span>
          </div>
        </div>

        {/* Settings Panel */}
        <StorageErrorBoundary>
          <SettingsPanel
            isOpen={isSettingsOpen}
            onClose={handleCloseSettings}
            currentConfig={timerConfig}
            onSave={handleSaveSettings}
          />
        </StorageErrorBoundary>

        {/* Keyboard Navigation Instructions */}
        <div
          className={styles.keyboardInstructions}
          role="region"
          aria-label="Keyboard shortcuts"
        >
          <details className={styles.instructionsDetails}>
            <summary className={styles.instructionsSummary}>
              Keyboard Shortcuts
            </summary>
            <div className={styles.instructionsContent}>
              <ul className={styles.shortcutsList}>
                <li>
                  <kbd>Space</kbd> or <kbd>Enter</kbd> - Start/Pause timer
                </li>
                <li>
                  <kbd>R</kbd> - Reset timer
                </li>
                <li>
                  <kbd>S</kbd> - Open settings (when timer is stopped)
                </li>
                <li>
                  <kbd>Escape</kbd> - Focus timer controls
                </li>
                <li>
                  <kbd>Tab</kbd> - Navigate between controls
                </li>
              </ul>
            </div>
          </details>
        </div>

        {/* Notification Permission Request (if needed) */}
        {typeof window !== "undefined" &&
          "Notification" in window &&
          Notification.permission === "default" && (
            <div
              className={styles.notificationPrompt}
              role="region"
              aria-label="Notification settings"
            >
              <p>Enable notifications to get alerts when sessions complete?</p>
              <button
                onClick={() => Notification.requestPermission()}
                className={styles.enableNotifications}
                aria-label="Enable browser notifications for session completion alerts"
              >
                Enable Notifications
              </button>
            </div>
          )}
      </div>
    </TimerErrorBoundary>
  );
};

export default PomodoroTimer;
