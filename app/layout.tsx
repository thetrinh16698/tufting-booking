import './globals.css';
import Footer from '@app/components/Layout/Footer';
import Header from '@app/components/Layout/Header';
import { Providers } from '@app/components/Providers';

/**
 * Using force dynamic so changes in business assets (e.g. services) are immediately reflected.
 * If you prefer having it reflected only after redeploy (not recommended) please remove it
 * **/
export const revalidate = 0;

export default function RootLayout(layoutProps: any) {
  const { children } = layoutProps;
  return (
    <html lang="en">
      <head>
        <title>Tufting Booking System</title>
        <meta
          name="description"
          content="Book your tufting sessions and workshops"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="parallax-background">
        <Providers>
          <Header />
          <main className="bg-transparent min-h-[600px]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
