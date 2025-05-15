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
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddTipAmount = ({
  tipLink,
  fetchCreatorData,
}: {
  tipLink: string;
  fetchCreatorData: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({});

  const { id } = useParams();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const creatorLink = tipLink + `?amount=${data.creator_link2}`;

    const { error } = await supabase
      .from("creators")
      .update({ creator_link2: creatorLink })
      .eq("id", id);

    if (error) {
      console.error("Error creating campaign:", error.message);
      toast.error("Error creating campaign", {
        description: error.message,
      });
    } else {
      toast.success("Campaign created successfully!", {
        description: "Your link has been launched and is now live.",
      });
      setOpen(false);
      fetchCreatorData();
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          className="bg-primary hover:bg-primary/80 cursor-pointer"
        >
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-b from-[#1A120B] to-[#2C2011] border-0 max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle className="text-xl text-[#F9D7A2] mb-4">
            Create Custom Amount
            <p className="text-xs font-normal text-gray-300/70 mt-2">
              Create your own custom amount
            </p>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label
              htmlFor="amount"
              className="text-[#F9D7A2]/90 font-normal text-sm"
            >
              Amount
            </Label>
            <Input
              id="amount"
              placeholder="Amount"
              {...register("creator_link2", { required: "Title is required" })}
              className="bg-[#1A120B]/50 border-[#3A2F26] focus:ring-2 focus:ring-[#D2B48C] text-[#E5DCC3] placeholder-[#3A2F26] py-5 text-start"
            />
            {errors.creator_link2 && (
              <p className="text-red-500 text-xs mt-1">
                {typeof errors.creator_link2?.message === "string"
                  ? errors.creator_link2.message
                  : null}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-secondary hover:bg-secondary/80 mt-4 cursor-pointer"
          >
            {isSubmitting ? "Creating..." : "Create Amount"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTipAmount;
