import { ComponentMeta, ComponentStory } from "@storybook/react";

import { HomeTemplate as Component } from "./Home";

export default {
  title: "Templates/Home Template",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const HomeTemplate = Template.bind({});
