/* istanbul ignore file */

import { createGlobalStyle } from 'styled-components';
import { palette } from './palette';

export const GlobalStyle = createGlobalStyle`
* {
    font-family: 'Roboto';
    box-sizing: border-box;
    color: ${palette.black};
  }
`;
