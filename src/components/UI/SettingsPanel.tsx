"use client";

import React, { useState, useEffect } from "react";
import { SettingsPanelProps, TimerConfig } from "../../types/timer";
import { Modal } from "./Modal";
import { Button } from "./Button";
import "./SettingsPanel.scss";

// Validation function for timer values
const validateTimerValue = (
  value: number
): { isValid: boolean; error?: string } => {
  if (isNaN(value) || value < 1) {
    return { isValid: false, error: "Time must be at least 1 minute" };
  }
  if (value > 120) {
    return { isValid: false, error: "Time cannot exceed 120 minutes" };
  }
  return { isValid: true };
};

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  currentConfig,
  onSave,
}) => {
  const [focusTime, setFocusTime] = useState(currentConfig.focusTime);
  const [breakTime, setBreakTime] = useState(currentConfig.breakTime);
  const [focusError, setFocusError] = useState<string>("");
  const [breakError, setBreakError] = useState<string>("");

  // Reset form when modal opens with current config
  useEffect(() => {
    if (isOpen) {
      setFocusTime(currentConfig.focusTime);
      setBreakTime(currentConfig.breakTime);
      setFocusError("");
      setBreakError("");
    }
  }, [isOpen, currentConfig]);

  const handleFocusTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setFocusTime(value);

    const validation = validateTimerValue(value);
    setFocusError(validation.isValid ? "" : validation.error || "");
  };

  const handleBreakTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setBreakTime(value);

    const validation = validateTimerValue(value);
    setBreakError(validation.isValid ? "" : validation.error || "");
  };

  const handleSave = () => {
    const focusValidation = validateTimerValue(focusTime);
    const breakValidation = validateTimerValue(breakTime);

    if (!focusValidation.isValid) {
      setFocusError(focusValidation.error || "");
      return;
    }

    if (!breakValidation.isValid) {
      setBreakError(breakValidation.error || "");
      return;
    }

    const newConfig: TimerConfig = {
      focusTime,
      breakTime,
      longBreakTime: currentConfig.longBreakTime,
      sessionsUntilLongBreak: currentConfig.sessionsUntilLongBreak,
    };

    onSave(newConfig);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const isFormValid =
    !focusError && !breakError && focusTime > 0 && breakTime > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Timer Settings">
      <div className="settings-panel">
        <form
          className="settings-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (isFormValid) handleSave();
          }}
          role="form"
          aria-label="Timer configuration form"
        >
          <div className="form-group">
            <label htmlFor="focus-time" className="form-label">
              Focus Time (minutes)
            </label>
            <input
              id="focus-time"
              type="number"
              min="1"
              max="120"
              value={focusTime || ""}
              onChange={handleFocusTimeChange}
              className={`form-input ${focusError ? "form-input--error" : ""}`}
              placeholder="25"
              aria-describedby={
                focusError
                  ? "focus-time-error focus-time-hint"
                  : "focus-time-hint"
              }
              aria-invalid={!!focusError}
              required
            />
            {focusError && (
              <span
                id="focus-time-error"
                className="form-error"
                role="alert"
                aria-live="polite"
              >
                {focusError}
              </span>
            )}
            <span id="focus-time-hint" className="form-hint">
              Set your focus session duration (1-120 minutes)
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="break-time" className="form-label">
              Break Time (minutes)
            </label>
            <input
              id="break-time"
              type="number"
              min="1"
              max="120"
              value={breakTime || ""}
              onChange={handleBreakTimeChange}
              className={`form-input ${breakError ? "form-input--error" : ""}`}
              placeholder="5"
              aria-describedby={
                breakError
                  ? "break-time-error break-time-hint"
                  : "break-time-hint"
              }
              aria-invalid={!!breakError}
              required
            />
            {breakError && (
              <span
                id="break-time-error"
                className="form-error"
                role="alert"
                aria-live="polite"
              >
                {breakError}
              </span>
            )}
            <span id="break-time-hint" className="form-hint">
              Set your break duration (1-120 minutes)
            </span>
          </div>
        </form>

        <div
          className="settings-actions"
          role="group"
          aria-label="Form actions"
        >
          <Button
            variant="secondary"
            onClick={handleCancel}
            aria-label="Cancel changes and close settings"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!isFormValid}
            aria-label={`Save timer settings${
              !isFormValid ? " (form has errors)" : ""
            }`}
          >
            Save Settings
          </Button>
        </div>
      </div>
    </Modal>
  );
};
