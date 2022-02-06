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
import React from "react";

import { Asset } from "../../../types/asset";

export interface CollectionProps extends BoxProps {
  assets: Asset[];
}

export const Collection: React.VFC<CollectionProps> = ({ assets, ...props }) => {
  const [selectedAssetIndex, setSelectedAssetIndex] = React.useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateTwitterProfile = async () => {
    const provider = new TwitterAuthProvider();

    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    if (result.providerId === "twitter.com") {
      console.log(result);
    }
  };

  const openModal = (selectedAssetIndex: number) => {
    setSelectedAssetIndex(selectedAssetIndex);
    onOpen();
  };

  return (
    <Box mx="auto" {...props}>
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
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              src={assets[selectedAssetIndex].image}
              alt={assets[selectedAssetIndex].name}
              draggable="false"
              fallback={<Skeleton />}
            />
            <Button onClick={updateTwitterProfile}>Update Profile</Button>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
