import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import Header from "./components/Header";
import Home from "./components/Home";
import Profile from "./components/Profile";
import { wagmiConfig } from "./lib/wagmiConfig";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <Toaster richColors position="top-center" />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </QueryClientProvider>
      </WagmiProvider>
    </Router>
  );
}

export default App;
