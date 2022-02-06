import { Box, Flex, Image, Text } from "@chakra-ui/react";

export interface CertProps {
  nftImage: string;
  issuerAddress: string;
}

export const Cert: React.VFC<CertProps> = ({ nftImage, issuerAddress }) => {
  return (
    <Flex
      direction="column"
      bgGradient="linear(to-br, #1C202A 0%, blue.600 120%)"
      rounded="2xl"
      width="600px"
      height="314px"
      p="4"
      justifyContent="space-between"
      position="relative"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="md" fontWeight="medium" color="white">
          Verifiable NFT Credential
        </Text>
        <Text fontSize="sm" color="white">
          Holder Certificate
        </Text>
      </Flex>
      <Box rounded="2xl" mt="40px" ml="10px" w="240px" h="240px" position="absolute" className="frame">
        <Image mx="auto" maxH="180px" src={nftImage} alt="nftImage" />
      </Box>
      <Flex justifyContent="end" alignItems="center">
        <Text fontSize="xs" color="white">
          Issued By: <br />
          {issuerAddress}
        </Text>
      </Flex>
    </Flex>
  );
};
