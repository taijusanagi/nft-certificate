import { Button } from "@chakra-ui/react";
import * as secp256k1 from "@transmute/did-key-secp256k1";
import bsx from "base-x";
import secp256k1_m from "secp256k1";
const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const bs58 = bsx(ALPHABET);
// import * as secp256k1 from "@transmute/secp256k1-key-pair";
// import { getPublicKeyFromPublicKeyJwk } from "@transmute/secp256k1-key-pair/dist/getPublicKeyFromPublicKeyJwk";
import base64url from "base64url";
import crypto from "crypto";
import { ethers } from "ethers";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import React from "react";

import { hooks, metaMask } from "../../../lib/web3-react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SignInByWalletProps {}

export const SignInByWallet: React.VFC<SignInByWalletProps> = () => {
  const { useProvider } = hooks;

  const provider = useProvider();

  const signInByWallet = async () => {
    metaMask.activate();
    if (!provider) {
      return;
    }
    const signer = provider.getSigner();
    const signature = await signer.signMessage("message");
    const messageHash = ethers.utils.hashMessage("message");
    const messageHashBytes = ethers.utils.arrayify(messageHash);
    const publicKey = ethers.utils.recoverPublicKey(messageHashBytes, signature);
    const compressedPublicKey = ethers.utils.computePublicKey(publicKey, true);
    const compressedPublicKeyBuffer = Buffer.from(compressedPublicKey.slice(2), "hex");
    const tempPublicKey = publicKey.slice(4);
    const x = tempPublicKey.substring(0, 64);
    const y = tempPublicKey.substring(64, 128);
    const jwk = {
      kty: "EC",
      crv: "secp256k1",
      x: base64url.encode(Buffer.from(x, "hex")),
      y: base64url.encode(Buffer.from(y, "hex")),
    };
    const MULTIBASE_ENCODED_BASE58_IDENTIFIER = "z";
    const SECP256K1_MULTICODEC_IDENTIFIER = 0xe7;
    const VARIABLE_INTEGER_TRAILING_BYTE = 0x01;
    const buffer = new Uint8Array(2 + compressedPublicKeyBuffer.length);
    buffer[0] = SECP256K1_MULTICODEC_IDENTIFIER;
    buffer[1] = VARIABLE_INTEGER_TRAILING_BYTE;
    buffer.set(compressedPublicKeyBuffer, 2);
    console.log(`did:key:${MULTIBASE_ENCODED_BASE58_IDENTIFIER}${bs58.encode(buffer)}`);
    console.log(jwk);
  };

  return (
    <Button onClick={signInByWallet} color="gray.800" fontSize="sm" border="gray">
      Singin by Wallet
    </Button>
  );
};
