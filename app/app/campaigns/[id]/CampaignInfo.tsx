import React from "react";
import Image from "next/image";
import { CampaignType } from "@/app/dashboard/[id]/(campaign)/CampaignCard";

const CampaignInfo = (campaign: CampaignType) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-8 bg-[#2C2011] border border-[#3A2F26] rounded-2xl p-6">
      <div className="w-full rounded-2xl">
        <Image
          src={"/faitto.png"}
          width={200}
          height={200}
          alt={campaign?.title || "Campaign image"}
          className="w-full object-cover border border-[#3A2F26] rounded-lg"
        />
      </div>

      {/* Campaign Info */}
      <div className="space-y-6">
        <div>
          <p className="text-[#D2B48C] text-sm mb-1">Campaign Title</p>
          <h2 className="text-2xl font-semibold text-[#E5DCC3]">
            {campaign?.title}
          </h2>
        </div>

        <div>
          <p className="text-[#D2B48C] text-sm mb-1">Description</p>
          <p className="text-[#E5DCC3] leading-relaxed">
            {campaign?.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-[#D2B48C] text-sm mb-1">Target Amount (USDC)</p>
            <p className="text-[#E5DCC3] text-lg">
              {campaign?.target_amount} USDC
            </p>
          </div>
          <div>
            <p className="text-[#D2B48C] text-sm mb-1">
              Collected Amount (USDC)
            </p>
            <p className="text-[#E5DCC3] text-lg">
              {campaign?.collected_amount} USDC
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-[#D2B48C] text-sm mb-1">Start Date</p>
            <p className="text-[#E5DCC3]">
              {campaign?.start_date
                ? new Date(campaign.start_date).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-[#D2B48C] text-sm mb-1">End Date</p>
            <p className="text-[#E5DCC3]">
              {campaign?.end_date
                ? new Date(campaign.end_date).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignInfo;
