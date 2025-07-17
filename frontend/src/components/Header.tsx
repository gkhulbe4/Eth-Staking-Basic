import { Link, useNavigate } from "react-router-dom";
import StakedAmount from "./StakedAmount";
import Reward from "./Reward";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-[#0A0A0F] border-b border-[#1F1F2E] px-4 py-4 md:px-10 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3">
        <img
          src="https://ethereum.org/_next/static/media/eth-diamond-rainbow.bb509e8a.png"
          alt="Ethereum Logo"
          className="h-8 w-auto object-contain"
        />
        <span className="text-white text-lg font-semibold tracking-tight hidden sm:inline">
          EthSmith
        </span>
      </Link>

      <div className="flex gap-3">
        <StakedAmount />
        <Reward />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/profile")}
          className="bg-[#1F1F2E] border border-[#2A2A3C] cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2A2A3C] transition"
        >
          Profile
        </button>
      </div>
    </header>
  );
}

export default Header;
