"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { CiAirportSign1 } from "react-icons/ci";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const path = usePathname();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="border-b-2 border-gray-200 bg-background">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="px-2 py-1 text-base bg-gradient-to-r from-green-300 via-purple-400 to-blue-500 rounded-lg text-white flex items-center">
            <CiAirportSign1 className="mr-2" color="darkblue" />
            ExploreEase
          </span>
        </Link>

        <div className="hidden lg:flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search..."
            className="w-64"
          />
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden sm:inline-flex"
          >
            {theme === "dark" ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
          </Button>

          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <AiOutlineSearch className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  <div className="flex flex-col space-y-4">
                    <Input type="text" placeholder="Search..." />
                    <Link href="/" onClick={() => setIsOpen(false)}>
                      Home
                    </Link>
                    <Link href="/about" onClick={() => setIsOpen(false)}>
                      About
                    </Link>
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      Contact
                    </Link>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}