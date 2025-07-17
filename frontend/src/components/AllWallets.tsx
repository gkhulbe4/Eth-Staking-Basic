import { useConnect } from "wagmi";

function AllWallets() {
  const { connect, connectors, isPending } = useConnect();

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 items-center justify-center">
        {connectors
          .filter((connector) => connector.name !== "Injected")
          .map((connector) => (
            <button
              key={connector.id}
              onClick={() => connect({ connector })}
              className="flex gap-3 items-center justify-center w-full cursor-pointer px-4 py-2 bg-[#1A1A2A] text-white rounded-lg border border-[#2A2A3C] hover:border-[#8F43FF] hover:shadow-[0_0_8px_rgba(143,67,255,0.4)] transition-all duration-200 font-medium tracking-wide"
            >
              {connector.icon && (
                <img
                  src={connector.icon}
                  alt={`${connector.name} icon`}
                  className="w-6 h-6 rounded-md"
                />
              )}
              {connector.name}
            </button>
          ))}
      </div>
      <div className="flex justify-center">
        {isPending && <span className="text-white">Connecting...</span>}
      </div>
    </div>
  );
}

export default AllWallets;
