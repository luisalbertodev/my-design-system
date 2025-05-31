import React from 'react';
import type { Preview, StoryFn, StoryContext } from '@storybook/react'
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../src/themes/defaultTheme";
import { GlobalStyle } from "../src/themes/global";


const withTheme = (Story: StoryFn, context: StoryContext) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={defaultTheme}>
      {Story(context.args, context)}
    </ThemeProvider>
  </>
);


const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    options: {
      storySort: {
        order: ['Welcome', 'Atoms', 'Molecules'],
      },
    },
  },
};

export default preview;
