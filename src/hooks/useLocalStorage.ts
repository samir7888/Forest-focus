import { useState, useEffect, useCallback } from "react";
import { UseLocalStorageReturn } from "../types/timer";

// Storage error types for better error handling
export enum StorageErrorType {
  QUOTA_EXCEEDED = "QUOTA_EXCEEDED",
  ACCESS_DENIED = "ACCESS_DENIED",
  PARSE_ERROR = "PARSE_ERROR",
  UNAVAILABLE = "UNAVAILABLE",
  UNKNOWN = "UNKNOWN",
}

export interface StorageError {
  type: StorageErrorType;
  message: string;
  originalError?: Error;
}

// Storage fallback mechanism
class StorageFallback<T> {
  private memoryStorage = new Map<string, T>();

  get(key: string, defaultValue: T): T {
    return this.memoryStorage.get(key) ?? defaultValue;
  }

  set(key: string, value: T): void {
    this.memoryStorage.set(key, value);
  }

  remove(key: string): void {
    this.memoryStorage.delete(key);
  }

  clear(): void {
    this.memoryStorage.clear();
  }
}

const storageFallback = new StorageFallback();

// Enhanced localStorage availability check
const isLocalStorageAvailable = (): boolean => {
  try {
    if (typeof window === "undefined") return false;

    const testKey = "__localStorage_test__";
    window.localStorage.setItem(testKey, "test");
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.warn("localStorage is not available:", error);
    return false;
  }
};

// Enhanced quota check with detailed error reporting
const checkStorageQuota = (
  key: string,
  value: string
): { success: boolean; error?: StorageError } => {
  try {
    const testKey = `__quota_test_${key}__`;
    window.localStorage.setItem(testKey, value);
    window.localStorage.removeItem(testKey);
    return { success: true };
  } catch (error) {
    const storageError: StorageError = {
      type: StorageErrorType.QUOTA_EXCEEDED,
      message: "localStorage quota exceeded. Consider clearing old data.",
      originalError: error as Error,
    };

    console.warn("localStorage quota check failed:", storageError);
    return { success: false, error: storageError };
  }
};

// Parse JSON with better error handling
const safeJsonParse = <T>(
  value: string,
  fallback: T
): { data: T; error?: StorageError } => {
  try {
    const parsed = JSON.parse(value);
    return { data: parsed };
  } catch (error) {
    const storageError: StorageError = {
      type: StorageErrorType.PARSE_ERROR,
      message: "Failed to parse stored data. Using fallback value.",
      originalError: error as Error,
    };

    console.warn("JSON parse error:", storageError);
    return { data: fallback, error: storageError };
  }
};

