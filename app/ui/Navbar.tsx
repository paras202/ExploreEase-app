"use client";

import { useState } from "react";
import { Navbar as FlowbiteNavbar, TextInput, Button, Toast } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { CiAirportSign1 } from "react-icons/ci";
import { useTheme } from "next-themes";
import { MdMyLocation } from "react-icons/md";
import { HiX } from 'react-icons/hi';

export default function Navbar() {
  const path = usePathname();
  const { theme, setTheme } = useTheme();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [locationName, setLocationName] = useState("");

  const handleLocationClick = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            const address = data.display_name;
            const shortName = data.address.city || data.address.town || data.address.village || data.address.hamlet;
            setLocationName(shortName || "Unknown location");
            setToastMessage(`Address: ${address}`);
            setShowToast(true);
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
        
        <form className="hidden lg:flex items-center space-x-2">
          <TextInput
            type="text"
            placeholder="Search..."
            icon={AiOutlineSearch}
            className="lg:inline"
          />
        </form>
        
        <div className="flex items-center gap-2">
          <MdMyLocation 
            className="text-xl text-purple-600 dark:text-white cursor-pointer hover:opacity-50"
            onClick={handleLocationClick}
          />
          {locationName && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {locationName}
            </span>
          )}
        </div>

        <div className="flex gap-1 md:order-2">
          {/* <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-10 gap-1 md:w-12 md:h-10 sm:inline"
            color="gray"
          >
            {theme === "dark" ? <FaSun className="md:text-xl" /> : <FaMoon className="md:text-xl text-purple-600" />}
          </Button> */}
          
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

      {showToast && (
        <div className="fixed bottom-5 right-5 z-50">
          <Toast className="max-w-xl">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
              <MdMyLocation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              {toastMessage}
            </div>
            <Toast.Toggle onDismiss={() => setShowToast(false)} />
          </Toast>
        </div>
      )}
    </>
  );
}