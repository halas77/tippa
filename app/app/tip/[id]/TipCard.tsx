import Link from "next/link";
import { Clock, ExternalLink, Wallet } from "lucide-react";
import Image from "next/image";

interface TipCardProps {
  imageUrl: string;
  amount: string;
  tipperAddress: string;
  message?: string;
  timestamp: string;
  transactionHash?: string;
}

const TipCard = ({
  imageUrl,
  amount,
  tipperAddress,
  message,
  timestamp,
  transactionHash,
}: TipCardProps) => {
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="bg-gradient-to-br from-[#2C2011] to-[#1A120B] rounded-2xl shadow-xl p-6 max-w-md w-full mx-auto">
      {/* Image Section */}
      <div className="relative rounded-xl overflow-hidden mb-4 ">
        <Image
          width={100}
          height={100}
          src={imageUrl}
          alt="Tip content"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Amount Section */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold text-primary">{amount} USDC</span>
      </div>

      {/* Tipper Info */}
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="text-primary w-5 h-5" />
        <span className="text-gray-300 font-mono">
          {truncateAddress(tipperAddress)}
        </span>
      </div>

      {/* Message */}
      {message !== "No message provided" && (
        <div className="mb-4">
          <p className="text-gray-300 italic">&quot;{message}&quot;</p>
        </div>
      )}

      {/* Transaction Details */}
      <div className="flex flex-wrap gap-4 items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-gray-300">
          <Clock className="w-4 h-4" />
          <span>{timestamp}</span>
        </div>

        <Link
          href={`https://sepolia.basescan.org/tx/${transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-primary hover:text-[#F5B458] transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View Transaction</span>
        </Link>
      </div>
    </div>
  );
};

export default TipCard;
