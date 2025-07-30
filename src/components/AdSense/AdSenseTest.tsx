"use client";

import React from "react";
import AdUnit from "./AdUnit";

const AdSenseTest: React.FC = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2>AdSense Integration Test</h2>
      <p>
        This component tests the AdSense integration with placeholder units.
      </p>

      <div style={{ margin: "2rem 0" }}>
        <h3>Header Ad Format</h3>
        <AdUnit adSlot="1234567890" adFormat="auto" className="header-ad" />
      </div>

      <div style={{ margin: "2rem 0" }}>
        <h3>Footer Ad Format</h3>
        <AdUnit adSlot="0987654321" adFormat="auto" className="footer-ad" />
      </div>

      <div style={{ margin: "2rem 0" }}>
        <h3>Sidebar Ad Format</h3>
        <AdUnit
          adSlot="1122334455"
          adFormat="rectangle"
          className="sidebar-ad"
        />
      </div>
    </div>
  );
};

export default AdSenseTest;
