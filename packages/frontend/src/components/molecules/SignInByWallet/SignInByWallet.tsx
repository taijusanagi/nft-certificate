import { Button } from "@chakra-ui/react";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useRouter } from "next/router";
import React from "react";

import { hooks, metaMask } from "../../../lib/web3-react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SignInByWalletProps {}

export const SignInByWallet: React.VFC<SignInByWalletProps> = () => {
  const router = useRouter();

  const { useProvider } = hooks;
  const provider = useProvider();
  const signInByWallet = async () => {
    metaMask.activate();
    if (!provider) {
      return;
    }
    const signer = provider.getSigner();
    const signature = await signer.signMessage("message");
    const functions = getFunctions();
    const signInByWallet = httpsCallable(functions, "signInByWallet");
    const { data } = (await signInByWallet({ signature })) as any;
    const auth = getAuth();
    const result = await signInWithCustomToken(auth, data.customToken);

    if (router.pathname === "/collections") {
      window.location.href = `/collections/${result.user.uid}`;
    } else if (router.pathname === "/collections/[address]") {
      if (router.query.address !== result.user.uid) {
        window.location.href = `/collections/${result.user.uid}`;
      }
    }
  };

  return (
    <Button onClick={signInByWallet} color="gray.800" fontSize="sm" border="gray">
      Singin by Wallet
    </Button>
  );
};
