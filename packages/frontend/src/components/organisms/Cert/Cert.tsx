import { Box, Flex, Image, Text } from "@chakra-ui/react";

export interface CertProps {
  textColor: string;
  title: string;
  issuedBy: string;
  image: string;
}

export const Cert: React.VFC<CertProps> = ({ textColor, image, title, issuedBy }) => {
  return (
    <Box bgGradient="linear(to-br, #1C202A 0%, #7928CA 120%)" rounded="2xl" width="600px" height="314px">
      <Flex p="6" mb="16" justifyContent="space-between" alignItems="center">
        <Image h="12" w="12" src={image} alt="nft" />
        <Text fontSize="xl" color={textColor}>
          {title}
        </Text>
      </Flex>
      <Flex p="6" justifyContent="space-between" alignItems="center">
        <Text fontSize="lg" color={textColor}>
          {issuedBy}
        </Text>
      </Flex>
    </Box>
  );
};
