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
  PINTEREST_URL,
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
    "Umidjon Haydarov graphic designer",
    "Umidjon Haydarov portfolio",
    "uhaydarov",
    "khaydarov designer",
    "Graphic Designer",
    "Visual Artist",
    "Brand Identity Designer",
    "UI/UX Designer",
    "Motion Graphics Designer",
    "Figma Designer",
    "Adobe Designer",
    "Logo Designer",
    "Tashkent Designer",
    "Uzbekistan Designer",
    "Social Media Design",
    "Typography Designer",
    "Color Theory",
    "Freelance Designer Uzbekistan",
    "Portfolio Umidjon",
    "Poster Design",
    "Brand Identity Tashkent",
    "Creative Designer Uzbekistan",
  ],
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  icons: {
    apple: "/avatar.jpeg",
    icon: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Umidjon",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Umidjon Haydarov Portfolio",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${AUTHOR_NAME} — Graphic Designer & Visual Artist`,
      },
    ],
    firstName: "Umidjon",
    lastName: "Haydarov",
    username: "uhaydarov.off",
    gender: "male",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@uhaydarov.off",
    site: "@uhaydarov.off",
    images: [{ url: "/opengraph-image", alt: `${AUTHOR_NAME} — Graphic Designer` }],
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0c0c10",
};

/** JSON-LD structured data — multi-schema for maximum Google entity recognition */
const jsonLd = [
  // 1. WebSite schema — enables Google Sitelinks search
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Umidjon Haydarov Portfolio",
    description: SITE_DESCRIPTION,
    inLanguage: "en-US",
    author: { "@id": `${SITE_URL}/#person` },
  },
  // 2. Person schema — core entity for "Umidjon Haydarov" search
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: AUTHOR_NAME,
    alternateName: ["Umidjon", "uhaydarov", "Умиджон Хайдаров"],
    url: SITE_URL,
    email: `mailto:${AUTHOR_EMAIL}`,
    image: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#personimage`,
      url: `${SITE_URL}/avatar.jpeg`,
      contentUrl: `${SITE_URL}/avatar.jpeg`,
      caption: "Umidjon Haydarov — Graphic Designer & Visual Artist",
    },
    jobTitle: "Graphic Designer & Visual Artist",
    description:
      "Graphic Designer with expertise in brand identity, UI/UX design, and motion graphics. Creates compelling visual experiences for brands, products, and digital platforms.",
    nationality: { "@type": "Country", name: "Uzbekistan" },
    homeLocation: {
      "@type": "Place",
      name: "Tashkent, Uzbekistan",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tashkent",
        addressRegion: "Tashkent",
        addressCountry: "UZ",
      },
    },
    sameAs: [BEHANCE_URL, LINKEDIN_URL, INSTAGRAM_URL, TELEGRAM_URL, PINTEREST_URL],
    knowsAbout: [
      "Graphic Design",
      "Brand Identity",
      "UI/UX Design",
      "Figma",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Adobe After Effects",
      "Motion Graphics",
      "Typography",
      "Color Theory",
      "Social Media Design",
      "Poster Design",
      "Logo Design",
      "Blender 3D",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Graphic Designer",
      occupationLocation: { "@type": "City", name: "Tashkent" },
      skills:
        "Figma, Adobe Illustrator, Photoshop, After Effects, Brand Identity, UI/UX, Motion Graphics",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Tashkent University of Information Technologies (TUIT)",
        url: "https://tuit.uz",
      },
      { "@type": "EducationalOrganization", name: "Najot Ta'lim – Graphic Design & Brand Identity" },
      { "@type": "EducationalOrganization", name: "Self-taught – Figma, Brand Identity, Motion Graphics" },
    ],
    workExample: [
      {
        "@type": "CreativeWork",
        name: "Brand Identity Design",
        url: BEHANCE_URL,
        description:
          "Complete brand identity system including logo, color palette, typography, and guidelines.",
      },
      {
        "@type": "CreativeWork",
        name: "UI/UX Design",
        url: BEHANCE_URL,
        description:
          "End-to-end UI/UX design with wireframes, prototypes, and high-fidelity Figma interfaces.",
      },
      {
        "@type": "CreativeWork",
        name: "Motion Graphics",
        url: BEHANCE_URL,
        description:
          "Kinetic typography and animated visual content for promotional campaigns.",
      },
    ],
  },
  // 3. ProfilePage schema — tells Google this page IS the person's profile
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profile`,
    url: SITE_URL,
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    inLanguage: "en-US",
    dateModified: new Date().toISOString(),
    mainEntity: { "@id": `${SITE_URL}/#person` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, item: { "@id": SITE_URL, name: "Home" } },
      ],
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Geo tags — not supported by Next.js metadata API */}
        <meta name="geo.region" content="UZ-TO" />
        <meta name="geo.placename" content="Tashkent, Uzbekistan" />
        <meta name="geo.position" content="41.2995;69.2401" />
        <meta name="ICBM" content="41.2995, 69.2401" />
        <meta name="language" content="English" />
        <meta name="rating" content="general" />
        {/* Performance hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
        {/* Structured data */}
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
