import styled from 'styled-components';
import { Sizes } from './Modal.types';

export const Backdrop = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: '#00000080',
  zIndex: 99,
});

export const ModalContainer = styled.div({
  position: 'fixed',
  inset: 0,
  pointerEvents: 'none',
  zIndex: 100,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const ModalContentStyled = styled.div<{ size: string }>(
  ({ theme, size = Sizes.Medium }) => ({
    position: 'relative',
    pointerEvents: 'auto',

    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',

    backgroundColor: theme.palette.white,
    padding: theme.spacing(1, 2),

    ...(size === Sizes.Small && {
      width: '420px',
      maxWidth: 'calc(100% - 2rem)',
      overflow: 'auto',
    }),

    ...(size === Sizes.Medium && {
      width: '640px',
      maxWidth: 'calc(100% - 4rem)',
      overflow: 'auto',
    }),

    ...(size === Sizes.Large && {
      width: '840px',
      maxWidth: 'calc(100% - 6rem)',
      overflow: 'auto',
    }),
  }),
);
