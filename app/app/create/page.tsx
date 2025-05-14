"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Twitter, Instagram, Globe, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useAccount, useWriteContract } from "wagmi";
import { TIPJAR_ABI, CONTRACT_ADDRESS } from "../../lib/abi";

type FormData = {
  name: string;
  message: string;
  twitter?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
};

export default function CreatePage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const account = useAccount();

  const [checking, setChecking] = useState(false);
  const [isUnique, setIsUnique] = useState(false);
  const { writeContractAsync } = useWriteContract();

  const onSubmit = async (data: FormData) => {
    await writeContractAsync({
      abi: TIPJAR_ABI.abi,
      address: CONTRACT_ADDRESS,
      functionName: "registerCreator",
      args: [account.address],
    });

    const creatorLink = "https://tippa.vercel.app/" + data.name;

    const { data: insertedData, error } = await supabase
      .from("creators")
      .insert([
        {
          name: data.name,
          message: data.message,
          twitter: data.twitter,
          instagram: data.instagram,
          tiktok: data.tiktok,
          youtube: data.youtube,
          creator_link: creatorLink,
          address: account.address,
        },
      ])
      .select("id")
      .single();

    if (error) {
      console.error("Error inserting data:", error);
      toast.error("Transaction failed", {
        description: "Unable to complete transaction. Please try again.",
      });
    } else {
      toast.success("Success!", {
        description: "User has been created successfully.",
      });
      console.log("Data inserted successfully:", insertedData);
      window.location.href = `/dashboard/${insertedData?.id}`;
      reset();
    }
  };

  const username = watch("name");
  const [debouncedUsername] = useDebounce(username, 500);

  useEffect(() => {
    const checkUsername = async () => {
      if (!debouncedUsername || /\s/.test(debouncedUsername)) return;

      setChecking(true);

      console.log("debouncedUsername", debouncedUsername);

      const { data, error } = await supabase
        .from("creators")
        .select("name")
        .eq("name", debouncedUsername)
        .single();

      console.log("data", data);

      console.log("error", error);
      if (data) {
        setError("name", {
          type: "manual",
          message: "* Username already taken",
        });
      } else {
        setIsUnique(true);
        clearErrors("name");
      }

      setChecking(false);
    };

    checkUsername();
  }, [debouncedUsername, clearErrors, setError]);

  return (
    <main className="min-h-screen text-[#E5DCC3] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[#1A120B] to-[#2C2011]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="w-full max-w-xl md:w-3xl bg-gradient-to-br from-[#2C2011] to-[#1A120B] border border-[#3A2F26]/50 rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-center bg-gradient-to-r from-[#D2B48C] to-[#caa97f] bg-clip-text text-transparent font-semibold">
              Create Your Page
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-4">
              <p className="text-sm text-[#E5DCC3]/70 text-center mb-6 -mt-4">
                Share your tip page with supporters and receive crypto love 💛
              </p>

              {/* Required Fields Section */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#D2B48C]">
                    Username
                  </label>
                  <Input
                    placeholder="e.g. John"
                    className="bg-[#1A120B]/50 border-[#3A2F26] focus:ring-2 focus:ring-[#D2B48C] text-[#E5DCC3] placeholder-[#3A2F26] mt-2"
                    {...register("name", {
                      required: "* Username is required",
                      validate: (value) =>
                        !/\s/.test(value) || "* Username cannot contain spaces",
                    })}
                  />
                  {checking && (
                    <p className="text-xs text-yellow-400">
                      Checking availability...
                    </p>
                  )}

                  {errors.name && (
                    <p className="text-xs text-red-400">
                      {errors.name.message}
                    </p>
                  )}

                  {isUnique && (
                    <p className="text-xs text-green-400">
                      * Username is available
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#D2B48C] flex justify-between">
                    Welcome Message
                    <span className="ml-2 text-[#E5DCC3]/70 text-xs ">
                      {watch("message")?.length || 0}/100
                    </span>
                  </label>
                  <Textarea
                    rows={4}
                    placeholder="Write something to your supporters..."
                    className="bg-[#1A120B]/50 border-[#3A2F26] focus:ring-2 mt-2 focus:ring-[#D2B48C] text-[#E5DCC3] placeholder-[#3A2F26]"
                    maxLength={100}
                    {...register("message", {
                      required: "* Message is required",
                      maxLength: {
                        value: 100,
                        message: "* Message cannot exceed 100 characters",
                      },
                    })}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Social Links Section */}
              <div className="space-y-4">
                <p className="text-sm font-medium text-[#D2B48C]">
                  Social Links (optional)
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Twitter className="h-4 w-4 absolute left-3 top-3 text-[#3A2F26]" />
                    <Input
                      placeholder="Twitter"
                      className="pl-10 bg-[#1A120B]/50 border-[#3A2F26] text-[#E5DCC3] placeholder-[#3A2F26]"
                      {...register("twitter", {
                        pattern: {
                          value: /x\.com\/.+/,
                          message: "* Must be a valid X URL",
                        },
                      })}
                    />
                    {errors.twitter && (
                      <p className="text-xs mt-1 text-red-400">
                        {errors.twitter.message}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <Instagram className="h-4 w-4 absolute left-3 top-3 text-[#3A2F26]" />
                    <Input
                      placeholder="Instagram"
                      className="pl-10 bg-[#1A120B]/50 border-[#3A2F26] text-[#E5DCC3] placeholder-[#3A2F26]"
                      {...register("instagram", {
                        pattern: {
                          value: /instagram\.com\/.+/,
                          message: "* Must be a valid Instagram URL",
                        },
                      })}
                    />
                    {errors.instagram && (
                      <p className="text-xs mt-1 text-red-400">
                        {errors.instagram.message}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <Globe className="h-4 w-4 absolute left-3 top-3 text-[#3A2F26]" />
                    <Input
                      placeholder="Tiktok"
                      className="pl-10 bg-[#1A120B]/50 border-[#3A2F26] text-[#E5DCC3] placeholder-[#3A2F26]"
                      {...register("tiktok", {
                        pattern: {
                          value: /^(https?:\/\/).+/,
                          message: "* Must be a valid URL",
                        },
                      })}
                    />
                    {errors.tiktok && (
                      <p className="text-xs mt-1 text-red-400">
                        {errors.tiktok.message}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <Youtube className="h-4 w-4 absolute left-3 top-3 text-[#3A2F26]" />
                    <Input
                      placeholder="YouTube"
                      className="pl-10 bg-[#1A120B]/50 border-[#3A2F26] text-[#E5DCC3] placeholder-[#3A2F26]"
                      {...register("youtube", {
                        pattern: {
                          value: /youtube\.com\/.+/,
                          message: "* Must be a valid YouTube URL",
                        },
                      })}
                    />
                    {errors.youtube && (
                      <p className="text-xs mt-1 text-red-400">
                        {errors.youtube.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#D2B48C] to-[#caa97f] text-[#1A120B] hover:from-[#caa97f] hover:to-[#D2B48C] font-semibold py-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:shadow-[#D2B48C]/20 cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create My Tip Page"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
