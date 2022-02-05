import { Container, Flex } from "@chakra-ui/react";

import { Footer } from "../../organisms/Footer";
import { Header } from "../../organisms/Header";

export interface DefaultLayoutProps {
  children: React.ReactNode;
}

export const DefaultLayout: React.VFC<DefaultLayoutProps> = ({ children }) => {
  return (
    <Flex minHeight={"100vh"} direction={"column"}>
      <Header mb="48px" />
      <Container flex={1}>{children}</Container>
      <Footer />
    </Flex>
  );
};
