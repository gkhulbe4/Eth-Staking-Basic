import { useAccount, useBalance } from "wagmi";

function MyAccount() {
  const { address, connector } = useAccount();
  const { data: balance, isLoading } = useBalance({
    address,
    watch: true,
  });

  return (
    <div className="flex flex-col gap-4 p-4 text-white">
      <div>
        <h2 className="text-sm text-[#B0B0C3]">Wallet Address</h2>
        <p className="text-md font-mono bg-[#1A1A2A] p-2 rounded-md break-all border border-[#2A2A3C]">
          {address || "Not connected"}
        </p>
      </div>

      {connector && (
        <div>
          <h2 className="text-sm text-[#B0B0C3] mb-1">Connected via</h2>
          <div className="flex items-center gap-3 p-2 bg-[#1A1A2A] border border-[#2A2A3C] rounded-md">
            {connector.icon && (
              <img
                src={connector.icon}
                alt={`${connector.name} icon`}
                className="w-8 h-8 object-contain"
              />
            )}
            <span className="font-semibold tracking-wide">
              {connector.name}
            </span>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-sm text-[#B0B0C3]">Balance</h2>
        <p className="text-lg font-semibold tracking-wide mt-1 text-[#00E395]">
          {isLoading
            ? "Loading..."
            : balance?.formatted
            ? `${Number(balance.formatted).toFixed(6)} ${balance.symbol}`
            : "0 ETH"}
        </p>
      </div>
    </div>
  );
}

export default MyAccount;
