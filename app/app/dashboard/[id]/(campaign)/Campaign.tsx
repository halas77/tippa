"use client";

import { supabase } from "@/lib/utils";
import AddCampaign from "./AddCampaign";
import CampaignCard, { CampaignType } from "./CampaignCard";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Campaign = () => {
  const [data, setData] = useState<CampaignType[]>();

  useEffect(() => {
    const fetchData = async () => {
      const { data: campaigns, error } = await supabase
        .from("campaigns")
        .select("*");

      console.log("campaigns", campaigns);

      if (error) {
        console.error("Error fetching campaigns:", error);
        return;
      }
      setData(campaigns);
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-end items-center mb-6">
          <Skeleton className="w-40 h-10 bg-[#3A2F26]" />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <Skeleton className="h-52 w-80 bg-[#3A2F26]" />
          <Skeleton className="h-52 w-80 bg-[#3A2F26]" />
          <Skeleton className="h-52 w-80 bg-[#3A2F26]" />
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-end items-center mb-6">
          <AddCampaign />
        </div>
        <div className="w-full flex justify-center items-center h-52 bg-[#3A2F26]/50 rounded-lg">
          <h1 className="text-gray-300 text-base">No campaigns found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-end items-center mb-6">
        <AddCampaign />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((campaign, idx) => (
          <CampaignCard key={idx} {...campaign} />
        ))}
      </div>
    </div>
  );
};

export default Campaign;
