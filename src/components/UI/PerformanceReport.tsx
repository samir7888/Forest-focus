"use client";

import { useEffect, useState } from "react";
import {
  PerformanceMonitor,
  analyzeBundleSize,
  monitorMemoryUsage,
} from "@/utils/performance";

interface PerformanceReportProps {
  showInProduction?: boolean;
}

export default function PerformanceReport({
  showInProduction = false,
}: PerformanceReportProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    // Only show in development or if explicitly enabled for production
    if (process.env.NODE_ENV === "production" && !showInProduction) {
      return;
    }

    const monitor = PerformanceMonitor.getInstance();
    monitor.init();

    // Wait for page load to collect metrics
    const timer = setTimeout(() => {
      setMetrics(monitor.getMetrics());
      monitor.logMetrics();
      analyzeBundleSize();
      monitorMemoryUsage();
    }, 2000);

    return () => clearTimeout(timer);
  }, [showInProduction]);

  // Don't render in production unless explicitly enabled
  if (process.env.NODE_ENV === "production" && !showInProduction) {
    return null;
  }

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm shadow-lg hover:bg-blue-700 transition-colors z-50"
        title="Show Performance Report"
      >
        📊 Perf
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-xl p-4 max-w-sm z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800">Performance Report</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {metrics && (
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Load Time:</span>
            <span className="font-mono">{metrics.loadTime.toFixed(0)}ms</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">DOM Ready:</span>
            <span className="font-mono">
              {metrics.domContentLoaded.toFixed(0)}ms
            </span>
          </div>

          {metrics.firstContentfulPaint && (
            <div className="flex justify-between">
              <span className="text-gray-600">FCP:</span>
              <span className="font-mono">
                {metrics.firstContentfulPaint.toFixed(0)}ms
              </span>
            </div>
          )}

          {metrics.largestContentfulPaint && (
            <div className="flex justify-between">
              <span className="text-gray-600">LCP:</span>
              <span className="font-mono">
                {metrics.largestContentfulPaint.toFixed(0)}ms
              </span>
            </div>
          )}

          {metrics.cumulativeLayoutShift !== undefined && (
            <div className="flex justify-between">
              <span className="text-gray-600">CLS:</span>
              <span className="font-mono">
                {metrics.cumulativeLayoutShift.toFixed(4)}
              </span>
            </div>
          )}

          {metrics.firstInputDelay && (
            <div className="flex justify-between">
              <span className="text-gray-600">FID:</span>
              <span className="font-mono">
                {metrics.firstInputDelay.toFixed(0)}ms
              </span>
            </div>
          )}
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-gray-200">
        <button
          onClick={() => {
            analyzeBundleSize();
            monitorMemoryUsage();
          }}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          Refresh Analysis
        </button>
      </div>
    </div>
  );
}
