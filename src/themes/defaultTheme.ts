/* istanbul ignore file */

import { spacing } from './spacing';
import { palette } from './palette';
import { size } from './sizing';

const defaultTheme = {
  palette,
  spacing,
  button: {
    size: {
      medium: {
        height: '44px',
        padding: spacing(2, 3.25),
        fontSize: size(1.6),
        notificationBottom: '30px',
      },
    },
    variant: {
      primary: {
        backgroundColor: palette.blue30,
        fontColor: palette.white,
        borderColor: palette.blue30,
        hover: {
          backgroundColor: palette.blue50,
          fontColor: palette.blue30,
          borderColor: palette.blue50,
        },
        pressed: {
          backgroundColor: palette.blue,
          fontColor: palette.blue30,
          borderColor: palette.blue30,
        },
        disabled: {
          backgroundColor: palette.black30,
          fontColor: palette.white,
          borderColor: palette.black30,
        },
      },
      secondary: {
        backgroundColor: palette.white,
        fontColor: palette.blue30,
        borderColor: palette.blue30,
        hover: {
          backgroundColor: palette.blue50,
          fontColor: palette.blue30,
          borderColor: palette.blue50,
        },
        pressed: {
          backgroundColor: palette.blue30,
          fontColor: palette.blue30,
          borderColor: palette.blue30,
        },
        disabled: {
          backgroundColor: palette.black30,
          fontColor: palette.white,
          borderColor: palette.black30,
        },
      },
      link: {
        backgroundColor: palette.transparent,
        fontColor: palette.blue30,
        borderColor: palette.transparent,
        hover: {
          backgroundColor: palette.transparent,
          fontColor: palette.blue30,
          borderColor: palette.transparent,
        },
        pressed: {
          backgroundColor: palette.transparent,
          fontColor: palette.blue50,
          borderColor: palette.transparent,
        },
        disabled: {
          backgroundColor: palette.transparent,
          fontColor: palette.black30,
          borderColor: palette.transparent,
        },
      },
    },
  },
  typography: {
    display: {
      large: {
        fontSize: size(5.7),
        lineHeight: size(6.4),
        fontWeight: 400,
      },
      medium: {
        fontSize: size(4.5),
        lineHeight: size(5.2),
        fontWeight: 400,
      },
      small: {
        fontSize: size(3.6),
        lineHeight: size(4.4),
        fontWeight: 400,
      },
    },
    headline: {
      large: {
        fontSize: size(3.2),
        lineHeight: size(4),
        fontWeight: 400,
      },
      medium: {
        fontSize: size(2.8),
        lineHeight: size(3.6),
        fontWeight: 400,
      },
      small: {
        fontSize: size(2.4),
        lineHeight: size(3.2),
        fontWeight: 400,
      },
    },
    title: {
      large: {
        fontSize: size(2.2),
        lineHeight: size(2.8),
        fontWeight: 400,
      },
      medium: {
        fontSize: size(1.6),
        lineHeight: size(2.4),
        fontWeight: 500,
      },
      small: {
        fontSize: size(1.4),
        lineHeight: size(2),
        fontWeight: 500,
      },
    },
    body: {
      large: {
        fontSize: size(1.6),
        lineHeight: size(2.4),
        fontWeight: 400,
      },
      medium: {
        fontSize: size(1.4),
        lineHeight: size(2),
        fontWeight: 400,
      },
      small: {
        fontSize: size(1.2),
        lineHeight: size(1.6),
        fontWeight: 400,
      },
    },
    label: {
      small: {
        fontSize: size(1.1),
        lineHeight: size(1.6),
        fontWeight: 500,
      },
    },
  },
} as const;

export { defaultTheme };
