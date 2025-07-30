import React, { useEffect, useRef } from "react";
import { TimerControlsProps } from "../../types/timer";
import Icon from "../UI/Icon";
import styles from "../../styles/components/TimerControls.module.scss";

/**
 * TimerControls component - Provides Start, Pause, Reset, and Settings buttons
 * with proper state management and accessibility
 */
export const TimerControls: React.FC<TimerControlsProps> = ({
  isActive,
  isPaused,
  onStart,
  onPause,
  onReset,
  onSettings,
}) => {
  const primaryButtonRef = useRef<HTMLButtonElement>(null);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle shortcuts when not typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case " ":
        case "enter":
          // Space or Enter to start/pause
          event.preventDefault();
          if (!isActive || isPaused) {
            onStart();
          } else {
            onPause();
          }
          break;
        case "r":
          // R to reset (only if timer has been started)
          if (isActive || isPaused) {
            event.preventDefault();
            onReset();
          }
          break;
        case "s":
          // S to open settings (only when timer is not active)
          if (!isActive) {
            event.preventDefault();
            onSettings();
          }
          break;
        case "escape":
          // Escape to focus the primary button
          event.preventDefault();
          primaryButtonRef.current?.focus();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isActive, isPaused, onStart, onPause, onReset, onSettings]);

  return (
    <div
      className={styles.timerControls}
      role="group"
      aria-label="Timer controls"
    >
      {/* Primary action button (Start/Pause) */}
      <div className={styles.primaryControls}>
        {!isActive || isPaused ? (
          <button
            ref={primaryButtonRef}
            className={`${styles.controlButton} ${styles.startButton}`}
            onClick={onStart}
            aria-label={`${
              isPaused ? "Resume" : "Start"
            } timer (Space or Enter)`}
            aria-describedby="keyboard-shortcuts"
            data-testid="start-button"
          >
            <Icon
              name="play"
              size={24}
              className={`${styles.buttonIcon} interactive`}
              alt=""
            />
            <span className={styles.buttonText}>
              {isPaused ? "Resume" : "Start"}
            </span>
          </button>
        ) : (
          <button
            ref={primaryButtonRef}
            className={`${styles.controlButton} ${styles.pauseButton}`}
            onClick={onPause}
            aria-label="Pause timer (Space or Enter)"
            aria-describedby="keyboard-shortcuts"
            data-testid="pause-button"
          >
            <Icon
              name="pause"
              size={24}
              className={`${styles.buttonIcon} interactive`}
              alt=""
            />
            <span className={styles.buttonText}>Pause</span>
          </button>
        )}
      </div>

      {/* Secondary controls */}
      <div className={styles.secondaryControls}>
        {/* Reset button */}
        <button
          className={`${styles.controlButton} ${styles.resetButton}`}
          onClick={onReset}
          disabled={!isActive && !isPaused}
          aria-label="Reset timer (R key)"
          aria-describedby="keyboard-shortcuts"
          data-testid="reset-button"
        >
          <Icon
            name="reset"
            size={20}
            className={`${styles.buttonIcon} interactive`}
            alt=""
          />
          <span className={styles.buttonText}>Reset</span>
        </button>

        {/* Settings button */}
        <button
          className={`${styles.controlButton} ${styles.settingsButton}`}
          onClick={onSettings}
          disabled={isActive}
          aria-label="Open timer settings (S key)"
          aria-describedby="keyboard-shortcuts"
          data-testid="settings-button"
        >
          <Icon
            name="settings"
            size={20}
            className={`${styles.buttonIcon} interactive`}
            alt=""
          />
          <span className={styles.buttonText}>Settings</span>
        </button>
      </div>

      {/* Status indicator */}
      <div className={styles.statusIndicator} role="status" aria-live="polite">
        <div
          className={`${styles.statusDot} ${
            isActive ? styles.active : isPaused ? styles.paused : styles.idle
          }`}
          aria-hidden="true"
        />
        <span className={styles.statusText}>
          {isActive ? "Running" : isPaused ? "Paused" : "Ready"}
        </span>
      </div>

      {/* Hidden keyboard shortcuts description */}
      <div id="keyboard-shortcuts" className="sr-only">
        Keyboard shortcuts: Space or Enter to start/pause, R to reset, S for
        settings, Escape to focus controls
      </div>
    </div>
  );
};

export default TimerControls;
