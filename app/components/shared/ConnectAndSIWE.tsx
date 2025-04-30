import { useCallback, useEffect, useState } from "react";
import type { Hex } from "viem";
import { useAccount, useConnect, usePublicClient, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { cbWalletConnector } from "@/wagmi";
import { Button } from "../ui/button";

export function ConnectAndSIWE() {
  const { connect } = useConnect({
    mutation: {
      onSuccess: (data) => {
        const address = data.accounts[0];
        const chainId = data.chainId;
        const m = new SiweMessage({
          domain: document.location.host,
          address,
          chainId,
          uri: document.location.origin,
          version: "1",
          statement: "Smart Wallet SIWE Example",
          nonce: "12345678",
        });
        setMessage(m);
        signMessage({ message: m.prepareMessage() });
      },
    },
  });
  const account = useAccount();
  const client = usePublicClient();
  const [signature, setSignature] = useState<Hex | undefined>(undefined);
  const { signMessage } = useSignMessage({
    mutation: { onSuccess: (sig) => setSignature(sig) },
  });
  const [message, setMessage] = useState<SiweMessage | undefined>(undefined);

  const [valid, setValid] = useState<boolean | undefined>(undefined);

  const checkValid = useCallback(async () => {
    if (!signature || !account.address || !client || !message) return;

    client
      .verifyMessage({
        address: account.address,
        message: message.prepareMessage(),
        signature,
      })
      .then((v) => setValid(v));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, account]);

  useEffect(() => {
    checkValid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, account]);

  useEffect(() => {
    if (
      (valid != undefined && valid.toString() === "true") ||
      account.isConnected
    ) {
      window.location.href = "/create";
    }
  }, [account.isConnected, valid]);

  return (
    <div>
      <Button
        onClick={() => connect({ connector: cbWalletConnector })}
        size="lg"
        className="group relative cursor-pointer overflow-hidden rounded-xl px-8 text-lg font-semibold  transition-all hover:scale-105 hover:shadow-xl hover:brightness-110  bg-gradient-to-r from-secondary to-secondary py-6"
      >
        Get Started
      </Button>
      {valid != undefined && <p> Is valid: {valid.toString()} </p>}
    </div>
  );
}
