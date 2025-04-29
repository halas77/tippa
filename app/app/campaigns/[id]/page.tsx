"use client";

import { supabase } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CampaignType } from "@/app/dashboard/[id]/(campaign)/CampaignCard";
import Loading from "@/components/shared/Loading";
import NotFound from "@/components/shared/NotFound";
import CampaignInfo from "./CampaignInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Contribute from "./Contribute";

const Page = () => {
  const [campaign, setCampaign] = useState<CampaignType>();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const decodedText = typeof id === "string" ? decodeURIComponent(id) : "";

  const refetchCampaign = async () => {
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

  useEffect(() => {
    refetchCampaign();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Loading />;

  if (!campaign) return <NotFound />;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-8 min-h-screen">
      <Tabs defaultValue="contribute" className="w-full max-w-2xl">
        <TabsList className="grid  grid-cols-2 mx-auto w-full max-w-2xl justify-center bg-secondary/20">
          <TabsTrigger value="contribute">Contribute</TabsTrigger>
          <TabsTrigger value="campaignInfo">Campaign Info</TabsTrigger>
        </TabsList>
        <TabsContent value="contribute">
          <Contribute campaign={campaign} refetchCampaign={refetchCampaign} />
        </TabsContent>
        <TabsContent value="campaignInfo">
          <CampaignInfo {...campaign} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
