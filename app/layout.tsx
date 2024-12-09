import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import dynamic from "next/dynamic";
import { ThemeProvider } from "@/components/Theme-provider";

const DynamicMyWidget = dynamic(() => import("../components/MyWidget"), { ssr: false });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "EduQuest",
  description: "AI Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      {/* <ThemeProvider  
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      > */}
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* <Toaster /> */}
          {children}
        </body>
        <DynamicMyWidget />
      </html>
      {/* </ThemeProvider> */}
    </ClerkProvider>
  );
}
