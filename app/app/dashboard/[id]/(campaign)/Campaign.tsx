"use client";

import { supabase } from "@/lib/utils";
import AddCampaign from "./AddCampaign";
import CampaignCard, { CampaignType } from "./CampaignCard";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const Campaign = () => {
  const [data, setData] = useState<CampaignType[]>();

  const { id } = useParams();

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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-end items-center mb-6">
        <AddCampaign />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((campaign, idx) => (
          <Link href={`/dashboard/${id}/${campaign.id}`} key={idx}>
            <CampaignCard {...campaign} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Campaign;
