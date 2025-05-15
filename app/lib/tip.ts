import { useWriteContract } from "wagmi";
import { Address, parseUnits } from "viem";
import { CONTRACT_ADDRESS, TIPJAR_ABI, TOKEN_ABI, TOKEN_ADDRESS } from "./abi";

export default function useSendTip() {
  const { writeContractAsync: tipWriteContractAsync } = useWriteContract();
  const { writeContractAsync: allowanceWriteContractAsync } =
    useWriteContract();

  const approveAllowance = async (amount: string) => {
    const res = await allowanceWriteContractAsync({
      abi: TOKEN_ABI.abi,
      address: TOKEN_ADDRESS,
      functionName: "approve",
      args: [CONTRACT_ADDRESS, parseUnits(amount, 6)],
    });

    return res;
  };

  const handleTip = async (creatorAddress: Address, amount: string) => {
    try {
      const tx = await tipWriteContractAsync({
        abi: TIPJAR_ABI.abi,
        address: CONTRACT_ADDRESS,
        functionName: "tipCreator",
        args: [creatorAddress, parseUnits(amount, 6)],
      });

      return tx;
    } catch (error) {
      console.error("Error sending tip:", error);
    }
  };

  return { approveAllowance, handleTip };
}
