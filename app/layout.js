import "./globals.css";

export const metadata = {
  title: "Happy 21st Birthday Seja! 🎀💕",
  description: "A special birthday surprise for the most adorable person ever. Happy 21st Birthday Seja! With love from Appu 💕",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#fcc8df" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎀</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  );
}
