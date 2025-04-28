"use client";

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
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import React, { useState } from "react";
import { useParams } from "next/navigation";

type FormData = {
  title: string;
  description: string;
  imageURL: string;
  start_date: string;
  end_date: string;
  target_amount: number;
};

const AddCampaign = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const [open, setOpen] = useState(false);

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const { error } = await supabase.from("campaigns").insert([
      {
        title: data.title,
        description: data.description,
        image: data.imageURL,
        start_date: data.start_date,
        end_date: data.end_date,
        target_amount: data.target_amount,
        collected_amount: 0,
        user_id: id,
      },
    ]);

    if (error) {
      console.error("Error creating campaign:", error.message);
      toast.error("Error creating campaign");
    } else {
      toast.success("Campaign created successfully!");
      setOpen(false);
      reset();
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/80 mb-8 cursor-pointer">
          Create New Campaign ☕
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-b from-[#1A120B] to-[#2C2011] border-0 max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle className="text-xl text-[#F9D7A2] mb-4">
            Brew New Campaign
            <p className="text-xs font-normal text-gray-300/70 mt-2">
              Create a new campaign to fund your next project.
            </p>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-[#F9D7A2]/90 font-normal text-xs"
            >
              Title
            </Label>
            <Input
              id="title"
              placeholder="Campaign Title"
              {...register("title", { required: "Title is required" })}
              className="bg-[#1A120B]/50 border-[#3A2F26] focus:ring-2 focus:ring-[#D2B48C] text-[#E5DCC3] placeholder-[#3A2F26] py-5 text-start"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-[#F9D7A2]/90 font-normal text-xs"
            >
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Brief description about your campaign..."
              {...register("description", {
                required: "Description is required",
              })}
              className="bg-[#1A120B]/50 border-[#3A2F26] focus:ring-2 focus:ring-[#D2B48C] text-[#E5DCC3] placeholder-[#3A2F26] py-5 text-start"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="imageURL"
              className="text-[#F9D7A2]/90 font-normal text-xs"
            >
              Image URL
            </Label>
            <Input
              id="imageURL"
              placeholder="https://example.com/image.png"
              {...register("imageURL", { required: "Image URL is required" })}
              className="bg-[#1A120B]/50 border-[#3A2F26] focus:ring-2 focus:ring-[#D2B48C] text-[#E5DCC3] placeholder-[#3A2F26] py-5 text-start"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="target_amount"
              className="text-[#F9D7A2]/90 font-normal text-xs"
            >
              Target Amount (ETH)
            </Label>
            <Input
              id="target_amount"
              type="number"
              step="0.01"
              placeholder="0.5"
              {...register("target_amount", {
                required: "Target amount is required",
                valueAsNumber: true,
              })}
              className="bg-[#1A120B]/50 border-[#3A2F26] focus:ring-2 focus:ring-[#D2B48C] text-[#E5DCC3] placeholder-[#3A2F26] py-5 text-start"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="start_date"
                className="text-[#F9D7A2]/90 font-normal text-xs"
              >
                Start Date
              </Label>
              <Input
                id="start_date"
                type="date"
                {...register("start_date", {
                  required: "Start date is required",
                })}
                className="bg-[#1A120B]/50 border-[#3A2F26] focus:ring-2 focus:ring-[#D2B48C] text-[#E5DCC3] placeholder-[#3A2F26] py-5 text-start"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="end_date"
                className="text-[#F9D7A2]/90 font-normal text-xs"
              >
                End Date
              </Label>
              <Input
                id="end_date"
                type="date"
                {...register("end_date", { required: "End date is required" })}
                className="bg-[#1A120B]/50 border-[#3A2F26] focus:ring-2 focus:ring-[#D2B48C] text-[#E5DCC3] placeholder-[#3A2F26] py-5 text-start"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-secondary hover:bg-secondary/80 mt-4 cursor-pointer"
          >
            {isLoading ? "Lanching..." : "Launch Campaign"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCampaign;
