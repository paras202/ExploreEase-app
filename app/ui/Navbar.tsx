"use client";

import { Navbar as FlowbiteNavbar, TextInput, Button } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun  } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { CiAirportSign1 } from "react-icons/ci";
import { useTheme } from "next-themes";

export default function Navbar() {
  const path = usePathname();
  const { theme, setTheme } = useTheme();

  return (
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

      <Button className="w-12 h-10 lg:hidden" color="gray">
        <AiOutlineSearch className="text-xl" />
      </Button>

      <div className="flex gap-1 md:order-2">
        {/* Theme Toggle Button */}
        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-12 h-10 hidden sm:inline"
          color="gray"
        >
          {theme === "dark" ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
        </Button>

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
  );
}