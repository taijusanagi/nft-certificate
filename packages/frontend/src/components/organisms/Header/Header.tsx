import { Box, BoxProps, Flex, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";

import { SignInByWalletProps } from "../../molecules/SignInByWallet";

const SignInByWallet = dynamic<SignInByWalletProps>(
  () => import("../../molecules/SignInByWallet").then((mod) => mod.SignInByWallet),
  { ssr: false }
);

export type HeaderProps = BoxProps;

export const Header: React.VFC<BoxProps> = ({ ...props }) => {
  return (
    <Box {...props}>
      <Flex minH="64px" alignItems="center" justifyContent="space-between" p="8">
        <Text color="gray.800" fontWeight="bold">
          NFTCert
        </Text>
        <SignInByWallet />
      </Flex>
    </Box>
  );
};
