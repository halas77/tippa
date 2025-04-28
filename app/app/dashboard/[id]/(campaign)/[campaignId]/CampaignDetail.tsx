"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { CampaignType } from "../CampaignCard";
import CopyCampaign from "./CopyCampaign";

const CampaignDetail = () => {
  const [campaign, setCampaign] = useState<CampaignType>();
  const [loading, setLoading] = useState(true);
  const { campaignId } = useParams();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const { data, error } = await supabase
          .from("campaigns")
          .select("*")
          .eq("id", campaignId)
          .single();

        if (error) throw error;
        setCampaign(data);
      } catch (error) {
        console.error("Error fetching campaign:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [campaignId]);

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-[#1A120B] p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex justify-between">
          <h1 className="text-3xl font-bold text-[#F9D7A2]">
            Campaign Overview
          </h1>
          <CopyCampaign tipLink={campaign?.campaign_url || ""} />
        </header>

        <section className="rounded-2xl bg-[#2C2011] p-8 shadow-xl">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Media Section */}
            <div className="space-y-6">
              <div className="aspect-video overflow-hidden rounded-xl border border-[#3A2F26]">
                <Image
                  src="/globe.svg"
                  alt={campaign?.title || "Campaign visual"}
                  width={800}
                  height={450}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-8">
              <div>
                <Label>Campaign Title</Label>
                <h2 className="text-3xl font-semibold text-[#E5DCC3]">
                  {campaign?.title}
                </h2>
              </div>

              <div>
                <Label>Description</Label>
                <p className="text-lg leading-relaxed text-[#E5DCC3]/90">
                  {campaign?.description}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <MetricCard
                  label="Target Amount"
                  value={`${campaign?.target_amount} USDC`}
                />
                <MetricCard
                  label="Collected Amount"
                  value={`${campaign?.collected_amount} USDC`}
                />
                <MetricCard
                  label="Start Date"
                  value={formatDate(campaign?.start_date)}
                />
                <MetricCard
                  label="End Date"
                  value={formatDate(campaign?.end_date)}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#D2B48C]">
    {children}
  </p>
);

const MetricCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="rounded-lg bg-[#3A2F26] p-4">
    <Label>{label}</Label>
    <div className="text-xl font-semibold text-[#E5DCC3]">{value || "N/A"}</div>
  </div>
);

export const LoadingSkeleton = () => (
  <div className="min-h-screen bg-[#1A120B] p-8">
    <div className="mx-auto max-w-7xl space-y-8">
      <Skeleton className="h-12 w-64 bg-[#2C2011]" />

      <div className="grid gap-12 md:grid-cols-2">
        <Skeleton className="aspect-video rounded-xl bg-[#2C2011]" />

        <div className="space-y-8">
          <div>
            <Skeleton className="mb-2 h-5 w-32 bg-[#2C2011]" />
            <Skeleton className="h-10 w-full bg-[#2C2011]" />
          </div>

          <div>
            <Skeleton className="mb-2 h-5 w-32 bg-[#2C2011]" />
            <Skeleton className="h-32 w-full bg-[#2C2011]" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-lg bg-[#2C2011]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default CampaignDetail;
