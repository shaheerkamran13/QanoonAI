// components/NavIcons.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function NavIcons() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const router = useRouter();

  // TEMPORARY LOGIN ATTEMPT, AUTH WILL BE IMPLEMENTED LATER
  const isLoggedIn = false;

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    }
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-6 xl:gap-8">
      {/* PROFILE COMPONENT */}
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>

      {/* CART COMPONENT */}
      <div
        className="relative"
        onMouseEnter={() => setIsCartOpen(true)}
        onMouseLeave={() => setIsCartOpen(false)}
      >
        <div className="cursor-pointer">
          <Image
            src={"/cart.png"}
            alt="cart"
            width={22}
            height={22}
            className="cursor-pointer"
            aria-label="Cart"
          />
        </div>

        {/* CART DROPDOWN */}
        {isCartOpen && (
          <div
            className="absolute p-4 rounded-md right-0 bg-white shadow-lg min-w-[300px] animate-popup transition-opacity duration-500 delay-200"
            onMouseEnter={() => setIsCartOpen(true)}
            onMouseLeave={() => setIsCartOpen(false)}
            role="menu"
            aria-labelledby="cart-menu"
          ></div>
        )}
      </div>
    </div>
  );
}
