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
import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import html2canvas from "html2canvas";
import React from "react";

// import ReactDOM from "react-dom";
import { Asset } from "../../../types/asset";
import { Cert } from "../Cert";

export interface CollectionProps extends BoxProps {
  assets: Asset[];
}

export const Collection: React.VFC<CollectionProps> = ({ assets, ...props }) => {
  const canvasRef = React.createRef();

  const [selectedAssetIndex, setSelectedAssetIndex] = React.useState(0);

  // const { isOpen, onOpen, onClose } = useDisclosure();

  const issue = async () => {
    const test = await html2canvas(document.getElementById("certification"), {
      allowTaint: false,
      useCORS: true,
      backgroundColor: "rgba(0,0,0,0)",
      width: "600",
      height: "312",
    });
    console.log(test.toDataURL());
  };

  const openModal = (selectedAssetIndex: number) => {
    setSelectedAssetIndex(selectedAssetIndex);
    // onOpen();
  };

  return (
    <Box mx="auto" {...props}>
      {/* <Cert image={assets[0].image} issuer={"0x0730Ad49738206C0f5fdfB1C1f4448Ec9D2edb07"} /> */}
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
