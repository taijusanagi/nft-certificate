import { BoxProps, Flex, Text } from "@chakra-ui/react";

export type FooterProps = BoxProps;

export const Footer: React.VFC<FooterProps> = ({ ...props }) => {
  return (
    <Flex minH={"64px"} alignItems={"center"} justifyContent={"center"} p={{ base: 4 }} gap={"16px"} {...props}>
      <Text color="gray.600" fontSize={"xs"}>
        Certificate Your NFT Everywhere
      </Text>
    </Flex>
  );
};
