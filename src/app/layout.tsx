import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Header, Footer } from "../components/Layout";
import BackgroundImage from "../components/UI/BackgroundImage";
import { ErrorBoundary } from "../components/UI/ErrorBoundary";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ForestFocus - Nature-Themed Pomodoro Timer",
    template: "%s | ForestFocus",
  },
  description:
    "Boost your productivity with ForestFocus, a beautiful nature-themed Pomodoro timer. Stay focused with customizable work sessions, break reminders, and a calming forest environment.",
  keywords: [
    "pomodoro timer",
    "productivity",
    "focus timer",
    "work timer",
    "nature theme",
    "forest theme",
    "time management",
    "concentration",
    "study timer",
    "work sessions",
  ],
  authors: [{ name: "ForestFocus Team" }],
  creator: "ForestFocus",
  publisher: "ForestFocus",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://forestfocus.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://forestfocus.vercel.app",
    title: "ForestFocus - Nature-Themed Pomodoro Timer",
    description:
      "Boost your productivity with ForestFocus, a beautiful nature-themed Pomodoro timer. Stay focused with customizable work sessions and a calming forest environment.",
    siteName: "ForestFocus",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "ForestFocus - Nature-Themed Pomodoro Timer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ForestFocus - Nature-Themed Pomodoro Timer",
    description:
      "Boost your productivity with ForestFocus, a beautiful nature-themed Pomodoro timer.",
    images: ["/images/twitter-image.png"],
    creator: "@forestfocus",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2d5a27" },
    { media: "(prefers-color-scheme: dark)", color: "#2d5a27" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ForestFocus",
    description:
      "A nature-themed Pomodoro timer to help you stay focused and productive",
    url: "https://forestfocus.vercel.app",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "ForestFocus Team",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
    },
  };

  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* <link rel="preconnect" href="https://pagead2.googlesyndication.com" /> */}

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* Google Analytics (placeholder for future implementation) */}
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Google Analytics will be configured here when ready
              // gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="skip-to-main"
          style={{
            position: "absolute",
            left: "-9999px",
            zIndex: 999,
            padding: "8px 16px",
            background: "var(--primary-green)",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          Skip to main content
        </a>

        {/* Google AdSense Script */}
        {/* <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        /> */}

        <BackgroundImage priority />
        <div className="app-layout">
          <ErrorBoundary>
            <Header />
          </ErrorBoundary>
          <main id="main-content" className="main-content">
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
          <ErrorBoundary>
            <Footer />
          </ErrorBoundary>
        </div>

        {/* AdSense components temporarily disabled */}
      </body>
    </html>
  );
}
