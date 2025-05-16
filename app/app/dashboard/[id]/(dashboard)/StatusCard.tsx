"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CONTRACT_ADDRESS, TIPJAR_ABI } from "@/lib/abi";
import { supabase } from "@/lib/utils";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";

const StatusCard = () => {
  const { address } = useAccount();
  const { data, isFetching } = useReadContract({
    abi: TIPJAR_ABI.abi,
    address: CONTRACT_ADDRESS,
    functionName: "creatorBalances",
    args: [address],
  });

  const [supports, setSupports] = React.useState<number | null>(null);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const fetchSupports = async () => {
      try {
        const { data: countData, error } = await supabase
          .from("history")
          .select("id")
          .eq("creator_id", id);

        if (error) throw error;
        const count = countData.length;
        console.log("count", count);
        setSupports(count);
      } catch {
        setSupports(0);
      }
    };
    fetchSupports();
  }, [id]);

  // Format BigInt data to a readable string (e.g., Ether)
  const formattedData = data
    ? (Number(data) / 1e6).toLocaleString(undefined, {
        maximumFractionDigits: 4,
      }) + " USDC"
    : "";

  const formmatedAddr = address?.slice(0, 6) + "..." + address?.slice(-6);

  if (isFetching)
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="w-full h-20 bg-primary/20" />
          <Skeleton className="w-full h-20 bg-primary/20" />
          <Skeleton className="w-full h-20 bg-primary/20" />
        </div>
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <StatBox title="Total Tips" value={formattedData} />
        <StatBox title="Supports" value={supports?.toString() || "0"} />
        <StatBox title="Account" value={formmatedAddr || ""} />
      </div>
    </div>
  );
};

const StatBox = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-[#2C2011] border border-[#3A2F26] rounded-lg p-4">
    <p className="text-sm text-[#E5DCC3]/70">{title}</p>
    <p className="text-lg font-medium text-[#D2B48C]">{value}</p>
  </div>
);

export default StatusCard;
