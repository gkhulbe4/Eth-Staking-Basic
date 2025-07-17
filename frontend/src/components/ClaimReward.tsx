import { useWriteContract } from "wagmi";
import stakingContractABI from "../lib/abis/StakingContractABI.json";

function ClaimReward() {
  const {
    data: hash,
    isPending,
    writeContract,
    isSuccess,
    isError,
    error,
  } = useWriteContract();

  async function handleClaimReward() {
    writeContract({
      address: import.meta.env.VITE_STAKING_CONTRACT_ADDRESS,
      abi: stakingContractABI,
      functionName: "claimReward",
    });
  }
  return (
    <div className="w-full">
      <button
        className="w-full flex items-center justify-center gap-2 bg-[#8F43FF] hover:bg-[#A65CFF] transition-all text-white px-6 py-3 rounded-xl font-semibold shadow-[0_0_14px_rgba(143,67,255,0.4)] hover:shadow-[0_0_18px_rgba(143,67,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        onClick={handleClaimReward}
      >
        Claim Reward
      </button>
      {isPending && (
        <div className="text-white text-center">Transaction pending...</div>
      )}
      {isError && (
        <div className="text-white text-center mt-4">
          Transaction failed. Please try again.
          <p className="text-red-400 mt-2">{error?.message}</p>
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
  );
}

export default ClaimReward;
