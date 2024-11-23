import Homepage from "@/app/ui/Homepage";
import MobileLandingPage from "@/app/ui/MobileLanding";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { TouristPlacesProvider } from "@/app/ui/TouristPlaceContent";

const Home = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() =>{
    getPlacesData()
       .then((data)=>{
          console.log(data);
          setPlaces(data);
       })
  }, [])
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