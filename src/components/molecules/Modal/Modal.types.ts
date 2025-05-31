/**
 * Available modal sizes.
 * Use in combination with the `size` prop to control modal width.
 */
export const Sizes = Object.freeze({
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
});

/**
 * Literal union type for supported modal sizes.
 */
export type SizesType = (typeof Sizes)[keyof typeof Sizes];

/**
 * Props for the Modal component.
 * All accessibility and composition concerns are handled internally.
 */
export interface IModalProps {
  /**
   * Optional ID for the root modal container.
   * Useful for testing and DOM querying.
   * @default 'modal-component'
   */
  testId?: string;

  /**
   * ID of the DOM node where the modal will be portaled.
   * If not provided, defaults to 'modal-container'.
   */
  containerId?: string;

  /**
   * Element ID for the modal title.
   * Used to associate the modal with `aria-labelledby`.
   * This should match the `id` of a `<Modal.Title>` element.
   * @default 'modal-title'
   */
  titleId?: string;

  /**
   * Element ID for the modal description/content section.
   * Used to associate the modal with `aria-describedby`.
   * This should match the `id` of a `<Modal.Content>` element.
   * @default 'modal-description'
   */
  descriptionId?: string;

  /**
   * Controls the visibility of the modal.
   * Must be controlled externally.
   */
  isOpen: boolean;

  /**
   * Callback fired when the user closes the modal:
   * - clicking on backdrop
   * - pressing the Escape key
   */
  onClose?: () => void;

  /**
   * Modal children should follow the composable structure:
   * - `<Modal.Title>`
   * - `<Modal.Content>`
   * - `<Modal.Actions>`
   */
  children: React.ReactNode;

  /**
   * Controls the modal’s visual size (width and padding).
   * @default Sizes.Medium
   */
  size?: SizesType;
}

/**
 * Exported Modal props type.
 */
export type ModalProps = IModalProps;
