import { useAccount, useReadContract } from "wagmi";
import stakingContractABI from "../lib/abis/StakingContractABI.json";

function Reward() {
  const { address } = useAccount();
  const {
    data: reward,
    isPending,
    error,
  } = useReadContract({
    address: import.meta.env.VITE_STAKING_CONTRACT_ADDRESS as `0x${string}`,
    abi: stakingContractABI,
    functionName: "getRewards",
    args: [address],
    query: {
      enabled: !!address,
      refetchInterval: 3000,
      //   refetchIntervalInBackground: true,
    },
  });

  return (
    <div>
      {isPending && <span className="text-white">Loading...</span>}
      {error && <span className="text-red-400">Error: {error.message}</span>}
      {!isPending && (
        <div>
          <h2 className="text-sm text-[#B0B0C3] text-center">Reward Amount</h2>
          <p className="text-md text-white font-mono bg-[#1A1A2A] p-2 rounded-md break-all border border-[#2A2A3C]">
            {reward !== undefined && reward !== null
              ? (Number(reward) / 1e18).toFixed(8)
              : "Not connected"}
          </p>
        </div>
      )}
    </div>
  );
}

export default Reward;
