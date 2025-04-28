import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const AddCampaign = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#C67F43] hover:bg-[#B56F33] text-white mb-8">
          Create New Campaign ☕
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#3E2B1F] border-[#5D4A3C] text-[#FAF3E0]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#F9D7A2]">
            Brew New Campaign
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Campaign Title"
            className="bg-[#2C1A0D] border-[#5D4A3C] text-[#FAF3E0]"
          />
          <Textarea
            placeholder="Description"
            className="bg-[#2C1A0D] border-[#5D4A3C] text-[#FAF3E0] h-32"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Funding Goal (ETH)"
              className="bg-[#2C1A0D] border-[#5D4A3C]"
            />
            <Input type="date" className="bg-[#2C1A0D] border-[#5D4A3C]" />
          </div>
          <Button className="w-full bg-[#C67F43] hover:bg-[#B56F33]">
            Launch Campaign
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCampaign;
