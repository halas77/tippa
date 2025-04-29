"use client";

import { supabase } from "@/lib/utils";
import AddCampaign from "./AddCampaign";
import CampaignCard, { CampaignType } from "./CampaignCard";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";

const Campaign = () => {
  const [data, setData] = useState<CampaignType[]>();

  const { id } = useParams();

  const fetchData = async () => {
    const { data: campaigns, error } = await supabase
      .from("campaigns")
      .select("*")
      .eq("user_id", id);

    console.log("campaigns", campaigns);

    if (error) {
      console.error("Error fetching campaigns:", error);
      return;
    }
    setData(campaigns);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-end items-center mb-10">
          <Skeleton className="w-40 h-10 bg-[#3A2F26]" />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
          <Skeleton className="h-56 w-[22rem] rounded-xl bg-[#3A2F26]" />
          <Skeleton className="h-56 w-[22rem] rounded-xl bg-[#3A2F26]" />
          <Skeleton className="h-56 w-[22rem] rounded-xl bg-[#3A2F26]" />
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="p-6 max-w-7xl mx-auto min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className=" text-2xl font-semibold">Campaigns</h3>
            <p className="text-xs opacity-80">
              Create, view, and manage all your campaigns effortlessly.
            </p>
          </div>
          <AddCampaign fetchData={fetchData} />
        </div>
        <div className="w-full flex flex-col justify-center items-center h-52 bg-[#3A2F26]/50 rounded-lg">
          <h1 className="text-gray-300 text-base">No campaigns found</h1>
          <p className="text-sm opacity-80 mb-4 mt-2">
            Create a new campaign to fund your next project.
          </p>
          <AddCampaign fetchData={fetchData} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className=" text-2xl font-semibold">Campaigns</h3>
          <p className="text-xs opacity-80">
            Create, view, and manage all your campaigns effortlessly.
          </p>
        </div>
        <AddCampaign fetchData={fetchData} />
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
