import { ChakraProvider } from "@chakra-ui/react";

export interface AppWrapperProps {
  children: React.ReactNode;
}

export const AppWrapper: React.VFC<AppWrapperProps> = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};
