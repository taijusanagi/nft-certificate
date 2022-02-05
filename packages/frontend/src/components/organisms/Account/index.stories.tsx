import { ComponentMeta, ComponentStory } from "@storybook/react";

import { mockAccount } from "../../../data/mock";
import { Account as Component } from "./Account";

export default {
  title: "Organisms/Account",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Account = Template.bind({});
Account.args = mockAccount;
