import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { customScrollBar } from "@/lib/utils";

interface PropTypes {
  historyData: {
    id: string;
    tipper: string;
    amount: string;
    message: string;
  }[];
}

const RecentActivity = ({ historyData }: PropTypes) => {
  const [open, setOpen] = useState(false);

  const renderHistoryItem = (tip: PropTypes["historyData"][0], idx: number) => (
    <div key={idx} className="p-3 bg-[#1A120B] rounded border border-[#3A2F26]">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-[#D2B48C]">
            {tip.tipper.slice(0, 6)}...{tip.tipper.slice(-6)}
          </p>
          <p className="text-xs text-[#E5DCC3]/90 mt-1">{tip.amount} USDC</p>
        </div>
      </div>
      {tip.message && (
        <p className="text-xs mt-2 text-[#D2B48C]">&quot;{tip.message}&quot;</p>
      )}
    </div>
  );

  return (
    <Card className="bg-[#2C2011] border border-[#3A2F26]">
      <CardHeader className="pb-2">
        <span className="text-sm text-[#D2B48C]">Recent Activity</span>
      </CardHeader>
      <CardContent className="space-y-4">
        {historyData.length === 0 && (
          <div className="text-center text-xs text-[#E5DCC3]/90">
            No recent activity
          </div>
        )}
        {historyData.toReversed().slice(0, 2).map(renderHistoryItem)}
        {historyData.length > 2 && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="text-xs text-[#D2B48C] underline ml-auto block cursor-pointer">
                View More
              </button>
            </DialogTrigger>
            <DialogContent className="bg-[#2C2011] border-[#3A2F26] ">
              <DialogHeader>
                <DialogTitle className="text-[#D2B48C] text-base">
                  Full Activity History
                </DialogTitle>
              </DialogHeader>

              <div
                className={`space-y-4 mt-4 max-h-[60vh] overflow-y-auto ${customScrollBar} `}
              >
                {historyData.toReversed().map(renderHistoryItem)}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
