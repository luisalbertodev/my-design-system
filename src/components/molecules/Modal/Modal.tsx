import { FC, MouseEvent } from 'react';
import GenericPortal from '../../atoms/GenericPortal';
import FocusTrap from '../../atoms/FocusTrap';
import { Backdrop, ModalContainer, ModalContentStyled } from './Modal.styled';
import { ModalProps, Sizes } from './Modal.types';
import ModalTitle from './ModalTitle';
import ModalContent from './ModalContent';
import ModalActions from './ModalActions';

/**
 * Modal component for presenting content is an overlay.
 *
 * Provides keyboard focus trapping and automatic focus managementm,
 * and semantic composition via `Modal.Title`, `Modal.Content`, `Modal.Actions`.
 *
 * Typically used for confirmations, forms, or blocking interactions.
 *
 * @example
 * ```tsx
 * <Modal isOpen={isOpen} onClose={handleClose} size={Modal.Sizes.Medium}>
 *   <Modal.Title>Confirm</Modal.Title>
 *   <Modal.Content>Are you sure you want to continue?</Modal.Content>
 *   <Modal.Actions>
 *     <Button onClick={handleClose}>Cancel</Button>
 *     <Button>Confirm</Button>
 *   </Modal.Actions>
 * </Modal>
 * ```
 */

const Modal: FC<ModalProps> & {
  Title: typeof ModalTitle;
  Content: typeof ModalContent;
  Actions: typeof ModalActions;

  Sizes: typeof Sizes;
} = ({
  testId = 'modal-component',
  containerId = 'modal-container',
  titleId = 'modal-title',
  descriptionId = 'modal-description',
  isOpen,
  onClose,
  size = Sizes.Medium,
  children,
}) => {
  // Hanldes clicks on the backdrop only (ignores clicks inside modal content)
  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && onClose) {
      onClose();
    }
  };

  // Modal is only mounted in the DOM when open; avoids SSR mismatches and off-screen focus traps
  if (!isOpen) return null;

  return (
    <GenericPortal containerId={containerId}>
      {/* Backdrop with click-to-dismiss behavior */}
      <Backdrop data-testid={`${testId}-backdrop`} onClick={handleBackdropClick} />
      {/* Centers modal content and separates visual structure */}
      <ModalContainer>
        {/* Focus trap ensures keyboard focus remains inside the modal while open */}
        <FocusTrap isActive={isOpen} onEscape={onClose}>
          {(fallbackRef) => (
            <ModalContentStyled
              ref={fallbackRef} // Fallback focus target if no interactable elements inside
              data-testid={testId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              size={size}
              tabIndex={-1}
            >
              {children}
            </ModalContentStyled>
          )}
        </FocusTrap>
      </ModalContainer>
    </GenericPortal>
  );
};

Modal.displayName = 'Modal';

// Exposes size enum for consistent consumption
Modal.Sizes = Sizes;

// Component composition via static properties
Modal.Title = ModalTitle;
Modal.Content = ModalContent;
Modal.Actions = ModalActions;

export default Modal;
