import { FC } from 'react';
import { ModalActionsStyled } from './ModalActions.styled';

interface ModalActionsProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional ID for the modal actions.
   * Useful for accessibility and DOM querying.
   * @default 'modal-actions-component'
   */
  testId?: string;

  /**
   * The content of the modal actions.
   */
  children: React.ReactNode;

  /**
   * The HTML element to use for the modal actions.
   * @default 'footer'
   */
  as?: React.ElementType;
}

/**
 * Wrapper for action buttons inside a modal (e.g., confirm, cancel).
 *
 * @remarks
 * Renders as a `<footer>` by default, but can be customized via the `as` prop.
 *
 * @example
 * ```tsx
 * <ModalActions>
 *   <Button>Cancel</Button>
 *   <Button>Confirm</Button>
 * </ModalActions>
 * ```
 */

const ModalActions: FC<ModalActionsProps> = ({
  testId = 'modal-actions-component',
  children,
  as = 'footer',
  ...props
}) => {
  return (
    <ModalActionsStyled {...props} data-testid={testId} as={as}>
      {children}
    </ModalActionsStyled>
  );
};

ModalActions.displayName = 'ModalActions';

export default ModalActions;
