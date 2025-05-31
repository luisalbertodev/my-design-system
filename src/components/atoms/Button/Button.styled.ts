import styled, { DefaultTheme } from 'styled-components';

import { ButtonProps, Sizes, VariantsType, Variants } from './Button.types';

const getButtonVariantStyles = (theme: DefaultTheme, variant: VariantsType) => {
  return {
    color: theme.button.variant[variant].fontColor,
    backgroundColor: theme.button.variant[variant].backgroundColor,
    borderColor: theme.button.variant[variant].borderColor,

    '&:hover': {
      color: theme.button.variant[variant].hover.fontColor,
      backgroundColor: theme.button.variant[variant].hover.backgroundColor,
      borderColor: theme.button.variant[variant].hover.borderColor,
      cursor: 'pointer',
    },

    '&:active': {
      color: theme.button.variant[variant].pressed.fontColor,
      backgroundColor: theme.button.variant[variant].pressed.backgroundColor,
      borderColor: theme.button.variant[variant].pressed.borderColor,
    },

    '&:hover:not(:disabled), :active:not(:disabled)': {
      textDecoration: variant === Variants.Link ? 'underline' : 'none',
    },

    '&:disabled': {
      color: theme.button.variant[variant].disabled.fontColor,
      backgroundColor: theme.button.variant[variant].disabled.backgroundColor,
      borderColor: theme.button.variant[variant].disabled.borderColor,
      cursor: 'not-allowed',
    },
  };
};

const customProps = ['size', 'variant', 'fluid', 'allowWrap'] as const;
type CustomProp = (typeof customProps)[number];

const ButtonStyled = styled.button.withConfig({
  shouldForwardProp: (prop: string) => !customProps.includes(prop as CustomProp),
})<ButtonProps>(({ theme, size = Sizes.Medium, variant = Variants.Primary, fluid, allowWrap }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0px',
  borderWidth: '1px',
  borderStyle: 'solid',
  fontWeight: 500,
  transition: 'background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease',
  whiteSpace: allowWrap ? 'normal' : 'nowrap',
  height: theme.button.size[size].height,
  padding: theme.button.size[size].padding,
  fontSize: theme.button.size[size].fontSize,

  '&:focus-visible': {
    outline: `2px solid ${theme.palette.blue}`,
    outlineOffset: '2px',
  },

  ...getButtonVariantStyles(theme, variant),
  ...(fluid && { width: '100%' }),
}));

export { ButtonStyled };
