"use client";

import { useEffect, useState } from "react";

interface UseAdSenseOptions {
  adClient?: string;
  enableDevelopmentMode?: boolean;
}

export const useAdSense = (options: UseAdSenseOptions = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    adClient = "ca-pub-0000000000000000", // Placeholder for development
    enableDevelopmentMode = process.env.NODE_ENV === "development",
  } = options;

  useEffect(() => {
    // Skip loading in development mode if specified
    if (enableDevelopmentMode) {
      setIsLoaded(true);
      return;
    }

    // Check if script is already loaded
    const existingScript = document.querySelector(
      'script[src*="adsbygoogle.js"]'
    );
    if (existingScript) {
      setIsLoaded(true);
      return;
    }

    // Load AdSense script
    const script = document.createElement("script");
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
    script.async = true;
    script.crossOrigin = "anonymous";

    script.onload = () => {
      setIsLoaded(true);
      // Initialize adsbygoogle array
      if (typeof window !== "undefined") {
        window.adsbygoogle = window.adsbygoogle || [];
      }
    };

    script.onerror = () => {
      setError("Failed to load AdSense script");
      console.error("Failed to load AdSense script");
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [adClient, enableDevelopmentMode]);

  return { isLoaded, error };
};

export default useAdSense;
