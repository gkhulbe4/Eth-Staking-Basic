import { useState } from "react";
import { toast } from "sonner";
import { useWriteContract } from "wagmi";
import stakingContractABI from "../lib/abis/StakingContractABI.json";
import ClaimReward from "./ClaimReward";
import Unstake from "./Unstake";

function Home() {
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const {
    data: hash,
    isPending,
    writeContract,
    isSuccess,
    isError,
  } = useWriteContract();

  async function handleStake() {
    const amount = parseFloat(stakeAmount);
    if (amount <= 0 || !amount) {
      toast.info("Stake amount must be greater than 0");
      return;
    }
    writeContract({
      address: import.meta.env.VITE_STAKING_CONTRACT_ADDRESS,
      abi: stakingContractABI,
      functionName: "stake",
      value: BigInt(amount * 1e18),
    });
  }

  return (
    <div className="h-screen w-screen flex flex-col gap-10 justify-start items-center p-6 bg-[#0b0a10]">
      <div className="flex gap-10 w-full">
        <div className="flex flex-col gap-4 w-full">
          <input
            className="w-full px-4 py-3 bg-[#1A1A2A] border border-[#2A2A3C] text-white placeholder-[#888] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8F43FF] transition"
            type="string"
            placeholder="Enter stake amount"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
          />
          <button
            className="w-full flex items-center justify-center gap-2 bg-[#8F43FF] hover:bg-[#A65CFF] transition-all text-white px-6 py-3 rounded-xl font-semibold shadow-[0_0_14px_rgba(143,67,255,0.4)] hover:shadow-[0_0_18px_rgba(143,67,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            onClick={handleStake}
          >
            Stake
          </button>
          {isPending && (
            <div className="text-white text-center">Transaction pending...</div>
          )}
          {isError && (
            <div className="text-white text-center mt-4">
              Transaction failed. Please try again.
            </div>
          )}
          {isSuccess && hash && (
            <div className="text-white text-center mt-4">
              Transaction hash:{" "}
              <a
                href={`https://sepolia.etherscan.io/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8F43FF] hover:text-[#A65CFF] transition-all"
              >
                {hash}
              </a>
            </div>
          )}
        </div>
        <Unstake />
      </div>
      <ClaimReward />
    </div>
  );
}

export default Home;
