import { useAccount, useSignTypedData, useWriteContract } from "wagmi";
import { parseSignature, Address, parseUnits } from "viem";
import { CONTRACT_ADDRESS, TIPJAR_ABI, TOKEN_ABI, TOKEN_ADDRESS } from "./abi";
import { baseSepolia } from "wagmi/chains";
import { useReadContract } from "wagmi";

export default function useSendTip() {
  const { address } = useAccount();
  const { signTypedDataAsync } = useSignTypedData();
  const { writeContractAsync } = useWriteContract();

  // Fetch the token's name to use in the domain
  const { data: tokenNameData } = useReadContract({
    abi: TOKEN_ABI,
    address: TOKEN_ADDRESS,
    functionName: "name",
  });

  const tokenName =
    typeof tokenNameData === "string" ? tokenNameData : undefined;

  const { data: nonce } = useReadContract({
    abi: TOKEN_ABI,
    address: TOKEN_ADDRESS,
    functionName: "nonces",
    args: [address],
  });

  const handleTip = async (creatorAddress: Address, amount: string) => {
    try {
      if (!address || !tokenName || typeof nonce === "undefined") {
        throw new Error("Missing required data");
      }

      const deadline = Math.floor(Date.now() / 1000) + 3600;
      const value = parseUnits(amount, 6);

      const signature = await signTypedDataAsync({
        domain: {
          name: tokenName,
          chainId: baseSepolia.id,
          verifyingContract: TOKEN_ADDRESS,
        },
        types: {
          Permit: [
            { name: "owner", type: "address" },
            { name: "spender", type: "address" },
            { name: "value", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "deadline", type: "uint256" },
          ],
        },
        message: {
          owner: address,
          spender: CONTRACT_ADDRESS,
          value: value,
          nonce: BigInt(nonce as bigint),
          deadline: BigInt(deadline),
        },
        primaryType: "Permit",
      });

      // Debug log the signature components
      const { v, r, s } = parseSignature(signature);
      console.log({ v, r, s });

      const tx = await writeContractAsync({
        abi: TIPJAR_ABI.abi,
        address: CONTRACT_ADDRESS,
        functionName: "tipCreator",
        args: [creatorAddress, value, BigInt(deadline), v, r, s],
      });

      console.log("Transaction sent:", tx);
    } catch (error) {
      console.error("Error sending tip:", error);
    }
  };

  return { handleTip };
}
