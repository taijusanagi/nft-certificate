import { Button } from "@chakra-ui/react";
import { SignTypedDataVersion, TypedDataUtils } from "@metamask/eth-sig-util";
import axios from "axios";
import bsx from "base-x";
import crypto from "crypto";
const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const bs58 = bsx(ALPHABET);

import base64url from "base64url";
import { ethers } from "ethers";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import React from "react";

import { hooks, metaMask } from "../../../lib/web3-react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SignInByWalletProps {}

export const SignInByWallet: React.VFC<SignInByWalletProps> = () => {
  const { useProvider } = hooks;

  const signInByWallet = async () => {
    console.log("signInByWallet");
  };

  return (
    <Button onClick={signInByWallet} color="gray.800" fontSize="sm" border="gray">
      Singin by Wallet
    </Button>
  );
};
