import { Box, Flex, Image, Text } from "@chakra-ui/react";

export interface CertProps {
  image: string;
  issuer: string;
}

export const Cert: React.VFC<CertProps> = ({ image, issuer }) => {
  return (
    <Flex
      id="certification"
      direction="column"
      bgGradient="linear(to-br, #1C202A 0%, blue.500 100%)"
      rounded="xl"
      width="600px"
      height="314px"
      pb="4"
      px="4"
      justifyContent="space-between"
      position="relative"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="md" fontWeight="medium" color="white">
          Verifiable Credential
        </Text>
        <Text fontSize="sm" color="white">
          NFT Holder
        </Text>
      </Flex>
      <Box rounded="lg" mt="50px" ml="10px" w="240px" h="240px" position="absolute" className="frame">
        <Image mx="auto" maxH="180px" src={image} alt="nftImage" />
      </Box>
      <Flex justifyContent="end" alignItems="center">
        <Text fontSize="xs" color="white">
          Issued By: <br />
          {issuer}
        </Text>
      </Flex>
    </Flex>
  );
};
