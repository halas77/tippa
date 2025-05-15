"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckIcon, CopyIcon, Loader2, Trash } from "lucide-react";
import React, { useState } from "react";
import AddTipAmount from "./AddTipAmount";
import { supabase } from "@/lib/utils";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const TipPage = ({
  tipLink,
  tipLink2,
}: {
  tipLink: string;
  tipLink2: string;
}) => {
  const [copied, setCopied] = useState(false);
  const [copied2, setCopied2] = useState(false);

  const { id } = useParams();

  const handleCopy = (tipPageUrl: string, isMain: boolean) => {
    navigator.clipboard.writeText(tipPageUrl);
    if (isMain) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setCopied2(true);
      setTimeout(() => setCopied2(false), 2000);
    }
  };

  const [deleting, setDeleting] = useState(false);

  async function updateCreatorLink2() {
    setDeleting(true);
    const { error } = await supabase
      .from("creators")
      .update({ creator_link2: null })
      .eq("id", id);

    if (error) {
      console.error("Error deleting Tip Amount:", error.message);
      toast.error("Error deleting Tip Amount", {
        description: error.message,
      });
    } else {
      toast.success("Tip Amount deleted successfully!");
    }
    setDeleting(false);
  }
  return (
    <div className="space-y-6">
      {/* Tip Page URL */}
      <Card className="bg-[#2C2011] border border-[#3A2F26]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#D2B48C]">Your Tip Page</span>
            {!tipLink2 && <AddTipAmount tipLink={tipLink} />}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-[#1A120B] p-2 rounded border border-[#3A2F26]">
              <p className="text-sm text-[#E5DCC3]/90 truncate">
                {" "}
                {tipLink2.slice(0, 30)}...
              </p>
            </div>
            <Button
              onClick={() => handleCopy(tipLink, true)}
              className="bg-[#D2B48C] text-[#1A120B] hover:bg-[#caa97f] h-9 w-9 p-2 cursor-pointer"
            >
              {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
            </Button>
          </div>

          {tipLink2 && (
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-[#1A120B] p-2 rounded border border-[#3A2F26]">
                <p className="text-sm text-[#E5DCC3]/90 truncate">
                  {tipLink2.slice(0, 30)}...
                </p>
              </div>
              <Button
                size={"sm"}
                onClick={() => handleCopy(tipLink2, false)}
                className="bg-[#D2B48C] text-[#1A120B] hover:bg-[#caa97f] cursor-pointer"
              >
                {copied2 ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
              </Button>
              <Button
                size={"sm"}
                disabled={deleting}
                onClick={updateCreatorLink2}
                className="bg-red-200 text-red-700 hover:bg-[#caa97f]  cursor-pointer"
              >
                {deleting ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Trash size={18} />
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TipPage;
