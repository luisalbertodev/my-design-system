import styled from 'styled-components';

export const ModalActionsStyled = styled.footer(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
}));
