import styled from 'styled-components';

export const ModalTitleStyled = styled.h3(({ theme }) => ({
  margin: 0,

  fontSize: theme.typography.headline.small.fontSize,
  fontWeight: theme.typography.headline.small.fontWeight,
  lineHeight: theme.typography.headline.small.lineHeight,
}));
