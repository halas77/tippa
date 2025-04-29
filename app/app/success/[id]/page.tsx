"use client";

import { CheckCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

const SuccessPage = () => {
  const { id } = useParams();

  const tipUrl = `localhost:3000/tip/${id}`;

  const tweetText = encodeURIComponent(
    `I just sent a tip using this amazing platform! 🌟 
    
    Check it out here: ${tipUrl}
  
    #TipsForGood #SupportCreators #TipWithtippa`
  );
  const twitterUrl = `https://x.com/intent/post?text=${tweetText}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  px-4">
      <div className="bg-gradient-to-br from-[#2C2011] to-[#1A120B] p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
        <CheckCircle className="text-primary mx-auto mb-4" size={48} />
        <h1 className="text-2xl font-bold text-primary mb-2">Success!</h1>
        <p className="text-gray-300 mb-6">
          Your tip has been sent successfully. Thank you for using our platform!
        </p>

        <div className="flex flex-col justify-center gap-4 mt-6">
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center  gap-2 px-4 py-2 bg-gradient-to-r from-primary/30 to-primary/30 text-white rounded-lg hover:bg-gray-900/50 transition-colors cursor-pointer"
          >
            <p className="mr01 font-medium">X</p>
            Share on X (twitter)
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
