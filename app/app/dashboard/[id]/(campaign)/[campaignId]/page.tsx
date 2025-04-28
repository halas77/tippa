import Footer from "@/app/(landing)/Footer";
import React from "react";
import CampaignDetail from "./CampaignDetail";

const page = () => {
  return (
    <main className="min-h-screen bg-[#1A120B] text-[#E5DCC3] px-4 py-12 flex justify-center">
      <div className="w-full max-w-6xl space-y-8">
        <CampaignDetail />
        <Footer />
      </div>
    </main>
  );
};

export default page;
