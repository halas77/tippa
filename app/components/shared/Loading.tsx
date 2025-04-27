import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-[#E5DCC3] text-base flex justify-center items-center gap-2">
        <Loader2 className="animate-spin mx-auto" size={20} />
        Loading...
      </p>
    </main>
  );
};

export default Loading;
