import { useCallback, useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { cbWalletConnector } from "@/wagmi";
import { Button } from "../ui/button";
import { supabase } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export function ConnectAndSIWE() {
  const { connect } = useConnect();
  const { address, isConnected } = useAccount();

  const [loading, setLoading] = useState(false);

  const [exists, setExists] = useState<boolean | undefined>(undefined);
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<
    "connect" | "getStarted" | "dashboard" | null
  >(null);

  const checkAddressExists = useCallback(async () => {
    setLoading(true);

    if (!address) {
      setExists(undefined);
      setUserId(null);
      setLoading(false);

      return;
    }

    try {
      const { data, error } = await supabase
        .from("creators")
        .select("id")
        .eq("address", address)
        .single();

      if (error) {
        setExists(false);
        setUserId(null);
        setLoading(false);
      } else if (data) {
        setExists(true);
        setUserId(data.id);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error checking address existence:", err);
      setExists(false);
      setUserId(null);
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    checkAddressExists();
  }, [checkAddressExists, address]);

  const handleGetStarted = async () => {
    try {
      setLoadingAction("getStarted");
      connect({ connector: cbWalletConnector });
      window.location.href = "/create";
    } catch (err) {
      console.error("Wallet connection failed:", err);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDashboard = () => {
    setLoadingAction("dashboard");
    if (userId) {
      window.location.href = `/dashboard/${userId}`;
    }
  };

  const handleConnect = async () => {
    try {
      setLoadingAction("connect");
      connect({ connector: cbWalletConnector });
    } catch (err) {
      console.error("Wallet connection failed:", err);
    } finally {
      setLoadingAction(null);
    }
  };

  if (loading) return <Skeleton className="h-12 w-40 bg-primary/50" />;

  return (
    <div>
      {exists === true && (
        <Button
          onClick={handleDashboard}
          size="lg"
          disabled={loadingAction === "dashboard"}
          className="z-20 text-sm sm:text-lg px-3 sm:px-8 py-1.5 sm:py-6 rounded-xl border-white/20 hover:border-white/40 backdrop-blur-sm hover:bg-gray-200 cursor-pointer"
        >
          {loadingAction === "dashboard" ? "Redirecting..." : "Go to Dashboard"}
        </Button>
      )}

      {exists === false && (
        <Button
          onClick={handleGetStarted}
          size="lg"
          disabled={loadingAction === "getStarted"}
          className="z-20 text-sm sm:text-lg px-3 sm:px-8 py-1.5 sm:py-6 rounded-xl border-white/20 hover:border-white/40 backdrop-blur-sm hover:bg-gray-200 cursor-pointer"
        >
          {loadingAction === "getStarted" ? "Connecting..." : "Get Started"}
        </Button>
      )}

      {exists === undefined && !isConnected && (
        <Button
          onClick={handleConnect}
          size="lg"
          disabled={loadingAction === "connect"}
          className="z-20 text-sm sm:text-lg px-3 sm:px-8 py-1.5 sm:py-6 rounded-xl border-white/20 hover:border-white/40 backdrop-blur-sm hover:bg-gray-200 cursor-pointer"
        >
          {loadingAction === "connect" ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}
    </div>
  );
}
