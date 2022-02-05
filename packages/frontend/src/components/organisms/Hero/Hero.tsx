import { Box, BoxProps, Button, Circle, Heading, Img, LightMode, Stack, Text, VisuallyHidden } from "@chakra-ui/react";
import NextLink from "next/link";
export type HeroProps = BoxProps;

export const Hero: React.VFC<HeroProps> = ({ ...props }) => {
  return (
    <Box {...props}>
      <Box as="section" bg="gray.800" color="white" py="7.5rem">
        <Box maxW={{ base: "xl", md: "5xl" }} mx="auto" px={{ base: "6", md: "8" }}>
          <Box textAlign="center">
            <Heading
              as="h1"
              size="3xl"
              fontWeight="extrabold"
              maxW="48rem"
              mx="auto"
              lineHeight="1.2"
              letterSpacing="tight"
            >
              Certificate Your NFT Everywhere
            </Heading>
            <Text fontSize="xl" mt="4" maxW="xl" mx="auto">
              Bring your NFT as verifiable credentials
            </Text>
          </Box>

          <Stack justify="center" direction={{ base: "column", md: "row" }} mt="10" mb="20">
            <LightMode>
              <NextLink href="/portfolio">
                <Button as="a" size="lg" colorScheme="blue" px="8" fontWeight="bold" fontSize="md">
                  Get Started
                </Button>
              </NextLink>
            </LightMode>
          </Stack>

          <Box className="group" cursor="pointer" position="relative" rounded="lg" overflow="hidden">
            <Img
              alt="Screenshot of Envelope App"
              src="https://res.cloudinary.com/chakra-ui-pro/image/upload/v1621085270/pro-website/app-screenshot-light_kit2sp.png"
            />
            <Circle
              size="20"
              as="button"
              bg="white"
              shadow="lg"
              color="blue.600"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate3d(-50%, -50%, 0)"
              fontSize="xl"
              transition="all 0.2s"
              _groupHover={{
                transform: "translate3d(-50%, -50%, 0) scale(1.05)",
              }}
            >
              <VisuallyHidden>Play demo video</VisuallyHidden>
            </Circle>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};