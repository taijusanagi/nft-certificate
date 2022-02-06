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

  const provider = useProvider();

  const signInByWallet = async () => {
    const credentialId = "credentialId";
    const now = "2010-01-01T19:23:24Z";
    const salt = crypto.randomBytes(32);

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

    const MULTIBASE_ENCODED_BASE58_IDENTIFIER = "z";
    const SECP256K1_MULTICODEC_IDENTIFIER = 0xe7;
    const VARIABLE_INTEGER_TRAILING_BYTE = 0x01;
    const buffer = new Uint8Array(2 + compressedPublicKeyBuffer.length);
    buffer[0] = SECP256K1_MULTICODEC_IDENTIFIER;
    buffer[1] = VARIABLE_INTEGER_TRAILING_BYTE;
    buffer.set(compressedPublicKeyBuffer, 2);
    const key = `${MULTIBASE_ENCODED_BASE58_IDENTIFIER}${bs58.encode(buffer)}`;
    const did = `did:key:${key}`;

    const EIP712Domain = [
      {
        name: "name",
        type: "string",
      },
      {
        name: "version",
        type: "string",
      },
      {
        name: "chainId",
        type: "uint256",
      },
      {
        name: "salt",
        type: "bytes32",
      },
    ];

    const types = {
      CredentialSubject: [
        {
          name: "id",
          type: "string",
        },
        {
          name: "chainId",
          type: "uint256",
        },
        {
          name: "contractAddress",
          type: "string",
        },
        {
          name: "tokenId",
          type: "string",
        },
      ],
      Proof: [
        {
          name: "verificationMethod",
          type: "string",
        },
        {
          name: "proofPurpose",
          type: "string",
        },
        {
          name: "type",
          type: "string",
        },
      ],
      VerifiableCredential: [
        {
          name: "@context",
          type: "string[]",
        },
        {
          name: "type",
          type: "string[]",
        },
        {
          name: "id",
          type: "string",
        },
        {
          name: "issuer",
          type: "string",
        },
        {
          name: "issuanceDate",
          type: "string",
        },
        {
          name: "credentialSubject",
          type: "CredentialSubject",
        },
        {
          name: "proof",
          type: "Proof",
        },
      ],
    };
    const domain = {
      name: "https://nftcert.xyz/",
      version: "1.0.0",
      chainId: 1,
      salt: salt,
    };
    const primaryType = "VerifiableCredential";
    const message = {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      type: ["VerifiableCredential"],
      id: credentialId,
      issuer: did,
      issuanceDate: now,
      credentialSubject: {
        id: did,
        chainId: 1,
        contractAddress: "0x0730Ad49738206C0f5fdfB1C1f4448Ec9D2edb07",
        tokenId: "1",
      },
      proof: {
        type: "EthereumEip712Signature2021",
        created: now,
        proofPurpose: "assertionMethod",
        verificationMethod: `${did}#${key}`,
      },
    };

    const sig = await signer._signTypedData(domain, types, message);
    const vc = {
      ...message,
      proof: {
        ...message.proof,
        proofValue: sig,
        eip712: {
          domain,
          types: {
            ...types,
            EIP712Domain: [
              {
                name: "name",
                type: "string",
              },
              {
                name: "version",
                type: "string",
              },
              {
                name: "chainId",
                type: "uint256",
              },
              {
                name: "salt",
                type: "bytes32",
              },
            ],
          },
        },
        primaryType: "VerifiableCredential",
      },
    };
    const hash = TypedDataUtils.eip712Hash(
      {
        types: { EIP712Domain, ...types },
        primaryType,
        domain,
        message,
      },
      SignTypedDataVersion.V4
    );
    const recoverPublicKey = ethers.utils.recoverPublicKey(hash, sig);
    const tempPublicKey = recoverPublicKey.slice(4);
    const x = tempPublicKey.substring(0, 64);
    const y = tempPublicKey.substring(64, 128);
    const jwk = {
      kty: "EC",
      crv: "secp256k1",
      x: base64url.encode(Buffer.from(x, "hex")),
      y: base64url.encode(Buffer.from(y, "hex")),
    };
    const { data } = await axios.get(`https://dev.uniresolver.io/1.0/identifiers/${vc.issuer}`);
    const resolved = data.verificationMethod[0].publicKeyJwk;
    console.log(JSON.stringify(jwk) === JSON.stringify(resolved));
  };

  return (
    <Button onClick={signInByWallet} color="gray.800" fontSize="sm" border="gray">
      Singin by Wallet
    </Button>
  );
};
