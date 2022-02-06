import React from "react";

import { Account, AccountProps } from "../../organisms/Account";
import { Collection, CollectionProps } from "../../organisms/Collection";
import { DefaultLayout } from "../../utils/Layout";

export interface PortfolioTemplateProps {
  accountProps: AccountProps;
  collectionProps: CollectionProps;
}

export const PortfolioTemplate: React.VFC<PortfolioTemplateProps> = ({ accountProps, collectionProps }) => {
  return (
    <DefaultLayout>
      <Account mb={{ base: "8px", md: "24px" }} {...accountProps} />
      <Collection {...collectionProps} />
    </DefaultLayout>
  );
};
