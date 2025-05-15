"use client";

import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Instagram, Youtube, Music2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import NotFound from "@/components/shared/NotFound";
import Loading from "@/components/shared/Loading";
import { useAccount } from "wagmi";
import useSendTip from "@/lib/tip";
import { useSearchParams } from "next/navigation";

type FormData = {
  amount: string;
  message: string;
};

export interface CreatorInfo {
  id: string;
  name: string;
  message: string;
  created_at: string;
  creator_link: string;
  instagram: string;
  tiktok: string;
  twitter: string;
  youtube: string;
  address: `0x${string}`;
}

const TIP_AMOUNTS = [5, 10, 20, 50];

export default function TipPage() {
  const { username } = useParams();
  const [userData, setUserData] = useState<CreatorInfo | null>(null);
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const account = useAccount();

  const searchParams = useSearchParams();
  const queryAmount = searchParams?.get("amount");

  console.log("first", queryAmount);

  useEffect(() => {
    if (queryAmount && !isNaN(Number(queryAmount))) {
      setSelectedAmount(Number(queryAmount));
      setIsCustomAmount(false);
      setValue("amount", queryAmount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryAmount]);

  const handleTipSelect = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustomAmount(false);
    setValue("amount", amount.toString());
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("creators")
          .select("*")
          .eq("name", username)
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

    if (username) {
      fetchData();
    }
  }, [username]);

  const { approveAllowance, handleTip } = useSendTip();

  const onSubmit = async (data: FormData) => {
    let tipTxHash: `0x${string}` | undefined;
    const allowanceTxHash = await approveAllowance(data.amount);

    if (userData?.address && allowanceTxHash) {
      tipTxHash = await handleTip(userData.address, data.amount);
    }

    if (tipTxHash) {
      const { data: tipData, error } = await supabase
        .from("history")
        .insert([
          {
            tipper: account.address,
            amount: parseFloat(data.amount),
            message: data.message,
            tx_hash: tipTxHash,
            creator_id: userData?.id,
          },
        ])
        .select("id")
        .single();

      if (error) {
        console.error("Error inserting tip data:", error.message);
      } else {
        console.log("Tip data inserted successfully:", tipData);
        toast.success("Success!", {
          description: `You have successfully tipped ${data.amount} USDC.`,
        });
        reset();
        window.location.href = `/success/${tipData?.id}`;
      }
    }
  };

  if (isLoading) return <Loading />;
  if (!userData) return <NotFound />;

  return (
    <main className="min-h-screen  bg-gradient-to-b from-[#1A120B] to-[#2C2011] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="w-full max-w-xl md:w-3xl bg-gradient-to-br from-[#2C2011] to-[#1A120B] border border-[#3A2F26]/50 rounded-3xl shadow-xl">
          <CardHeader className="flex flex-col items-center space-y-4 pt-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#D2B48C] to-[#caa97f] bg-clip-text text-transparent">
                @{username}
              </h1>
              <p className="text-sm text-[#E5DCC3]/80 max-w-lg mx-auto">
                {userData.message}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 pt-2">
              {userData.instagram && (
                <a
                  href={userData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram
                    size={20}
                    className="text-[#E5DCC3] hover:text-[#D2B48C] transition-all"
                  />
                </a>
              )}
              {userData.youtube && (
                <a
                  href={userData.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube
                    size={20}
                    className="text-[#E5DCC3] hover:text-[#D2B48C] transition-all"
                  />
                </a>
              )}
              {userData.tiktok && (
                <a
                  href={userData.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Music2
                    size={20}
                    className="text-[#E5DCC3] hover:text-[#D2B48C] transition-all"
                  />
                </a>
              )}
              {userData.twitter && (
                <a
                  href={userData.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <X
                    size={20}
                    className="text-[#E5DCC3] hover:text-[#D2B48C] transition-all"
                  />
                </a>
              )}
            </div>
          </CardHeader>

          <CardContent className="pb-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {!queryAmount ? (
                <div className="space-y-4">
                  <label className="text-sm text-[#E5DCC3] block">
                    {selectedAmount ? "Selected Amount" : "Choose Amount"}{" "}
                    (USDC)
                  </label>

                  {!isCustomAmount && (
                    <div className="grid grid-cols-2 gap-3">
                      {TIP_AMOUNTS.map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          className={`${
                            selectedAmount === amount
                              ? "bg-secondary/30 text-white border border-secondary hover:cursor-not-allowed hover:bg-secondary/30"
                              : "border-secondary bg-primary text-secondary-foreground hover:bg-secondary/80"
                          } h-12 rounded-lg font-medium transition-all cursor-pointer`}
                          onClick={() => handleTipSelect(amount)}
                        >
                          {amount} USDC
                        </Button>
                      ))}
                    </div>
                  )}

                  {!isCustomAmount && (
                    <p
                      className="cursor-pointer text-primary text-end py-4 text-sm underline inline-flex"
                      onClick={() => setIsCustomAmount(true)}
                    >
                      Enter Custom Amount
                    </p>
                  )}

                  {isCustomAmount && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <Input
                        placeholder="Enter amount in USDC"
                        className="bg-[#1A120B]/50 border-[#3A2F26] focus:ring-2 focus:ring-[#D2B48C] text-[#E5DCC3] placeholder-[#3A2F26] py-5 text-start"
                        {...register("amount", {
                          required: "Amount is required",
                          pattern: {
                            value: /^\d*\.?\d+$/,
                            message: "Enter a valid number",
                          },
                        })}
                      />
                      {errors.amount && (
                        <p className="text-sm text-red-400 mt-1">
                          {errors.amount.message}
                        </p>
                      )}
                    </motion.div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm text-[#E5DCC3] flex justify-between">
                      Message (Optional)
                      <span className="ml-2 text-[#E5DCC3] text-xs ">
                        {watch("message")?.length || 0}/100
                      </span>
                    </label>
                    <Textarea
                      rows={4}
                      placeholder="Write a message to your favorite creator..."
                      className="bg-[#1A120B]/50 border-[#3A2F26] focus:ring-2 mt-2 focus:ring-[#D2B48C] text-[#E5DCC3] placeholder-[#3A2F26]"
                      maxLength={100}
                      {...register("message", {
                        maxLength: {
                          value: 100,
                          message: "* Message cannot exceed 100 characters",
                        },
                      })}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-400">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm text-[#E5DCC3] flex justify-between">
                    Message (Optional)
                    <span className="ml-2 text-[#E5DCC3] text-xs ">
                      {watch("message")?.length || 0}/100
                    </span>
                  </label>
                  <Textarea
                    rows={4}
                    placeholder="Write a message to your favorite creator..."
                    className="bg-[#1A120B]/50 border-[#3A2F26] focus:ring-2 mt-2 focus:ring-[#D2B48C] text-[#E5DCC3] placeholder-[#3A2F26]"
                    maxLength={100}
                    {...register("message", {
                      maxLength: {
                        value: 100,
                        message: "* Message cannot exceed 100 characters",
                      },
                    })}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#D2B48C] to-[#caa97f] text-[#1A120B] hover:from-[#caa97f] hover:to-[#D2B48C] font-medium py-6 rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed"
                disabled={
                  isSubmitting || (!isCustomAmount && selectedAmount == null)
                }
              >
                {isSubmitting
                  ? "Processing..."
                  : `Send ${
                      (!isCustomAmount && selectedAmount) || ""
                    } USDC Tip`}
              </Button>
            </form>

            <p className="text-center text-sm text-[#E5DCC3]/70 mt-4">
              Powered by tippa • 100% on-chain
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
