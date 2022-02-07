import dynamic from "next/dynamic";
import React from "react";

import { Account, AccountProps } from "../../organisms/Account";
import { CollectionProps } from "../../organisms/Collection";
import { DefaultLayout } from "../../utils/Layout";

const Collection = dynamic<CollectionProps>(() => import("../../organisms/Collection").then((mod) => mod.Collection), {
  ssr: false,
});

export interface CollectionsTemplateProps {
  accountProps: AccountProps;
  collectionProps: CollectionProps;
}

export const CollectionsTemplate: React.VFC<CollectionsTemplateProps> = ({ accountProps, collectionProps }) => {
  return (
    <DefaultLayout>
      <Account mb={{ base: "8px", md: "24px" }} {...accountProps} />
      <Collection {...collectionProps} />
    </DefaultLayout>
  );
};
