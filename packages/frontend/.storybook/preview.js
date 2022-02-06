import { AppWrapper } from "../src/components/utils/AppWapper";
import { addDecorator } from "@storybook/react";

import "../src/styles/global.scss";

addDecorator((storyFn) => <AppWrapper>{storyFn()}</AppWrapper>);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