// Stringify JSON with error handling
const safeJsonStringify = <T>(
  value: T
): { data: string; error?: StorageError } => {
  try {
    const stringified = JSON.stringify(value);
    return { data: stringified };
  } catch (error) {
    const storageError: StorageError = {
      type: StorageErrorType.UNKNOWN,
      message: "Failed to serialize data for storage.",
      originalError: error as Error,
    };

    console.error("JSON stringify error:", storageError);
    return { data: "", error: storageError };
  }
};

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> => {
  const [isStorageAvailable] = useState(() => isLocalStorageAvailable());
  const [lastError, setLastError] = useState<StorageError | null>(null);

  // State to store the value with enhanced error handling
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (!isStorageAvailable) {
        console.warn("localStorage is not available, using fallback storage");
        return storageFallback.get(key, initialValue);
      }

      const item = window.localStorage.getItem(key);

      if (item === null) {
        return initialValue;
      }

      // Parse stored JSON with error handling
      const { data, error } = safeJsonParse(item, initialValue);
      if (error) {
        setLastError(error);
      }

      return data;
    } catch (error) {
      const storageError: StorageError = {
        type: StorageErrorType.ACCESS_DENIED,
        message: `Error reading localStorage key "${key}"`,
        originalError: error as Error,
      };

      console.error("localStorage read error:", storageError);
      setLastError(storageError);

      // Fallback to memory storage
      return storageFallback.get(key, initialValue);
    }
  });

  // Enhanced function to set value with comprehensive error handling
  const setValue = useCallback(
    (value: T) => {
      try {
        // Always update state first
        setStoredValue(value);

        if (!isStorageAvailable) {
          console.warn("localStorage is not available, using fallback storage");
          storageFallback.set(key, value);
          return;
        }

        // Serialize the value with error handling
        const { data: serializedValue, error: serializeError } =
          safeJsonStringify(value);

        if (serializeError) {
          setLastError(serializeError);
          storageFallback.set(key, value);
          return;
        }

        // Check quota before setting
        const { success, error: quotaError } = checkStorageQuota(
          key,
          serializedValue
        );

        if (!success && quotaError) {
          setLastError(quotaError);

          // Try to clear some space by removing old entries
          try {
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
              const storageKey = localStorage.key(i);
              if (
                storageKey &&
                storageKey.startsWith("forestfocus-") &&
                storageKey !== key
              ) {
                keysToRemove.push(storageKey);
              }
            }

            // Remove oldest entries (simple cleanup strategy)
            keysToRemove
              .slice(0, Math.min(3, keysToRemove.length))
              .forEach((keyToRemove) => {
                localStorage.removeItem(keyToRemove);
              });

            // Try again after cleanup
            window.localStorage.setItem(key, serializedValue);
            console.info("Successfully saved after cleanup");
          } catch (cleanupError) {
            console.error("Failed to save even after cleanup:", cleanupError);
            storageFallback.set(key, value);
          }

          return;
        }

        // Save to localStorage
        window.localStorage.setItem(key, serializedValue);

        // Clear any previous errors on successful save
        if (lastError) {
          setLastError(null);
        }
      } catch (error) {
        const storageError: StorageError = {
          type: StorageErrorType.ACCESS_DENIED,
          message: `Error setting localStorage key "${key}"`,
          originalError: error as Error,
        };

        console.error("localStorage write error:", storageError);
        setLastError(storageError);

        // Fallback to memory storage
        storageFallback.set(key, value);
      }
    },
    [key, isStorageAvailable, lastError]
  );

  // Enhanced function to remove value with error handling
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);

      if (!isStorageAvailable) {
        console.warn("localStorage is not available, using fallback storage");
        storageFallback.remove(key);
        return;
      }

      window.localStorage.removeItem(key);

      // Clear any previous errors on successful removal
      if (lastError) {
        setLastError(null);
      }
    } catch (error) {
      const storageError: StorageError = {
        type: StorageErrorType.ACCESS_DENIED,
        message: `Error removing localStorage key "${key}"`,
        originalError: error as Error,
      };

      console.error("localStorage remove error:", storageError);
      setLastError(storageError);

      // Fallback to memory storage
      storageFallback.remove(key);
    }
  }, [key, initialValue, isStorageAvailable, lastError]);

  // Enhanced storage event listener with error handling
  useEffect(() => {
    if (!isStorageAvailable) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        try {
          if (e.newValue !== null) {
            const { data, error } = safeJsonParse(e.newValue, initialValue);
            if (error) {
              setLastError(error);
            }
            setStoredValue(data);
          } else {
            // Key was removed
            setStoredValue(initialValue);
          }
        } catch (error) {
          const storageError: StorageError = {
            type: StorageErrorType.PARSE_ERROR,
            message: `Error parsing storage event for key "${key}"`,
            originalError: error as Error,
          };

          console.error("Storage event error:", storageError);
          setLastError(storageError);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue, isStorageAvailable]);

  // Periodic error recovery attempt
  useEffect(() => {
    if (!lastError || !isStorageAvailable) return;

    const recoveryTimer = setTimeout(() => {
      try {
        // Test if localStorage is working again
        const testKey = `__recovery_test_${Date.now()}__`;
        window.localStorage.setItem(testKey, "test");
        window.localStorage.removeItem(testKey);

        // If successful, clear the error
        setLastError(null);
        console.info("localStorage recovery successful");
      } catch (error) {
        console.warn("localStorage still not available:", error);
      }
    }, 30000); // Try recovery after 30 seconds

    return () => clearTimeout(recoveryTimer);
  }, [lastError, isStorageAvailable]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    error: lastError,
    isStorageAvailable,
  };
};
