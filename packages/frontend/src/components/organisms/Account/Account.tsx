import { Avatar, Box, BoxProps, Flex, Heading, Text } from "@chakra-ui/react";

export interface AccountProps extends BoxProps {
  image: string;
  address: string;
  ens: string;
}

export const Account: React.VFC<AccountProps> = ({ image, address, ens, ...props }) => {
  return (
    <Box as="section" pt="" pb="" position="relative" {...props}>
      <Flex
        position="relative"
        direction="column"
        align="center"
        maxW="2xl"
        mx="auto"
        bg="white"
        shadow={{ sm: "base" }}
        rounded={{ sm: "lg" }}
        px={{ base: "6", md: "8" }}
        pb={{ base: "6", md: "8" }}
      >
        <Avatar mt="-10" size="xl" src={image} />
        <Box textAlign="center" pt="2" space="1">
          <Heading color="gray.800" fontSize={{ base: "lg", md: "2xl" }}>
            {ens}
          </Heading>
          <Text color="gray.600" fontSize={{ base: "xs", md: "md" }}>
            {address}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
