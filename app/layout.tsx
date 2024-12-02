import "./ui/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/app/ui/Theme-Provider";
import PageWrapper from "./ui/ClientSideWrapper";
import { TouristPlacesProvider } from "./ui/TouristPlaceContent";
import { Toaster } from 'sonner';
// import MobileLandingPage from "@/app/ui/MobileLanding";

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
            <TouristPlacesProvider>
              <PageWrapper>
                {children}
                <Toaster richColors />
              </PageWrapper>
            </TouristPlacesProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}