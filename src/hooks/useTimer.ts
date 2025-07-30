import { useState, useEffect, useRef, useCallback } from "react";
import { TimerMode, UseTimerReturn } from "../types/timer";

interface UseTimerProps {
  initialFocusTime?: number; // in minutes
  initialBreakTime?: number; // in minutes
  onSessionComplete?: (sessionCount: number) => void;
}

export const useTimer = ({
  initialFocusTime = 25,
  initialBreakTime = 5,
  onSessionComplete,
}: UseTimerProps = {}): UseTimerReturn => {
  // Configuration state
  const [focusTime, setFocusTime] = useState(initialFocusTime);
  const [breakTime, setBreakTime] = useState(initialBreakTime);

  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(focusTime * 60); // in seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mode, setMode] = useState<TimerMode>(TimerMode.FOCUS);
  const [sessionCount, setSessionCount] = useState(0);

  // Refs for accurate timing with drift correction
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(0);
  const expectedTimeRef = useRef<number | null>(null);
  const driftCorrectionRef = useRef<number>(0);

  // Clear interval helper
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Enhanced start timer function with drift correction
  const start = useCallback(() => {
    if (timeRemaining <= 0) return;

    setIsActive(true);
    setIsPaused(false);

    // Record start time for accuracy with drift correction
    const now = performance.now();
    startTimeRef.current = now - pausedTimeRef.current;
    expectedTimeRef.current = now + 100; // Expected time for next tick
    driftCorrectionRef.current = 0;

    const tick = () => {
      try {
        const now = performance.now();
        const elapsed = Math.floor((now - (startTimeRef.current || 0)) / 1000);
        const currentTime =
          mode === TimerMode.FOCUS ? focusTime * 60 : breakTime * 60;
        const remaining = Math.max(0, currentTime - elapsed);

        setTimeRemaining(remaining);

        if (remaining <= 0) {
          clearTimer();
          setIsActive(false);

          // Handle mode switching and session completion
          if (mode === TimerMode.FOCUS) {
            const newSessionCount = sessionCount + 1;
            setSessionCount(newSessionCount);
            setMode(TimerMode.BREAK);
            setTimeRemaining(breakTime * 60);
            onSessionComplete?.(newSessionCount);
          } else {
            setMode(TimerMode.FOCUS);
            setTimeRemaining(focusTime * 60);
          }

          // Reset timing references
          startTimeRef.current = null;
          pausedTimeRef.current = 0;
          expectedTimeRef.current = null;
          driftCorrectionRef.current = 0;
          return;
        }

        // Calculate drift and adjust next timeout
        const drift = now - (expectedTimeRef.current || now);
        driftCorrectionRef.current += drift;

        // Limit drift correction to prevent overcorrection
        const maxDriftCorrection = 50; // 50ms max correction
        const correctedDrift = Math.max(
          -maxDriftCorrection,
          Math.min(maxDriftCorrection, driftCorrectionRef.current)
        );

        expectedTimeRef.current = now + 100;
        const nextTimeout = Math.max(1, 100 - correctedDrift);

        // Reset drift correction periodically to prevent accumulation
        if (Math.abs(driftCorrectionRef.current) > 200) {
          driftCorrectionRef.current = 0;
        }

        intervalRef.current = setTimeout(tick, nextTimeout);
      } catch (error) {
        console.error("Timer tick error:", error);
        // Fallback to basic interval on error
        intervalRef.current = setTimeout(tick, 100);
      }
    };

    // Start the first tick
    intervalRef.current = setTimeout(tick, 100);
  }, [
    timeRemaining,
    mode,
    focusTime,
    breakTime,
    sessionCount,
    onSessionComplete,
    clearTimer,
  ]);

  // Enhanced pause timer function
  const pause = useCallback(() => {
    if (!isActive) return;

    try {
      clearTimer();
      setIsActive(false);
      setIsPaused(true);

      // Calculate paused time for accuracy
      if (startTimeRef.current) {
        pausedTimeRef.current = performance.now() - startTimeRef.current;
      }

      // Reset drift correction on pause
      driftCorrectionRef.current = 0;
      expectedTimeRef.current = null;
    } catch (error) {
      console.error("Timer pause error:", error);
      // Ensure timer is stopped even if error occurs
      clearTimer();
      setIsActive(false);
      setIsPaused(true);
    }
  }, [isActive, clearTimer]);

  // Enhanced reset timer function
  const reset = useCallback(() => {
    try {
      clearTimer();
      setIsActive(false);
      setIsPaused(false);
      setMode(TimerMode.FOCUS);
      setTimeRemaining(focusTime * 60);

      // Reset all timing references
      startTimeRef.current = null;
      pausedTimeRef.current = 0;
      expectedTimeRef.current = null;
      driftCorrectionRef.current = 0;
    } catch (error) {
      console.error("Timer reset error:", error);
      // Ensure timer is reset even if error occurs
      clearTimer();
      setIsActive(false);
      setIsPaused(false);
      setMode(TimerMode.FOCUS);
      setTimeRemaining(focusTime * 60);
    }
  }, [focusTime, clearTimer]);

  // Update focus time
  const updateFocusTime = useCallback(
    (time: number) => {
      if (time < 1 || time > 120) return; // Validate range

      setFocusTime(time);

      // Update current time if in focus mode and not active
      if (mode === TimerMode.FOCUS && !isActive) {
        setTimeRemaining(time * 60);
      }
    },
    [mode, isActive]
  );

  // Update break time
  const updateBreakTime = useCallback(
    (time: number) => {
      if (time < 1 || time > 120) return; // Validate range

      setBreakTime(time);

      // Update current time if in break mode and not active
      if (mode === TimerMode.BREAK && !isActive) {
        setTimeRemaining(time * 60);
      }
    },
    [mode, isActive]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  // Update time remaining when focus/break time changes
  useEffect(() => {
    if (!isActive && !isPaused) {
      const newTime =
        mode === TimerMode.FOCUS ? focusTime * 60 : breakTime * 60;
      setTimeRemaining(newTime);
    }
  }, [focusTime, breakTime, mode, isActive, isPaused]);

  return {
    // State
    timeRemaining,
    isActive,
    isPaused,
    mode,
    focusTime,
    breakTime,
    sessionCount,

    // Actions
    start,
    pause,
    reset,
    setFocusTime: updateFocusTime,
    setBreakTime: updateBreakTime,
  };
};
