"use client";

import React, { useState } from "react";
import { SessionStats as SessionStatsType } from "../../types/timer";
import { Button } from "./Button";
import { Modal } from "./Modal";
import "./SessionStats.scss";

interface SessionStatsProps {
  sessionStats: SessionStatsType;
  onResetStats: () => void;
}

// Helper function to format time duration
const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
};

// Helper function to format date
const formatDate = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString();
  }
};

export const SessionStats: React.FC<SessionStatsProps> = ({
  sessionStats,
  onResetStats,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleResetClick = () => {
    setShowResetConfirm(true);
  };

  const handleConfirmReset = () => {
    onResetStats();
    setShowResetConfirm(false);
  };

  const handleCancelReset = () => {
    setShowResetConfirm(false);
  };

  const progressPercentage = sessionStats.dailyGoal
    ? Math.min(
        (sessionStats.completedSessions / sessionStats.dailyGoal) * 100,
        100
      )
    : 0;

  return (
    <>
      <div className="session-stats">
        <div className="session-stats__header">
          <h3 className="session-stats__title">Your Progress</h3>
          <Button
            variant="secondary"
            size="small"
            onClick={handleResetClick}
            className="session-stats__reset-btn"
          >
            Reset
          </Button>
        </div>

        <div className="session-stats__grid">
          <div className="stat-card stat-card--primary">
            <div className="stat-card__icon">🍅</div>
            <div className="stat-card__content">
              <div className="stat-card__value">
                {sessionStats.completedSessions}
              </div>
              <div className="stat-card__label">Sessions Completed</div>
            </div>
          </div>

          <div className="stat-card stat-card--secondary">
            <div className="stat-card__icon">⏱️</div>
            <div className="stat-card__content">
              <div className="stat-card__value">
                {formatDuration(sessionStats.totalFocusTime)}
              </div>
              <div className="stat-card__label">Total Focus Time</div>
            </div>
          </div>

          <div className="stat-card stat-card--accent">
            <div className="stat-card__icon">🔥</div>
            <div className="stat-card__content">
              <div className="stat-card__value">
                {sessionStats.currentStreak}
              </div>
              <div className="stat-card__label">Current Streak</div>
            </div>
          </div>

          <div className="stat-card stat-card--info">
            <div className="stat-card__icon">📅</div>
            <div className="stat-card__content">
              <div className="stat-card__value">
                {formatDate(sessionStats.lastSessionDate)}
              </div>
              <div className="stat-card__label">Last Session</div>
            </div>
          </div>
        </div>

        {sessionStats.dailyGoal && (
          <div className="daily-progress">
            <div className="daily-progress__header">
              <span className="daily-progress__label">Daily Goal Progress</span>
              <span className="daily-progress__text">
                {sessionStats.completedSessions} / {sessionStats.dailyGoal}{" "}
                sessions
              </span>
            </div>
            <div className="daily-progress__bar">
              <div
                className="daily-progress__fill"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="daily-progress__percentage">
              {Math.round(progressPercentage)}% complete
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={showResetConfirm}
        onClose={handleCancelReset}
        title="Reset Statistics"
      >
        <div className="reset-confirm">
          <p className="reset-confirm__message">
            Are you sure you want to reset all your session statistics? This
            action cannot be undone.
          </p>
          <div className="reset-confirm__stats">
            <p>You will lose:</p>
            <ul>
              <li>{sessionStats.completedSessions} completed sessions</li>
              <li>
                {formatDuration(sessionStats.totalFocusTime)} of focus time
              </li>
              <li>Your current streak of {sessionStats.currentStreak}</li>
            </ul>
          </div>
          <div className="reset-confirm__actions">
            <Button variant="secondary" onClick={handleCancelReset}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmReset}>
              Reset All Data
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
