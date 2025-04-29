import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import React from "react";
import CampaignDetail from "./CampaignDetail";

export interface CampaignType {
  id: number;
  image: string;
  title: string;
  description: string;
  target_amount: number;
  collected_amount: number;
  start_date: string;
  end_date: string;
  campaign_url: string;
}

const CampaignCard = (campaign: CampaignType) => {
  const progressPercentage =
    (campaign.collected_amount / campaign.target_amount) * 100;

  return (
    <Card className="bg-[#2C2011]  border border-[#3A2F26]">
      <CardHeader>
        <h3 className="text-xl font-bold text-[#F9D7A2]">{campaign.title}</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-[#FAF3E0]/80">{campaign.description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#C67F43]">Raised</span>
            <span className="text-[#FAF3E0]">
              {progressPercentage.toFixed(1)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2 bg-[#2C1A0D]" />
          <div className="flex justify-between text-sm">
            <span className="text-[#FAF3E0]/70">
              {campaign.collected_amount} ETH of {campaign.target_amount} ETH
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm text-red-400">
          Ends: {new Date(campaign.end_date).toLocaleDateString()}
        </span>
        <CampaignDetail {...campaign} />
      </CardFooter>
    </Card>
  );
};

export default CampaignCard;
