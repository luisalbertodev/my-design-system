import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../themes/defaultTheme';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>);
};

const withTheme = (component: React.ReactNode) => (
  <ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>
);

export { renderWithTheme, withTheme };
