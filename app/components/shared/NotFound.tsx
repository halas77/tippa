import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1A120B] to-[#2C2011]">
      <div className="text-center text-[#E5DCC3]">
        <h1 className="text-2xl font-bold">User Not Found</h1>
        <p className="mt-2">The user you are looking for does not exist.</p>
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-secondary   text-white font-medium rounded-xl mt-4"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
