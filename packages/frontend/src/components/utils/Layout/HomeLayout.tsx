import { Box } from "@chakra-ui/react";

export interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout: React.VFC<HomeLayoutProps> = ({ children }) => {
  return <Box>{children}</Box>;
};
