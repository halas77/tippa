import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";
import { CampaignType } from "@/app/dashboard/[id]/(campaign)/CampaignCard";

const Contribute = (campaign: CampaignType) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ amount: string }>();

  const onSubmit = async (data: { amount: string }) => {
    try {
      const amount = parseFloat(data.amount);
      const newAmount = campaign.collected_amount + amount;
      const { data: insertedData, error } = await supabase
        .from("campaigns")
        .update({ collected_amount: newAmount })
        .eq("id", campaign.id);

      if (error) {
        console.error("Error updating campaign:", error);
        return;
      }

      console.log("Campaign updated successfully:", insertedData);
      toast.success("Contribution successful!");
      reset();
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-8 bg-[#2C2011] border border-[#3A2F26] rounded-2xl p-6">
      <div className="w-full rounded-2xl">
        <Image
          src={"/faitto.png"}
          width={200}
          height={200}
          alt={"Campaign image"}
          className="w-full object-cover border border-[#3A2F26] rounded-lg"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <p className="text-[#D2B48C] text-sm mb-1">
          Contribute to this Campaign
        </p>
        <div className="flex items-center gap-4">
          <Input
            type="number"
            placeholder="Enter amount (USDC)"
            {...register("amount", {
              required: "Amount is required",
              validate: (value) => {
                const amount = parseFloat(value);
                if (isNaN(amount) || amount <= 0) {
                  return "Amount must be a positive number";
                }
                return true;
              },
            })}
            className="flex-1 bg-[#1A120B] border-[#3A2F26] text-[#E5DCC3] placeholder:text-[#D2B48C]/70 py-6"
          />
          <Button
            type="submit"
            className="bg-[#D2B48C] text-[#1A120B] hover:bg-[#caa97f] cursor-pointer"
          >
            Contribute
          </Button>
        </div>
        <p className="text-red-500 text-sm">
          {errors.amount && errors.amount.message}
        </p>
      </form>
    </div>
  );
};

export default Contribute;
