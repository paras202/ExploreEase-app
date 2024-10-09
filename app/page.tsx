import Homepage from "@/app/ui/Homepage";
import MobileLandingPage from "@/app/ui/MobileLanding";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const Home = () => {
  return (
    <>
      <SignedIn>
        <Homepage />
      </SignedIn>
      <SignedOut>
        <MobileLandingPage />
      </SignedOut>
    </>
  );
};

export default Home;
