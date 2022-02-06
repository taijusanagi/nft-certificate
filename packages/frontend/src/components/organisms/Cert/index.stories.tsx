import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Cert as Component } from "./Cert";

export default {
  title: "Organisms/Cert",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Cert = Template.bind({});
Cert.args = {
  nftImage: "/mock/img/nft.png",
  issuerAddress: "0x0730Ad49738206C0f5fdfB1C1f4448Ec9D2edb07",
};