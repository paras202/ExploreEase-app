import Homepage from "@/app/ui/Homepage";
import MobileLandingPage from "@/app/ui/MobileLanding";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { TouristPlacesProvider } from "@/app/ui/TouristPlaceContent";
import ExploreBotComponent from "./ui/ExploreBot";

const Home = () => {
  return (
    <TouristPlacesProvider>
      <SignedIn>
        <Homepage />
        <ExploreBotComponent/>
      </SignedIn>
      <SignedOut>
        <MobileLandingPage />
      </SignedOut>
    </TouristPlacesProvider>
  );
};

export default Home;