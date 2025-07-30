// Performance monitoring utilities

export interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  cumulativeLayoutShift?: number;
  firstInputDelay?: number;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics = {
    loadTime: 0,
    domContentLoaded: 0,
  };

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  init() {
    if (typeof window === "undefined") return;

    // Basic timing metrics
    window.addEventListener("load", () => {
      const navigation = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;
      this.metrics.loadTime = navigation.loadEventEnd - navigation.fetchStart;
      this.metrics.domContentLoaded =
        navigation.domContentLoadedEventEnd - navigation.fetchStart;
    });

    // Web Vitals
    this.measureWebVitals();
  }

  private measureWebVitals() {
    // First Contentful Paint
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          this.metrics.firstContentfulPaint = entry.startTime;
        }
      }
    });

    try {
      observer.observe({ entryTypes: ["paint"] });
    } catch (e) {
      // Browser doesn't support this API
    }

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.largestContentfulPaint = lastEntry.startTime;
    });

    try {
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
    } catch (e) {
      // Browser doesn't support this API
    }

    // Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
          this.metrics.cumulativeLayoutShift = clsValue;
        }
      }
    });

    try {
      clsObserver.observe({ entryTypes: ["layout-shift"] });
    } catch (e) {
      // Browser doesn't support this API
    }

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.metrics.firstInputDelay =
          (entry as any).processingStart - entry.startTime;
      }
    });

    try {
      fidObserver.observe({ entryTypes: ["first-input"] });
    } catch (e) {
      // Browser doesn't support this API
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  logMetrics() {
    if (process.env.NODE_ENV === "development") {
      console.group("🚀 Performance Metrics");
      console.log("Load Time:", `${this.metrics.loadTime.toFixed(2)}ms`);
      console.log(
        "DOM Content Loaded:",
        `${this.metrics.domContentLoaded.toFixed(2)}ms`
      );

      if (this.metrics.firstContentfulPaint) {
        console.log(
          "First Contentful Paint:",
          `${this.metrics.firstContentfulPaint.toFixed(2)}ms`
        );
      }

      if (this.metrics.largestContentfulPaint) {
        console.log(
          "Largest Contentful Paint:",
          `${this.metrics.largestContentfulPaint.toFixed(2)}ms`
        );
      }

      if (this.metrics.cumulativeLayoutShift !== undefined) {
        console.log(
          "Cumulative Layout Shift:",
          this.metrics.cumulativeLayoutShift.toFixed(4)
        );
      }

      if (this.metrics.firstInputDelay) {
        console.log(
          "First Input Delay:",
          `${this.metrics.firstInputDelay.toFixed(2)}ms`
        );
      }

      console.groupEnd();
    }
  }
}

// Bundle size analyzer
export const analyzeBundleSize = () => {
  if (typeof window === "undefined") return;

  const resources = performance.getEntriesByType(
    "resource"
  ) as PerformanceResourceTiming[];
  const jsResources = resources.filter(
    (resource) =>
      resource.name.includes(".js") && resource.name.includes("_next")
  );

  const totalJSSize = jsResources.reduce((total, resource) => {
    return total + (resource.transferSize || 0);
  }, 0);

  if (process.env.NODE_ENV === "development") {
    console.group("📦 Bundle Analysis");
    console.log(
      "Total JS Bundle Size:",
      `${(totalJSSize / 1024).toFixed(2)} KB`
    );
    console.log("Number of JS Files:", jsResources.length);

    jsResources
      .sort((a, b) => (b.transferSize || 0) - (a.transferSize || 0))
      .slice(0, 5)
      .forEach((resource, index) => {
        const size = ((resource.transferSize || 0) / 1024).toFixed(2);
        const name = resource.name.split("/").pop() || resource.name;
        console.log(`${index + 1}. ${name}: ${size} KB`);
      });

    console.groupEnd();
  }
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if (typeof window === "undefined" || !(performance as any).memory) return;

  const memory = (performance as any).memory;

  if (process.env.NODE_ENV === "development") {
    console.group("🧠 Memory Usage");
    console.log(
      "Used JS Heap Size:",
      `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`
    );
    console.log(
      "Total JS Heap Size:",
      `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`
    );
    console.log(
      "JS Heap Size Limit:",
      `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`
    );
    console.groupEnd();
  }
};
