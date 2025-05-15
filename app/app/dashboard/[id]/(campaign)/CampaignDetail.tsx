"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { CampaignType } from "./CampaignCard";
import { CheckIcon, CopyIcon, LinkIcon } from "lucide-react";
import { useState } from "react";

const CampaignDetail = (campaign: CampaignType) => {
  const [copied, setCopied] = useState(false);
  const campaignUrl = campaign.campaign_url;

  const handleCopy = () => {
    navigator.clipboard.writeText(campaignUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer bg-[#D2B48C] text-[#1A120B] hover:bg-[#caa97f]">
          View More
        </Button>
      </DialogTrigger>

      <DialogContent
        className={`sm:max-w-5xl bg-[#1A120B] border border-[#3A2F26] p-6 rounded-2xl h-[500px] overflow-y-auto `}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#E5DCC3] font-bold">
            {campaign?.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-10 mt-6">
          {/* Image */}
          <div className="flex items-start justify-center">
            <Image
              width={500}
              height={300}
              src={"/place.png"}
              alt={campaign?.title || "Campaign Image"}
              className="w-full h-72 object-cover rounded-xl border border-[#3A2F26]"
            />
          </div>

          {/* Campaign Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="flex items-center text-[#D2B48C] text-xs gap-1">
                <LinkIcon size={16} /> Share the link with your supporters
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-[#2C2011] p-2 rounded border border-[#3A2F26]">
                  <p className="text-xs text-[#E5DCC3]/90 truncate">
                    {campaignUrl.slice(0, 30)}...
                  </p>
                </div>
                <Button
                  onClick={handleCopy}
                  className="bg-[#D2B48C] hover:bg-[#caa97f] text-[#1A120B] h-9 w-9 p-2 transition cursor-pointer"
                >
                  {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
                </Button>
              </div>
            </div>
            <div>
              <p className="flex items-center text-[#D2B48C] text-xs gap-1">
                Description
              </p>
              <p className="text-[#E5DCC3] text-sm leading-relaxed">
                {campaign?.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="flex items-center text-[#D2B48C] text-xs gap-1">
                  Target Amount
                </p>
                <p className="text-[#E5DCC3] text-lg">
                  {campaign?.target_amount} USDC
                </p>
              </div>
              <div>
                <p className="flex items-center text-[#D2B48C] text-xs gap-1">
                  Collected Amount
                </p>
                <p className="text-[#E5DCC3] text-lg">
                  {campaign?.collected_amount} USDC
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="flex items-center text-[#D2B48C] text-xs gap-1">
                  Start Date
                </p>
                <p className="text-[#E5DCC3]">
                  {campaign?.start_date
                    ? new Date(campaign.start_date).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="flex items-center text-[#D2B48C] text-xs gap-1">
                  End Date
                </p>
                <p className="text-[#E5DCC3]">
                  {campaign?.end_date
                    ? new Date(campaign.end_date).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
            {/* Share Link */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDetail;
