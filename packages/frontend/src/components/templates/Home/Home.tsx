import React from "react";

import { Hero } from "../../organisms/Hero";
import { HomeLayout } from "../../utils/Layout";

export const HomeTemplate: React.VFC = () => {
  return (
    <HomeLayout>
      <Hero />
    </HomeLayout>
  );
};
