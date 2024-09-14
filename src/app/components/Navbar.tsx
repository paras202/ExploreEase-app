"use client";  // Mark this component as a Client Component

import { Navbar as FlowbiteNavbar, TextInput, Button } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { usePathname } from "next/navigation"; // This hook is only allowed in Client Components
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { CiAirportSign1 } from "react-icons/ci";

export default function Navbar() {
  const path = usePathname();

  return (
    <FlowbiteNavbar fluid={true} rounded={true} className="border-b-2 border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <FlowbiteNavbar.Brand>
        <Link href="/" className="flex items-center space-x-2 text-sm sm:text-xl font-semibold dark:text-white">
           <span className="px-2 py-1 text-base bg-gradient-to-r from-green-300 via-purple-400 to-blue-500 rounded-lg text-white flex items-center">
           <CiAirportSign1 className="ml-2" color="darkblue"/> {/* Adjust spacing with `ml-2` if needed */}
           ExploreEase
           </span>
        </Link>
      </FlowbiteNavbar.Brand>

      <form className="hidden lg:flex items-center space-x-2">
        <TextInput
          type="text"
          placeholder="Search..."
          icon={AiOutlineSearch}
          className="lg:inline"
        />
      </form>

      <Button className="w-12 h-10 lg:hidden" color="gray">
        <AiOutlineSearch className="text-xl" />
      </Button>

      <div className="flex gap-1 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray">
          <FaMoon className="text-xl" />
        </Button>

        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button gradientDuoTone="purpleToBlue" outline pill>
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>

        <FlowbiteNavbar.Toggle />
      </div>

      <FlowbiteNavbar.Collapse>
        <FlowbiteNavbar.Link active={path === "/"} href="/">
          <Link href="/">Home</Link>
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link active={path === "/about"} href="/about">
          <Link href="/about">About</Link>
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link active={path === "/contact"} href="/contact">
          <Link href="/contact">Contact</Link>
        </FlowbiteNavbar.Link>
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  );
}
