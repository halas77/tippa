"use client";

import { supabase } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CampaignType } from "@/app/dashboard/[id]/(campaign)/CampaignCard";
import { LoadingSkeleton } from "@/app/dashboard/[id]/(campaign)/[campaignId]/CampaignDetail";

const Page = () => {
  const [campaign, setCampaign] = useState<CampaignType>();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const decodedText = typeof id === "string" ? decodeURIComponent(id) : "";
    const fetchCampaign = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .eq("title", decodedText)
        .single();

      if (error) {
        console.error("Error fetching campaign:", error);
      } else {
        setCampaign(data);
      }
      setLoading(false);
    };

    fetchCampaign();
  }, [id]);

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen p-8">
      <div className=" mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-[#F9D7A2] mb-6">
          Campaign Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#2C2011] border border-[#3A2F26] rounded-2xl p-6">
          <div className="w-full overflow-hidden rounded-2xl">
            <Image
              src={"/globe.svg"}
              width={200}
              height={200}
              alt={campaign?.title || "Campaign image"}
              className="w-full object-cover border border-[#3A2F26] max-h-72"
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
                <p className="text-[#D2B48C] text-sm mb-1">
                  Target Amount (USDC)
                </p>
                <p className="text-[#E5DCC3] text-lg">
                  {campaign?.target_amount} USDC
                </p>
              </div>
              <div>
                <p className="text-[#D2B48C] text-sm mb-1">
                  Target Amount (USDC)
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

        {/* Image Preview */}
      </div>
    </div>
  );
};

export default Page;
