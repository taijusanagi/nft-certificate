import { ethers } from "ethers";
import type { GetServerSideProps, NextPage } from "next";
import { Network, OpenSeaPort } from "opensea-js";
import React from "react";

import { PortfolioTemplate, PortfolioTemplateProps } from "../../components/templates/Portfolio";
import { mockAccount, mockAssets } from "../../data/mock";

const PortfolioPage: NextPage<PortfolioTemplateProps> = ({ accountProps, collectionProps }) => {
  return <PortfolioTemplate accountProps={accountProps} collectionProps={collectionProps} />;
};

export default PortfolioPage;

export const getServerSideProps: GetServerSideProps<PortfolioTemplateProps> = async ({ params }) => {
  const { address } = params as { address: string };
  let assets = mockAssets;
  if (ethers.utils.isAddress(address)) {
    mockAccount.address = address;
    const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URI);
    const seaport = new OpenSeaPort(provider, {
      networkName: Network.Main,
      apiKey: process.env.OPENSEA_API_KEY,
    });
    const response = await seaport.api.getAssets({
      owner: address,
    });
    assets = response.assets.map((asset) => {
      return {
        tokenId: asset.tokenId as string,
        name: asset.name,
        description: asset.description,
        image: asset.imageUrl,
      };
    });
    const ens = await provider.lookupAddress(address);
    if (ens) {
      mockAccount.ens = ens;
    }
  }
  return {
    props: {
      accountProps: mockAccount,
      collectionProps: {
        assets,
      },
    },
  };
};
