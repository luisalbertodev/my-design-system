import { FC } from 'react';
import { ModalTitleStyled } from './ModalTitle.styled';

interface ModalTitleProps {
  /**
   * Optional ID for the modal title.
   * Useful for accessibility and DOM querying.
   * @default 'modal-title-component'
   */
  testId?: string;

  /**
   * The content of the modal title.
   */
  children: React.ReactNode;

  /**
   * The HTML heading element to use for the modal title.
   * @default 'h3'
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  /**
   * Optional ID for the modal title.
   * Useful for accessibility and DOM querying.
   * @default 'modal-title'
   */
  id?: string;
}

/**
 * Title of the modal, linked to `aria-labelledby`.
 *
 * @remarks
 * Renders as a heading tag (`h3` by default) and accepts a custom `id`.
 *
 * @example
 * ```tsx
 * <ModalTitle as="h2" id="modal-title-accessible-for-screen-readers">Delete Confirmation</ModalTitle>
 * ```
 */

const ModalTitle: FC<ModalTitleProps> = ({
  testId = 'modal-title-component',
  children,
  as = 'h3',
  id = 'modal-title',
}) => {
  return (
    <ModalTitleStyled data-testid={testId} as={as} id={id}>
      {children}
    </ModalTitleStyled>
  );
};

ModalTitle.displayName = 'ModalTitle';

export default ModalTitle;
