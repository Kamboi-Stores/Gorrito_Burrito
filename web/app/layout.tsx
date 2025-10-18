import './styles/globals.css';
import React from 'react';
import Navigation from '../components/Navigation';
import Breadcrumbs from '../components/Breadcrumbs';

export const metadata = {
  title: 'Your Restaurant',
  description: 'Local, fresh, and fast. Order online.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* GA4 (respects cookie banner when configured) */}
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}></script>
            <script dangerouslySetInnerHTML={{__html:`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}', { anonymize_ip: true });
            `}}/>
          </>
        )}
        {/* CookieYes placeholder: paste script here when you create it */}
      </head>
      <body>
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
                <div>&copy; {new Date().getFullYear()} Your Restaurant</div>
                <div style={{color:'var(--muted)'}}>123 Main St, Your City, ST</div>
              </div>
              <div style={{justifySelf:'end',display:'flex',gap:16}}>
                <a href="/privacy">Privacy</a>
                <a href="/terms">Terms</a>
                <a href="/cookies">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
