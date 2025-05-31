import { FC } from 'react';
import { ModalContentStyled } from './ModalContent.styled';

interface ModalContentProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional ID for the modal content.
   * Useful for accessibility and DOM querying.
   * @default 'modal-content-component'
   */
  testId?: string;

  /**
   * The content of the modal.
   */
  children: React.ReactNode;

  /**
   * The HTML element to use for the modal content.
   * @default 'div'
   */
  as?: React.ElementType;

  /**
   * Optional ID for the modal content.
   * Useful for accessibility and DOM querying.
   * @default 'modal-description'
   */
  id?: string;
}

/**
 * Main content area of the modal.
 *
 * @remarks
 * Handles descriptive content and links to `aria-describedby`.
 * Renders as a `<div>` by default and accepts a custom `id` for accessibility.
 *
 * @example
 * ```tsx
 * <ModalContent id="content-accessible-for-screen-readers">
 *   <p>This action is irreversible.</p>
 * </ModalContent>
 * ```
 */

const ModalContent: FC<ModalContentProps> = ({
  testId = 'modal-content-component',
  children,
  as = 'div',
  id = 'modal-description',
  ...props
}) => {
  return (
    <ModalContentStyled {...props} data-testid={testId} as={as} id={id}>
      {children}
    </ModalContentStyled>
  );
};

ModalContent.displayName = 'ModalContent';

export default ModalContent;
