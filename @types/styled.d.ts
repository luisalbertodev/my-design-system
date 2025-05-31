import 'styled-components';
import { defaultTheme } from '../src/themes/defaultTheme';

type DefaultThemeValues = typeof defaultTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends DefaultThemeValues {}
}
