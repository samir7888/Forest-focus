// Timer mode enumeration
export enum TimerMode {
  FOCUS = "focus",
  BREAK = "break",
  LONG_BREAK = "longBreak",
}

// Timer status enumeration
export enum TimerStatus {
  IDLE = "idle",
  RUNNING = "running",
  PAUSED = "paused",
  COMPLETED = "completed",
}

// Core timer state interface
export interface TimerState {
  mode: TimerMode;
  status: TimerStatus;
  timeRemaining: number; // in seconds
  totalTime: number; // in seconds
  sessionCount: number;
}

// Timer configuration interface
export interface TimerConfig {
  focusTime: number; // in minutes
  breakTime: number; // in minutes
  longBreakTime?: number; // in minutes, for future enhancement
  sessionsUntilLongBreak?: number; // for future enhancement
}

// Session statistics interface
export interface SessionStats {
  completedSessions: number;
  totalFocusTime: number; // in minutes
  currentStreak: number;
  lastSessionDate: Date;
  dailyGoal?: number;
}

// Component prop interfaces

// PomodoroTimer component props
export interface PomodoroTimerProps {
  initialFocusTime?: number;
  initialBreakTime?: number;
  onSessionComplete?: (sessionCount: number) => void;
}

// TimerDisplay component props
export interface TimerDisplayProps {
  timeRemaining: number;
  isActive: boolean;
  mode: TimerMode;
}

// TimerControls component props
export interface TimerControlsProps {
  isActive: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSettings: () => void;
}

// VisualIndicator component props
export interface VisualIndicatorProps {
  progress: number; // 0-100
  mode: TimerMode;
  isActive: boolean;
}

// Hook return type interfaces

// useTimer hook return type
export interface UseTimerReturn {
  // State
  timeRemaining: number;
  isActive: boolean;
  isPaused: boolean;
  mode: TimerMode;
  focusTime: number;
  breakTime: number;
  sessionCount: number;

  // Actions
  start: () => void;
  pause: () => void;
  reset: () => void;
  setFocusTime: (time: number) => void;
  setBreakTime: (time: number) => void;
}

// Storage error interface for enhanced error handling
export interface StorageError {
  type: string;
  message: string;
  originalError?: Error;
}

// useLocalStorage hook return type with enhanced error handling
export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T) => void;
  removeValue: () => void;
  error?: StorageError | null;
  isStorageAvailable?: boolean;
}

// useSessionTracking hook return type
export interface UseSessionTrackingReturn {
  sessionStats: SessionStats;
  incrementSession: () => void;
  resetStats: () => void;
  updateTotalFocusTime: (minutes: number) => void;
}

// Session data for localStorage
export interface SessionData {
  completedSessions: number;
  totalFocusTime: number;
  lastSessionDate: string;
}

// Additional utility types

// Timer validation result
export interface TimerValidation {
  isValid: boolean;
  error?: string;
}

// Settings panel props
export interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: TimerConfig;
  onSave: (config: TimerConfig) => void;
}

// Button component props
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

// Modal component props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}
