/**
 * Available button sizes.
 * Use in combination with the `size` prop to control button size.
 */

export const Sizes = Object.freeze({
  Medium: 'medium',
});

/**
 * Available button variants.
 * Use in combination with the `variant` prop to control button variant.
 */

export const Variants = Object.freeze({
  Primary: 'primary',
  Secondary: 'secondary',
  Link: 'link',
});

/**
 * Literal union type for supported button sizes.
 */
export type SizesType = (typeof Sizes)[keyof typeof Sizes];

/**
 * Literal union type for supported button variants.
 */
export type VariantsType = (typeof Variants)[keyof typeof Variants];

/**
 * Props for the Button component.
 * All accessibility and composition concerns are handled internally.
 */
export interface BaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Optional ID for the button element.
   * Useful for testing and DOM querying.
   * @default 'button-component'
   */
  testId?: string;

  /**
   * Controls the button's visual size (width and padding).
   * @default Sizes.Medium
   */
  size?: SizesType;

  /**
   * Controls the button's visual variant (color and style).
   * @default Variants.Primary
   */
  variant?: VariantsType;

  /**
   * Button content.
   */
  children?: React.ReactNode;

  /**
   * If true, the button will span the full width of its container.
   * @default false
   */
  fluid?: boolean;

  /**
   * If true, the button text will wrap to the next line if it exceeds the container width.
   * @default false
   */
  allowWrap?: boolean;
}

/**
 * Exported Button props type.
 */
export type ButtonProps = BaseProps;
