import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Hero as Component } from "./Hero";

export default {
  title: "Organisms/Hero",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Hero = Template.bind({});
