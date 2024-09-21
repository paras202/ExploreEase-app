import "./ui/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/app/ui/Theme-Provider";
import PageWrapper from "./ui/ClientSideWrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ExploreEase",
  description: "A comprehensive travel and tourism web platform!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <PageWrapper>
            {children}
            </PageWrapper>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}