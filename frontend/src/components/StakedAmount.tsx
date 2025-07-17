import { useAccount, useReadContract } from "wagmi";
import stakingContractABI from "../lib/abis/StakingContractABI.json";

function StakedAmount() {
  const { address } = useAccount();
  const {
    data: balance,
    isPending,
    error,
  } = useReadContract({
    address: import.meta.env.VITE_STAKING_CONTRACT_ADDRESS as `0x${string}`,
    abi: stakingContractABI,
    functionName: "balanceOf",
    args: [address],
  });

  return (
    <div>
      {isPending && <span className="text-white">Loading...</span>}
      {error && <span className="text-red-400">Error: {error.message}</span>}
      {!isPending && (
        <div>
          <h2 className="text-sm text-[#B0B0C3] text-center">Staked Amount</h2>
          <p className="text-md text-white font-mono bg-[#1A1A2A] p-2 rounded-md break-all border border-[#2A2A3C]">
            {balance !== undefined && balance !== null
              ? (Number(balance) / 1e18).toFixed(8)
              : "Not connected"}
          </p>
        </div>
      )}
    </div>
  );
}

export default StakedAmount;
