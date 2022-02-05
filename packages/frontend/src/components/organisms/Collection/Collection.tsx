import { AspectRatio, Box, BoxProps, Image, SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";

import { Asset } from "../../../types/asset";

export interface CollectionProps extends BoxProps {
  assets: Asset[];
}

export const Collection: React.VFC<CollectionProps> = ({ assets, ...props }) => {
  return (
    <Box mx="auto" {...props}>
      <SimpleGrid columns={{ base: 3, lg: 4 }} gap="4">
        {assets.map((asset, i) => (
          <Stack key={i} spacing="4">
            <Box position="relative" className="group">
              <AspectRatio ratio={1}>
                <Image src={asset.image} alt={asset.name} draggable="false" fallback={<Skeleton />} />
              </AspectRatio>
            </Box>
          </Stack>
        ))}
      </SimpleGrid>
    </Box>
  );
};
