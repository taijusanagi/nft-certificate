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
import crypto from "crypto";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import html2canvas from "html2canvas";
// const IPFS = require("ipfs-mini");
// const ipfs = new IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" });
import createClient from "ipfs-http-client";
const ipfs = createClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});
// import { getFunctions, httpsCallable } from "firebase/functions";
import React from "react";
import stream from "stream";

import { hooks, metaMask } from "../../../lib/web3-react";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pngItxt = require("png-itxt");

import { Asset } from "../../../types/asset";
import { User } from "../../../types/user";
import { Cert } from "../Cert";

export interface CollectionProps extends BoxProps {
  assets: Asset[];
}

export const Collection: React.VFC<CollectionProps> = ({ assets, ...props }) => {
  const { useProvider } = hooks;
  const provider = useProvider();

  const [generatedCetificationImage, setGeneratedCetificationImage] = React.useState("");
  const [selectedAssetIndex, setSelectedAssetIndex] = React.useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const issue = async () => {
    const credentialId = "credentialId";
    const now = "2010-01-01T19:23:24Z";
    const salt = crypto.randomBytes(32);
    metaMask.activate();
    if (!provider) {
      return;
    }
    const auth = getAuth();
    if (!auth.currentUser) {
      return;
    }
    const userid = auth.currentUser.uid;
    const firestore = getFirestore();
    const user = await getDoc(doc(firestore, "users", userid));
    const { did } = user.data() as User;
    const signer = provider.getSigner();
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
        verificationMethod: did,
      },
    };
    const sigature = await signer._signTypedData(domain, types, message);
    const vc = {
      ...message,
      proof: {
        ...message.proof,
        proofValue: sigature,
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
        primaryType,
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
    const [prefix, pngBase64] = canvasDataURL.split(",");
    const pngBase64Buffer = Buffer.from(pngBase64, "base64");
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
      readable.push(pngBase64Buffer);
      readable.push(null);
    });
    const certDataURL = `${prefix},${data}`;
    setGeneratedCetificationImage(certDataURL);
    const file = dataURLtoFile(certDataURL, "cert.png");
    const result = await ipfs.add(file);
    console.log(result);
  };

  const openModal = (selectedAssetIndex: number) => {
    setSelectedAssetIndex(selectedAssetIndex);
    onOpen();
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <Box mx="auto" {...props}>
      <Box position="absolute" opacity="0" left="-600">
        <Cert image={assets[selectedAssetIndex].image} issuer={"0x0730Ad49738206C0f5fdfB1C1f4448Ec9D2edb07"} />
      </Box>
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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        scrollBehavior="inside"
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Issue Verifiable Credential</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {generatedCetificationImage && <Image src={generatedCetificationImage} alt="generatedCetificationImage" />}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={issue}>
              Issue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
