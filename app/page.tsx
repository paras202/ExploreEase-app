import Homepage from "@/app/ui/Homepage";
import MobileLandingPage from "@/app/ui/MobileLanding";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { TouristPlacesProvider } from "@/app/ui/TouristPlaceContent";

const Home = () => {
  return (
    <TouristPlacesProvider>
      <SignedIn>
        <Homepage />
      </SignedIn>
      <SignedOut>
        <MobileLandingPage />
      </SignedOut>
    </TouristPlacesProvider>
  );
};

export default Home;