import React from "react";
import { Alert } from "@/components/ui/alert";
import { Construction } from "lucide-react";

const Banner: React.FC = () => {
  return (
    <div className="sticky top-0 z-50 w-full -mt-8 mb-10">
      <Alert
        variant="default"
        className="flex items-center justify-between gap-3  bg-primary/10 border-primary/20 "
      >
        <div className="flex items-center gap-3">
          <Construction className="text-primary" />
          <div className="space-y-1 text-left">
            <p className="text-sm text-primary font-medium">
              Page Under Construction
            </p>
            <p className="text-sm text-gray-300">
              Testing available – Full smart contract integration coming soon.
              🔜
            </p>
          </div>
        </div>
      </Alert>
    </div>
  );
};

export default Banner;
