import type { NextPage } from "next";
import React from "react";

import { CollectionsTemplate, CollectionsTemplateProps } from "../../components/templates/Collections";

const CollectionsIndexPage: NextPage<CollectionsTemplateProps> = ({ accountProps, collectionProps }) => {
  return <CollectionsTemplate accountProps={accountProps} collectionProps={collectionProps} />;
};

export default CollectionsIndexPage;
