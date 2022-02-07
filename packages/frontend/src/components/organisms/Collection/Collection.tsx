import {
  AspectRatio,
  Box,
  BoxProps,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Skeleton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { SignTypedDataVersion, TypedDataUtils } from "@metamask/eth-sig-util";
import axios from "axios";
import bsx from "base-x";
import crypto from "crypto";
import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
// import * as fs from "fs";
import html2canvas from "html2canvas";
import stream, { PassThrough } from "stream";
const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const bs58 = bsx(ALPHABET);

import base64url from "base64url";
import { ethers } from "ethers";
// import { getFunctions, httpsCallable } from "firebase/functions";
import React from "react";

import { hooks, metaMask } from "../../../lib/web3-react";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pngItxt = require("png-itxt");

// import ReactDOM from "react-dom";
import { Asset } from "../../../types/asset";
import { Cert } from "../Cert";

export interface CollectionProps extends BoxProps {
  assets: Asset[];
}

export const Collection: React.VFC<CollectionProps> = ({ assets, ...props }) => {
  const { useProvider } = hooks;
  const canvasRef = React.createRef();

  const [selectedAssetIndex, setSelectedAssetIndex] = React.useState(0);

  // const { isOpen, onOpen, onClose } = useDisclosure();
  const provider = useProvider();
  const issue = async () => {
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

    const canvas = await html2canvas(document.getElementById("certification"), {
      allowTaint: false,
      useCORS: true,
      backgroundColor: "rgba(0,0,0,0)",
      width: "600",
      height: "312",
    });
    const canvasDataURL = canvas.toDataURL();
    const [prefix, file] = canvasDataURL.split(",");
    const fileBuffer = Buffer.from(file, "base64");
    const data = await new Promise(function (resolve) {
      const readable = new stream.Readable();
      const pipe = readable.pipe(pngItxt.set({ keyword: "openbadges", value: JSON.stringify(vc) }, true));
      const bufs: Buffer[] = [];
      pipe.on("data", (chunk) => {
        bufs.push(chunk);
      });
      pipe.on("end", () => {
        resolve(Buffer.concat(bufs).toString("base64"));
      });
      readable.push(fileBuffer);
      readable.push(null);
    });
    console.log(`${prefix},${data}`);
  };

  const openModal = (selectedAssetIndex: number) => {
    setSelectedAssetIndex(selectedAssetIndex);
    issue();
    // onOpen();
  };

  return (
    <Box mx="auto" {...props}>
      <Box position="absolute" opacity="0" left="-600">
        <Cert image={assets[selectedAssetIndex].image} issuer={"0x0730Ad49738206C0f5fdfB1C1f4448Ec9D2edb07"} />
      </Box>
      {/* <Button onClick={issue}>Issue</Button> */}
      <SimpleGrid columns={{ base: 3, lg: 4 }} gap="4">
        {assets.map((asset, i) => (
          <Stack key={i} spacing="4">
            <Box position="relative" className="group">
              <AspectRatio ratio={1}>
                <Image
                  src={asset.image}
                  alt={asset.name}
                  onClick={() => openModal(i)}
                  draggable="false"
                  fallback={<Skeleton />}
                />
              </AspectRatio>
            </Box>
          </Stack>
        ))}
      </SimpleGrid>
      {/* <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        scrollBehavior="inside"
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button onClick={issue}>Issue</Button>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal> */}
    </Box>
  );
};
