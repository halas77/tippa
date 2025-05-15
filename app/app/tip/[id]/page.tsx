"use client";

import { useEffect, useState } from "react";
import TipCard from "./TipCard";
import { supabase } from "@/lib/utils";
import { useParams } from "next/navigation";
import Loading from "@/components/shared/Loading";

interface UserData {
  amount: string;
  tipper: string;
  message: string;
  tx_hash: string;
  created_at: string;
}

const Page = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("history")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching user data:", error.message);
        } else {
          console.log("User data fetched successfully:", data);
          setUserData(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br px-4">
      <TipCard
        imageUrl="/10.webp"
        amount={userData?.amount || "0.00"}
        tipperAddress={userData?.tipper || "0x123...abc"}
        message={userData?.message || "No message provided"}
        timestamp={
          userData?.created_at
            ? new Date(userData.created_at).toLocaleString()
            : "N/A"
        }
        transactionHash={userData?.tx_hash}
      />
    </div>
  );
};

export default Page;
