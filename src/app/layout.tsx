import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hindy Institute — Arabic Language Learning',
  description:
    "Learn Arabic online with Hindy Institute. Professional Arabic courses: Arabic ABC's (letters & reading) and Arabic Mastery (40-week intensive program). Live classes, AI tutoring, certificates.",
  keywords: 'learn Arabic, Arabic online, Arabic course, MSA, Hindy Institute, Arabic alphabet, Arabic mastery',
  openGraph: {
    title: 'Hindy Institute — Arabic Language Learning',
    description: 'Professional Arabic courses with live virtual classes, AI tutors, and certificates.',
  },
};

export const viewport = {
  themeColor: '#0A1628',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
