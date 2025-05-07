// import { ThemeProvider } from "styled-components";
// import { defaultTheme } from "./../src/themes/defaultTheme";
// import { GlobalStyle } from "../src/themes/global";

// export const decorators = [
//   (Story) => (
//     <>
//       <GlobalStyle />
//       <ThemeProvider theme={defaultTheme}>
//         <Story />
//       </ThemeProvider>
//     </>
//   ),
// ];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    // matchers: {
    //   color: /(background|color)$/i,
    //   date: /Date$/,
    // },
    expanded: true,
  },
};
