import './styles/globals.css';
import React from 'react';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import Navigation from '../components/Navigation';
import Breadcrumbs from '../components/Breadcrumbs';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  title: 'Gorrito Burrito',
  description: 'Local, fresh, and fast. Order online.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID;

  return (
    <html lang="en">
      <head>
        {/* CookieYes placeholder: paste script here when you create it */}
      </head>
      <body>
        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        
        <Navigation />
        <div className="content-container">
          <Breadcrumbs />
        </div>
        <main>
          <div className="content-container">
            {children}
          </div>
        </main>
        <footer>
          <div className="content-container">
            <div className="grid cols-2">
              <div>
                <div>&copy; {new Date().getFullYear()} Gorrito Burrito</div>
                <div style={{color:'var(--muted)'}}>4901 Bonny Oaks Drive, Chattanooga, TN 37416</div>
              </div>
              <div style={{justifySelf:'end',display:'flex',gap:16}}>
                <a href="/privacy">Privacy</a>
                <a href="/terms">Terms</a>
                <a href="/cookies">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
