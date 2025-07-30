import { useCallback, useEffect } from "react";
import {
  SessionStats,
  UseSessionTrackingReturn,
  SessionData,
} from "../types/timer";
import { useLocalStorage } from "./useLocalStorage";

const SESSION_STORAGE_KEY = "forest-focus-session-data";

// Default session stats
const defaultSessionStats: SessionStats = {
  completedSessions: 0,
  totalFocusTime: 0,
  currentStreak: 0,
  lastSessionDate: new Date(),
  dailyGoal: 8, // Default daily goal of 8 sessions
};

// Helper function to check if two dates are the same day
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// Helper function to check if date is yesterday
const isYesterday = (date: Date, today: Date): boolean => {
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDay(date, yesterday);
};

export const useSessionTracking = (): UseSessionTrackingReturn => {
  // Use localStorage hook for persistence
  const { value: sessionData, setValue: setSessionData } =
    useLocalStorage<SessionData>(SESSION_STORAGE_KEY, {
      completedSessions: 0,
      totalFocusTime: 0,
      lastSessionDate: new Date().toISOString(),
    });

  // Convert stored data to SessionStats format
  const sessionStats: SessionStats = {
    completedSessions: sessionData.completedSessions,
    totalFocusTime: sessionData.totalFocusTime,
    currentStreak: calculateCurrentStreak(sessionData),
    lastSessionDate: new Date(sessionData.lastSessionDate),
    dailyGoal: 8, // Could be made configurable later
  };

  // Calculate current streak based on session data
  function calculateCurrentStreak(data: SessionData): number {
    const today = new Date();
    const lastSession = new Date(data.lastSessionDate);

    // If no sessions completed, streak is 0
    if (data.completedSessions === 0) {
      return 0;
    }

    // If last session was today, streak continues
    if (isSameDay(lastSession, today)) {
      return 1; // At least 1 for today, could be enhanced to track daily streaks
    }

    // If last session was yesterday, streak continues
    if (isYesterday(lastSession, today)) {
      return 1; // Simplified streak calculation
    }

    // If more than a day has passed, streak is broken
    return 0;
  }

  // Increment session counter
  const incrementSession = useCallback(() => {
    const now = new Date();

    setSessionData({
      completedSessions: sessionData.completedSessions + 1,
      totalFocusTime: sessionData.totalFocusTime,
      lastSessionDate: now.toISOString(),
    });
  }, [sessionData, setSessionData]);

  // Update total focus time
  const updateTotalFocusTime = useCallback(
    (minutes: number) => {
      setSessionData({
        completedSessions: sessionData.completedSessions,
        totalFocusTime: sessionData.totalFocusTime + minutes,
        lastSessionDate: sessionData.lastSessionDate,
      });
    },
    [sessionData, setSessionData]
  );

  // Reset all statistics
  const resetStats = useCallback(() => {
    setSessionData({
      completedSessions: 0,
      totalFocusTime: 0,
      lastSessionDate: new Date().toISOString(),
    });
  }, [setSessionData]);

  return {
    sessionStats,
    incrementSession,
    resetStats,
    updateTotalFocusTime,
  };
};
