"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import styles from "../../styles/components/ErrorBoundary.module.scss";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * ErrorBoundary - React error boundary component for graceful error handling
 * Catches JavaScript errors anywhere in the child component tree and displays fallback UI
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Update state with error info
    this.setState({ error, errorInfo });

    // Call optional error handler
    this.props.onError?.(error, errorInfo);

    // In production, you might want to log this to an error reporting service
    if (process.env.NODE_ENV === "production") {
      // Example: logErrorToService(error, errorInfo);
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className={styles.errorBoundary}>
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>🌲</div>
            <h2 className={styles.errorTitle}>Oops! Something went wrong</h2>
            <p className={styles.errorMessage}>
              Don't worry, your forest is still growing! We encountered a small
              hiccup.
            </p>

            <div className={styles.errorActions}>
              <button onClick={this.handleRetry} className={styles.retryButton}>
                Try Again
              </button>
              <button
                onClick={this.handleReload}
                className={styles.reloadButton}
              >
                Refresh Page
              </button>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className={styles.errorDetails}>
                <summary>Error Details (Development)</summary>
                <pre className={styles.errorStack}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * TimerErrorBoundary - Specialized error boundary for timer components
 * Provides timer-specific fallback UI and error handling
 */
export const TimerErrorBoundary: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const handleTimerError = (error: Error, errorInfo: ErrorInfo) => {
    console.error("Timer error:", error, errorInfo);

    // Clear any potentially corrupted timer state from localStorage
    try {
      localStorage.removeItem("forestfocus-timer-config");
      localStorage.removeItem("forestfocus-session-stats");
    } catch (e) {
      console.warn("Could not clear localStorage:", e);
    }
  };

  const timerFallback = (
    <div className={styles.timerFallback}>
      <div className={styles.fallbackContainer}>
        <div className={styles.fallbackIcon}>⏱️</div>
        <h3 className={styles.fallbackTitle}>Timer Temporarily Unavailable</h3>
        <p className={styles.fallbackMessage}>
          The timer encountered an issue, but your progress is safe. Please
          refresh the page to continue your focus session.
        </p>
        <button
          onClick={() => window.location.reload()}
          className={styles.refreshButton}
        >
          Refresh Timer
        </button>
      </div>
    </div>
  );

  return (
    <ErrorBoundary fallback={timerFallback} onError={handleTimerError}>
      {children}
    </ErrorBoundary>
  );
};

/**
 * StorageErrorBoundary - Specialized error boundary for localStorage-related errors
 * Provides fallback UI when localStorage operations fail
 */
export const StorageErrorBoundary: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const handleStorageError = (error: Error, errorInfo: ErrorInfo) => {
    console.error("Storage error:", error, errorInfo);
  };

  const storageFallback = (
    <div className={styles.storageFallback}>
      <div className={styles.fallbackContainer}>
        <div className={styles.fallbackIcon}>💾</div>
        <h3 className={styles.fallbackTitle}>Storage Issue Detected</h3>
        <p className={styles.fallbackMessage}>
          We're having trouble saving your settings. The timer will still work,
          but your preferences won't be saved between sessions.
        </p>
        <button
          onClick={() => window.location.reload()}
          className={styles.refreshButton}
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <ErrorBoundary fallback={storageFallback} onError={handleStorageError}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundary;
