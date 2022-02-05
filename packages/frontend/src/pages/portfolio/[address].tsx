import { ethers } from "ethers";
import type { GetServerSideProps, NextPage } from "next";

import { PortfolioTemplate, PortfolioTemplateProps } from "../../components/templates/Portfolio";
import { mockAccount, mockAssets } from "../../data/mock";

const PortfolioPage: NextPage<PortfolioTemplateProps> = ({ accountProps, collectionProps }) => {
  return <PortfolioTemplate accountProps={accountProps} collectionProps={collectionProps} />;
};

export default PortfolioPage;

export const getServerSideProps: GetServerSideProps<PortfolioTemplateProps> = async ({ params }) => {
  const { address } = params as { address: string };
  if (ethers.utils.isAddress(address)) {
    mockAccount.address = address;
    const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URI);
    const ens = await provider.lookupAddress(address);
    if (ens) {
      mockAccount.ens = ens;
    }
  }
  return {
    props: {
      accountProps: mockAccount,
      collectionProps: {
        assets: mockAssets,
      },
    },
  };
};
