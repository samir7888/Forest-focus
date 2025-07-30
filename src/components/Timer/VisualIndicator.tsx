import React from "react";
import { VisualIndicatorProps, TimerMode } from "../../types/timer";
import styles from "../../styles/components/VisualIndicator.module.scss";

/**
 * VisualIndicator component - Shows progress through an animated growing tree
 * or progress bar with mode-specific styling
 */
export const VisualIndicator: React.FC<VisualIndicatorProps> = ({
  progress,
  mode,
  isActive,
}) => {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.max(0, Math.min(100, progress));

  // Calculate tree growth height (inverted - tree grows as time decreases)
  const treeGrowth = 100 - normalizedProgress;

  return (
    <div
      className={`${styles.visualIndicator} ${
        mode === TimerMode.FOCUS ? styles.focusMode : styles.breakMode
      } ${isActive ? styles.active : styles.inactive}`}
      role="img"
      aria-label={`Timer progress: ${Math.round(
        normalizedProgress
      )}% complete. ${
        mode === TimerMode.FOCUS ? "Focus" : "Break"
      } session in progress.`}
    >
      {/* SVG Tree Visualization */}
      <div className={styles.treeContainer}>
        <svg
          viewBox="0 0 200 300"
          className={styles.treeSvg}
          data-testid="tree-indicator"
          aria-hidden="true"
          focusable="false"
        >
          {/* Tree trunk */}
          <rect
            x="90"
            y="250"
            width="20"
            height="50"
            fill="currentColor"
            className={styles.trunk}
          />

          {/* Tree base/roots */}
          <ellipse
            cx="100"
            cy="290"
            rx="25"
            ry="8"
            fill="currentColor"
            className={styles.roots}
            opacity="0.6"
          />

          {/* Tree crown layers - grow from bottom to top */}
          <g className={styles.crown}>
            {/* Bottom layer */}
            <ellipse
              cx="100"
              cy="240"
              rx="40"
              ry="30"
              fill="currentColor"
              className={styles.crownLayer}
              style={{
                clipPath: `inset(${Math.max(
                  0,
                  100 - treeGrowth * 1.2
                )}% 0 0 0)`,
              }}
            />

            {/* Middle layer */}
            <ellipse
              cx="100"
              cy="200"
              rx="35"
              ry="25"
              fill="currentColor"
              className={styles.crownLayer}
              style={{
                clipPath: `inset(${Math.max(
                  0,
                  100 - treeGrowth * 1.1
                )}% 0 0 0)`,
              }}
            />

            {/* Top layer */}
            <ellipse
              cx="100"
              cy="160"
              rx="30"
              ry="20"
              fill="currentColor"
              className={styles.crownLayer}
              style={{
                clipPath: `inset(${Math.max(0, 100 - treeGrowth)}% 0 0 0)`,
              }}
            />
          </g>

          {/* Animated leaves for active state */}
          {isActive && treeGrowth > 20 && (
            <g className={styles.animatedLeaves}>
              <circle
                cx="70"
                cy="180"
                r="3"
                fill="currentColor"
                className={styles.leaf}
                style={{ animationDelay: "0s" }}
              />
              <circle
                cx="130"
                cy="190"
                r="2.5"
                fill="currentColor"
                className={styles.leaf}
                style={{ animationDelay: "0.5s" }}
              />
              <circle
                cx="85"
                cy="150"
                r="2"
                fill="currentColor"
                className={styles.leaf}
                style={{ animationDelay: "1s" }}
              />
              <circle
                cx="115"
                cy="170"
                r="2.5"
                fill="currentColor"
                className={styles.leaf}
                style={{ animationDelay: "1.5s" }}
              />
            </g>
          )}
        </svg>
      </div>

      {/* Progress bar fallback/alternative */}
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          role="progressbar"
          aria-valuenow={normalizedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Timer progress: ${Math.round(
            normalizedProgress
          )}% complete`}
        >
          <div
            className={styles.progressFill}
            style={{ width: `${normalizedProgress}%` }}
            aria-hidden="true"
          />
        </div>
        <div className={styles.progressText} aria-hidden="true">
          {Math.round(normalizedProgress)}% Complete
        </div>
      </div>
    </div>
  );
};

export default VisualIndicator;
