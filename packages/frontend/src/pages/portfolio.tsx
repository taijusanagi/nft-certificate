import type { NextPage } from "next";

import { PortfolioTemplate } from "../components/templates/Portfolio";
import { mockAccount, mockAssets } from "../data/mock";

const PortfolioPage: NextPage = () => {
  return <PortfolioTemplate accountProps={mockAccount} collectionProps={{ assets: mockAssets }} />;
};

export default PortfolioPage;
