"use client";

import { useState } from "react";
import { Navbar as FlowbiteNavbar, TextInput, Button, Toast } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { CiAirportSign1 } from "react-icons/ci";
import { MdMyLocation } from "react-icons/md";
import { WiDaySunny } from "react-icons/wi";
import Weather from "./weather/Weather";

export default function Navbar() {
  const path = usePathname();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [locationName, setLocationName] = useState("");
  const [weatherLocation, setWeatherLocation] = useState<{ lat: number; lon: number; name?: string } | null>(null);
  const [isWeatherOpen, setIsWeatherOpen] = useState(false);

  const handleLocationClick = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const address = data.display_name;
            const shortName = data.address.city || data.address.town || data.address.village || data.address.hamlet;
            setLocationName(shortName || "Unknown location");
            setWeatherLocation({ lat: latitude, lon: longitude, name: shortName });
            setToastMessage(`Address: ${address}`);
            setShowToast(true);
            setIsWeatherOpen(true);
          } catch (error) {
            console.error("Error fetching location data:", error);
            setToastMessage("Error fetching location details");
            setShowToast(true);
          }
        },
        (error) => {
          setToastMessage(`Error: ${error.message}`);
          setShowToast(true);
        }
      );
    } else {
      setToastMessage("Geolocation is not supported by your browser");
      setShowToast(true);
    }
  };

  return (
    <>
      <FlowbiteNavbar fluid rounded className="border-b-2 border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <FlowbiteNavbar.Brand as={Link} href="/">
          <span className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
            <span className="px-2 py-1 gap-1 text-base bg-gradient-to-r from-green-300 via-purple-400 to-blue-500 rounded-lg text-white flex items-center">
              <CiAirportSign1 className="ml-2" color="darkblue"/>
              ExploreEase
            </span>
          </span>
        </FlowbiteNavbar.Brand>
             <div className="flex items-center gap-2">
                <Button
                  color="gray"
                  pill
                  size="sm"
                  onClick={handleLocationClick}
                  className="flex items-center gap-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300"
                >
                  <MdMyLocation className="text-xl md:text-4xl md:p-2 text-gray-600 dark:text-gray-300" />
                  {locationName ? (
                    <>
                      <span className="hidden md:p-2 md:inline text-gray-800 dark:text-gray-200 font-medium">
                        {locationName}
                      </span>
                      <WiDaySunny
                        className="text-xl md:text-4xl md:p-2 cursor-pointer text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-500 transition-colors"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          setIsWeatherOpen(true);
                        }}
                      />
                    </>
                  ) : (
                    <span className="hidden md:inline text-gray-600 dark:text-gray-300">
                      Get Location
                    </span>
                  )}
                </Button>
              </div>

        <div className="flex md:order-2 items-center gap-4">

          <SignedOut>
            <SignInButton>
              <Button gradientDuoTone="purpleToBlue" outline pill>
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>

          <FlowbiteNavbar.Toggle/>
        </div>
        <FlowbiteNavbar.Collapse>
          <FlowbiteNavbar.Link as={Link} href="/" active={path === "/"}>
            Home
          </FlowbiteNavbar.Link>
          <FlowbiteNavbar.Link as={Link} href="/about" active={path === "/about"}>
            About
          </FlowbiteNavbar.Link>
          <FlowbiteNavbar.Link as={Link} href="/contact" active={path === "/contact"}>
            Contact
          </FlowbiteNavbar.Link>
        </FlowbiteNavbar.Collapse>
      </FlowbiteNavbar>

      <Weather
        location={weatherLocation}
        isOpen={isWeatherOpen}
        onClose={() => setIsWeatherOpen(false)}
      />

      {showToast && (
        <Toast className="fixed bottom-20 right-3 md:bottom-5 z-50">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
            <MdMyLocation className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            {toastMessage}
          </div>
          <Toast.Toggle onDismiss={() => setShowToast(false)} />
        </Toast>
      )}
    </>
  );
}