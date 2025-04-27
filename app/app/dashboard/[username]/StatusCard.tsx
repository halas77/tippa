"use client";

import { useParams } from "next/navigation";
import React from "react";

const StatusCard = () => {
  const { username } = useParams();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-medium text-[#D2B48C]">
        {username}&apos;s Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <StatBox title="Total Tips" value="36 USDC" />
        <StatBox title="Supporters" value="24" />
        <StatBox title="This Month" value="+120%" />
      </div>
    </div>
  );
};

const StatBox = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-[#2C2011] border border-[#3A2F26] rounded-lg p-4">
    <p className="text-sm text-[#E5DCC3]/70">{title}</p>
    <p className="text-lg font-medium text-[#D2B48C]">{value}</p>
  </div>
);

export default StatusCard;
