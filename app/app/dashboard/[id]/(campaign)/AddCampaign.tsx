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
import { cn, supabase } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

type FormData = {
  title: string;
  description: string;
  imageURL: string;
  start_date: string;
  end_date: string;
  target_amount: number;
};

const AddCampaign = ({ fetchData }: { fetchData: () => void }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,

    formState: { errors },
  } = useForm<FormData>();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const campaign_url = `localhost:3000/campaigns/${data?.title}`;
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
        campaign_url: campaign_url,
      },
    ]);

    if (error) {
      console.error("Error creating campaign:", error.message);
      toast.error("Error creating campaign");
    } else {
      toast.success("Campaign created successfully!");
      setOpen(false);
      reset();
      fetchData();
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/80 mb-8 cursor-pointer">
          Create New Campaign
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
          {/* Title */}
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
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
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
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image URL */}
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
            {errors.imageURL && (
              <p className="text-red-500 text-xs mt-1">
                {errors.imageURL.message}
              </p>
            )}
          </div>

          {/* Target Amount */}
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
                validate: (value) =>
                  value > 0 || "Target amount must be greater than 0",
              })}
              className="bg-[#1A120B]/50 border-[#3A2F26] focus:ring-2 focus:ring-[#D2B48C] text-[#E5DCC3] placeholder-[#3A2F26] py-5 text-start"
            />
            {errors.target_amount && (
              <p className="text-red-500 text-xs mt-1">
                {errors.target_amount.message}
              </p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            <div className="space-y-2">
              <Label
                htmlFor="start_date"
                className="text-[#F9D7A2]/90 font-normal text-xs"
              >
                Start Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal py-5 bg-[#1A120B]/50 border-[#3A2F26] text-[#E5DCC3]",
                      !watch("start_date") && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {watch("start_date")
                      ? format(new Date(watch("start_date")), "PPP")
                      : "Pick a start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 ">
                  <Calendar
                    mode="single"
                    selected={
                      watch("start_date")
                        ? new Date(watch("start_date"))
                        : undefined
                    }
                    onSelect={(date) => {
                      setValue(
                        "start_date",
                        date?.toISOString().split("T")[0] || ""
                      );
                      trigger("start_date");
                    }}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              {errors.start_date && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.start_date.message}
                </p>
              )}
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <Label
                htmlFor="end_date"
                className="text-[#F9D7A2]/90 font-normal text-xs"
              >
                End Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal py-5 bg-[#1A120B]/50 border-[#3A2F26] text-[#E5DCC3]",
                      !watch("end_date") && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {watch("end_date")
                      ? format(new Date(watch("end_date")), "PPP")
                      : "Pick an end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      watch("end_date")
                        ? new Date(watch("end_date"))
                        : undefined
                    }
                    onSelect={(date) => {
                      setValue(
                        "end_date",
                        date?.toISOString().split("T")[0] || ""
                      );
                      trigger("end_date");
                    }}
                    initialFocus
                    disabled={(date) =>
                      watch("start_date")
                        ? date <= new Date(watch("start_date"))
                        : false
                    }
                  />
                </PopoverContent>
              </Popover>
              {errors.end_date && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.end_date.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-secondary hover:bg-secondary/80 mt-4 cursor-pointer"
          >
            {isLoading ? "Launching..." : "Launch Campaign"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCampaign;
