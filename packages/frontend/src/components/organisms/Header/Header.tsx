import { Box, BoxProps, Flex, Text } from "@chakra-ui/react";

export type HeaderProps = BoxProps;

export const Header: React.VFC<BoxProps> = ({ ...props }) => {
  return (
    <Box {...props}>
      <Flex minH={"64px"} alignItems={"center"} justifyContent={"space-between"} p={{ base: 4 }}>
        <Text color="gray.800" fontWeight={"bold"}>
          NFTCert
        </Text>
      </Flex>
    </Box>
  );
};
