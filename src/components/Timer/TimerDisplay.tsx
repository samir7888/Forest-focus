import React from "react";
import { TimerDisplayProps, TimerMode } from "../../types/timer";
import styles from "../../styles/components/TimerDisplay.module.scss";

/**
 * Formats time in seconds to MM:SS format
 */
const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

/**
 * TimerDisplay component - Shows the countdown timer in MM:SS format
 * with visual styling for different modes and smooth transitions
 */
export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timeRemaining,
  isActive,
  mode,
}) => {
  const displayTime = formatTime(timeRemaining);

  return (
    <div
      className={`${styles.timerDisplay} ${
        mode === TimerMode.FOCUS ? styles.focusMode : styles.breakMode
      } ${isActive ? styles.active : styles.inactive}`}
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`${displayTime} remaining in ${
        mode === TimerMode.FOCUS ? "focus" : "break"
      } session`}
    >
      <div className={styles.timeContainer}>
        <span
          className={styles.timeText}
          data-testid="timer-display"
          aria-label={`${Math.floor(timeRemaining / 60)} minutes and ${
            timeRemaining % 60
          } seconds remaining`}
        >
          {displayTime}
        </span>
        <div className={styles.modeLabel} aria-hidden="true">
          {mode === TimerMode.FOCUS ? "Focus Time" : "Break Time"}
        </div>
      </div>

      {/* Animated background pulse for active state */}
      {isActive && (
        <div className={styles.pulseBackground} aria-hidden="true" />
      )}
    </div>
  );
};

export default TimerDisplay;
