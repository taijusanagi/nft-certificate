import { ComponentMeta, ComponentStory } from "@storybook/react";

import { mockAccount, mockAssets } from "../../../data/mock";
import { PortfolioTemplate as Component } from "./Portfolio";

export default {
  title: "Templates/Portfolio Template",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const PortfolioTemplate = Template.bind({});
PortfolioTemplate.args = {
  accountProps: mockAccount,
  collectionProps: {
    assets: mockAssets,
  },
};
