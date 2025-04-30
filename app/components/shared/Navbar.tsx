"use client";

import React, { useEffect, useState } from "react";
import { ConnectAndSIWE } from "./ConnectAndSIWE";
import { useAccount } from "wagmi";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const account = useAccount();

  console.log("account", account.address);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`fixed top-0 w-full backdrop-blur max-w-7xl z-50 ${
        isScrolled ? "" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between mt-2">
        <div className="flex items-center gap-3">
          <div className="relative"></div>
          <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-3xl font-extrabold tracking-normal text-transparent font-serif">
            tippa.
          </span>
        </div>
        <div className="flex gap-4">
          <ConnectAndSIWE />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
