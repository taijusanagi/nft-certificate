import { Box, BoxProps, Button, Flex, Text } from "@chakra-ui/react";
import { getAuth, linkWithPopup, TwitterAuthProvider } from "firebase/auth";
import dynamic from "next/dynamic";
import React from "react";

const provider = new TwitterAuthProvider();
import { SignInByWalletProps } from "../../molecules/SignInByWallet";

const SignInByWallet = dynamic<SignInByWalletProps>(
  () => import("../../molecules/SignInByWallet").then((mod) => mod.SignInByWallet),
  { ssr: false }
);

export type HeaderProps = BoxProps;

export const Header: React.VFC<BoxProps> = ({ ...props }) => {
  const connectTwitter = async () => {
    const auth = getAuth();
    if (!auth.currentUser) {
      return;
    }
    const result = await linkWithPopup(auth.currentUser, provider);
    console.log(result);
  };

  return (
    <Box {...props}>
      <Flex minH="64px" alignItems="center" justifyContent="space-between" p="8">
        <Text color="gray.800" fontWeight="bold">
          NFTCert
        </Text>
        <Flex gap="8px">
          <Button onClick={connectTwitter}>Connect Twitter</Button>
          <SignInByWallet />
        </Flex>
      </Flex>
    </Box>
  );
};
