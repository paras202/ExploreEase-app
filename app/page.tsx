'use client';

import Homepage from "@/app/ui/Homepage";
import MobileLandingPage from "@/app/ui/MobileLanding";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import PageWrapper from "@/app/ui/ClientSideWrapper";

const Home = () => {
  return (
    <PageWrapper>
      <SignedIn>
        <Homepage />
      </SignedIn>
      <SignedOut>
        <MobileLandingPage />
      </SignedOut>
    </PageWrapper>
  );
};

export default Home;
