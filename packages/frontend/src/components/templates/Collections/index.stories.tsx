import { ComponentMeta, ComponentStory } from "@storybook/react";

import { mockAccount, mockAssets } from "../../../data/mock";
import { CollectionsTemplate as Component } from "./Collections";

export default {
  title: "Templates/Collection Template",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const CollectionTemplate = Template.bind({});
CollectionTemplate.args = {
  accountProps: mockAccount,
  collectionProps: {
    assets: mockAssets,
  },
};
