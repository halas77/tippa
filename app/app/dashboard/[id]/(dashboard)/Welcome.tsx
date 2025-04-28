"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { EditIcon, X, Instagram, Music2, Youtube } from "lucide-react";
import TipPage from "./TipPage";
import RecentActivity from "./RecentActivity";
import { supabase } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

type SocialLinks = {
  twitter: string;
  instagram: string;
  tiktok: string;
  youtube: string;
};

type FormInputs = {
  message: string;
  creator_link: string;
} & SocialLinks;

const Welcome: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isMessageLoading, setMessageLoading] = useState(false);
  const [isSocialsLoading, setIsSocialsLoading] = useState(false);
  const [editingWelcome, setEditingWelcome] = useState(false);
  const [tipLink, setTipLink] = useState("");
  const [editingSocials, setEditingSocials] = useState<string | null>(null);
  const [historyData, setHistoryData] = useState([]);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isDirty },
  } = useForm<FormInputs>({
    defaultValues: {
      message: "",
      twitter: "",
      instagram: "",
      tiktok: "",
      youtube: "",
      creator_link: "",
    },
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("creators")
          .select("*, history(*)")
          .eq("id", id)
          .single();

        if (error) throw error;

        reset({
          message: data.message || "You don't have a welcome message yet.",
          twitter: data.twitter || "No X (Twitter) link provided.",
          instagram: data.instagram || "No Instagram link provided.",
          tiktok: data.tiktok || "No Tiktok link provided.",
          youtube: data.youtube || "No YouTube link provided.",
          creator_link: data.creator_link || "",
        });

        setTipLink(data.creator_link || "");
        setHistoryData(data.history || []);
      } catch (error) {
        console.error("Error fetching creator data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id, reset]);

  const handleEditWelcomeMessage = async (newMessage: string) => {
    setMessageLoading(true);
    try {
      const { error } = await supabase
        .from("creators")
        .update({ message: newMessage })
        .eq("id", id);

      if (error) throw error;

      reset((prev) => ({ ...prev, message: newMessage }));
      setEditingWelcome(false);
    } catch (error) {
      console.error("Error updating welcome message:", error);
    } finally {
      setMessageLoading(false);
    }
  };

  const handleEditSocialLink = async (
    platform: keyof SocialLinks,
    newLink: string
  ) => {
    setIsSocialsLoading(true);
    try {
      const { error } = await supabase
        .from("creators")
        .update({ [platform]: newLink })
        .eq("id", id);

      if (error) throw error;

      reset((prev) => ({ ...prev, [platform]: newLink }));
      setEditingSocials(null);
    } catch (error) {
      console.error(`Error updating ${platform} link:`, error);
    } finally {
      setIsSocialsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-full  space-y-6">
          <Skeleton className="h-8 w-1/3 bg-[#3A2F26]" />
          <Skeleton className="h-24 bg-[#3A2F26]" />
          <Skeleton className="h-8 w-1/3 bg-[#3A2F26]" />
          <Skeleton className="h-48 bg-[#3A2F26]" />
        </div>
      </div>
    );
  }

  const socials: (keyof SocialLinks)[] = [
    "instagram",
    "tiktok",
    "youtube",
    "twitter",
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Welcome Message */}
        <Card className="bg-[#2C2011] border border-[#3A2F26]">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#D2B48C]">Welcome Message</span>
              <Button
                variant="ghost"
                size="sm"
                disabled={loading}
                onClick={() => setEditingWelcome(!editingWelcome)}
                className="text-primary hover:bg-primary/80 h-8 w-8 p-2 ease-in-out duration-300 cursor-pointer"
              >
                <EditIcon size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {editingWelcome ? (
              <form className="space-y-4">
                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      className="w-full bg-[#1A120B] border border-[#3A2F26] rounded-lg p-3 text-sm text-[#E5DCC3] focus:outline-none"
                      rows={3}
                    />
                  )}
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    onClick={handleSubmit((data) =>
                      handleEditWelcomeMessage(data.message)
                    )}
                    type="submit"
                    disabled={!isDirty || isMessageLoading}
                    className="bg-primary text-[#1A120B] hover:bg-primary/80 h-8 px-4"
                  >
                    {isMessageLoading ? <span>Saving...</span> : "Save"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      reset();
                      setEditingWelcome(false);
                    }}
                    className="border-[#3A2F26] bg-gray-300 hover:bg-gray-300/80 h-8 px-4"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <p className="text-[#E5DCC3]/90 italic">
                &quot;{watch("message")}&quot;
              </p>
            )}
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className="bg-[#2C2011] border border-[#3A2F26]">
          <CardHeader className="pb-2">
            <span className="text-sm text-[#D2B48C]">Social Links</span>
          </CardHeader>
          <CardContent className="space-y-4">
            {socials.map((platform) => (
              <div key={platform} className="flex items-center gap-3">
                <div className="text-[#D2B48C]">
                  {platform === "instagram" && <Instagram size={18} />}
                  {platform === "tiktok" && <Music2 size={18} />}
                  {platform === "youtube" && <Youtube size={18} />}
                  {platform === "twitter" && <X size={18} />}
                </div>
                {editingSocials === platform ? (
                  <div className="flex gap-2 w-full">
                    <Controller
                      name={platform}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="w-full bg-[#1A120B] border border-[#3A2F26] rounded-lg px-3 py-1 text-sm text-[#E5DCC3] focus:outline-none"
                        />
                      )}
                    />

                    <Button
                      onClick={handleSubmit((data) =>
                        handleEditSocialLink(platform, data[platform])
                      )}
                      disabled={isSocialsLoading}
                      className="bg-[#D2B48C] text-[#1A120B] hover:bg-[#caa97f] h-8 px-3 cursor-pointer"
                    >
                      {isSocialsLoading ? <span>Saving...</span> : "Save"}
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm text-[#E5DCC3]/90 truncate">
                      {watch(platform)}
                    </span>
                    <Button
                      variant="ghost"
                      disabled={loading}
                      onClick={() => setEditingSocials(platform)}
                      className="text-primary hover:bg-primary/80 h-8 w-8 p-2 cursor-pointer"
                    >
                      <EditIcon size={14} />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <TipPage tipLink={tipLink} />
        <RecentActivity historyData={historyData} />
      </div>
    </div>
  );
};

export default Welcome;
