"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckIcon, CopyIcon } from "lucide-react";
import React, { useState } from "react";

const CopyCampaign = ({ tipLink }: { tipLink: string }) => {
  const [copied, setCopied] = useState(false);

  const tipPageUrl = tipLink;

  const handleCopy = () => {
    navigator.clipboard.writeText(tipPageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="space-y-6">
      {/* Tip Page URL */}
      <Card className="bg-[#2C2011] border border-[#3A2F26]">
        <CardHeader className="pb-2">
          <span className="text-sm text-[#D2B48C]">Your Tip Page</span>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-[#1A120B] p-2 rounded border border-[#3A2F26]">
              <p className="text-sm text-[#E5DCC3]/90 truncate">{tipPageUrl}</p>
            </div>
            <Button
              onClick={handleCopy}
              className="bg-[#D2B48C] text-[#1A120B] hover:bg-[#caa97f] h-9 w-9 p-2 cursor-pointer"
            >
              {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CopyCampaign;
