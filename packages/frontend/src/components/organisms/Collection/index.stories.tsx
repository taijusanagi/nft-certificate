import { ComponentMeta, ComponentStory } from "@storybook/react";

import { mockAssets } from "../../../data/mock";
import { Collection as Component } from "./Collection";

export default {
  title: "Organisms/Collection",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Collection = Template.bind({});
Collection.args = {
  assets: mockAssets,
};
