import AllWallets from "./AllWallets";
import MyAccount from "./MyAccount";

function Profile() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] px-4 py-8 text-white md:px-12 lg:px-20">
      <h1 className="text-3xl md:text-4xl font-semibold mb-10 tracking-wide text-center md:text-left">
        👤 Your Profile
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Wallet Card */}
        <div className="bg-[#12121A] border border-[#2A2A3C] rounded-2xl p-6 shadow-[0_0_12px_rgba(143,67,255,0.3)] hover:shadow-[0_0_20px_rgba(143,67,255,0.5)] transition-shadow duration-300">
          <h2 className="text-xl font-medium text-[#8F43FF] mb-4 tracking-wide">
            Injected Wallets
          </h2>
          <AllWallets />
        </div>

        {/* Account Card */}
        <div className="bg-[#12121A] border border-[#2A2A3C] rounded-2xl p-6 shadow-[0_0_12px_rgba(20,200,255,0.3)] hover:shadow-[0_0_20px_rgba(20,200,255,0.5)] transition-shadow duration-300">
          <h2 className="text-xl font-medium text-[#14C8FF] mb-4 tracking-wide">
            Account Info
          </h2>
          <MyAccount />
        </div>
      </div>
      {/* <CreatorTokens /> */}
    </div>
  );
}

export default Profile;
