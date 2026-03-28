import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_URL,
  AUTHOR_NAME,
  BEHANCE_URL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  TELEGRAM_URL,
  AUTHOR_EMAIL,
} from "@/data/constants";
import { CursorProvider } from "@/components/cursor/cursor-provider";
import { ErrorBoundary } from "@/components/error-boundary";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | Umidjon Haydarov",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Umidjon Haydarov",
    "Graphic Designer",
    "Visual Artist",
    "Brand Identity",
    "UI/UX Designer",
    "Motion Graphics",
    "Figma Designer",
    "Adobe Designer",
    "Logo Designer",
    "Tashkent Designer",
    "Uzbekistan Designer",
    "Social Media Design",
    "Typography",
    "Color Theory",
  ],
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Umidjon Haydarov Portfolio",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@uhaydarov.off",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "art",
  verification: {
    // Add your Google Search Console verification token here when available
    // google: "your-token",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0c0c10",
};

/** JSON-LD structured data for Google rich results */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR_NAME,
  url: SITE_URL,
  email: AUTHOR_EMAIL,
  jobTitle: "Graphic Designer & Visual Artist",
  description:
    "Graphic Designer with expertise in brand identity, UI/UX design, and motion graphics. Creates compelling visual experiences for brands, products, and digital platforms.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tashkent",
    addressCountry: "UZ",
  },
  sameAs: [BEHANCE_URL, LINKEDIN_URL, INSTAGRAM_URL, TELEGRAM_URL],
  knowsAbout: [
    "Graphic Design",
    "Brand Identity",
    "UI/UX Design",
    "Figma",
    "Adobe Illustrator",
    "Adobe Photoshop",
    "After Effects",
    "Motion Graphics",
    "Typography",
    "Color Theory",
    "Social Media Design",
    "Blender",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Graphic Designer",
    occupationLocation: {
      "@type": "City",
      name: "Tashkent",
    },
    skills: "Figma, Adobe Illustrator, Photoshop, After Effects, Brand Identity, UI/UX",
  },
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "Tashkent University of Information Technologies (TUIT)",
      url: "https://tuit.uz",
    },
    {
      "@type": "EducationalOrganization",
      name: "Najot Ta'lim – Graphic Design & Brand Identity",
    },
    {
      "@type": "EducationalOrganization",
      name: "Self-taught – Figma, Brand Identity, Motion Graphics",
    },
  ],
  workExample: [
    {
      "@type": "CreativeWork",
      name: "Brand Identity Design",
      url: "https://behance.net/umidjonhaydarov",
      description:
        "Complete brand identity system including logo, color palette, typography, and guidelines.",
    },
    {
      "@type": "CreativeWork",
      name: "Mobile App UI/UX Design",
      url: "https://behance.net/umidjonhaydarov",
      description:
        "End-to-end UI/UX design for a fintech mobile app with prototypes and high-fidelity designs.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Umidjon" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="geo.region" content="UZ-TO" />
        <meta name="geo.placename" content="Tashkent, Uzbekistan" />
        <meta name="geo.position" content="41.2995;69.2401" />
        <meta name="ICBM" content="41.2995, 69.2401" />
        <meta name="language" content="English" />
        <meta name="rating" content="general" />
        <link rel="apple-touch-icon" href="/avatar.jpeg" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <CursorProvider>
          <ErrorBoundary>
            {children}
            <Analytics />
          </ErrorBoundary>
        </CursorProvider>
      </body>
    </html>
  );
}
