import { ButtonStyled } from './Button.styled';
import { ButtonProps, Sizes, Variants } from './Button.types';

/**
 * Renders a styled button with support for size, variant, full-width layout, and accessibility.
 *
 * - Defaults to `type="button"` to prevent accidental form submissions.
 * - Accepts children as visible content, and supports `aria-label` for icon-only buttons.
 * - Issues a warning in development if no accessible label is provided.
 * - Adds `aria-disabled` alongside `disabled` for assistive technologies.
 *
 * @remarks
 * Use `aria-label` and `title` when rendering icon-only buttons to ensure accessibility.
 *
 * @example
 * ```tsx
 * <Button variant={Button.Variants.Primary} size={Button.Sizes.Medium} onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */

const Button: React.FC<ButtonProps> & { Sizes: typeof Sizes; Variants: typeof Variants } = ({
  size = Sizes.Medium,
  variant = Variants.Primary,
  testId = 'button-component',
  children,
  fluid = false,
  type = 'button', // Prevent accidental submissions
  allowWrap = false,
  ...props
}) => {
  const ariaLabel = props['aria-label'];
  const hasAccessibleText = typeof children === 'string' || typeof children === 'number';

  // Button has no visible text but includes aria-label (i.e. icon-only)
  const isIconOnly = !hasAccessibleText && !!ariaLabel;

  // Development warning for mussing accessible content (text or aria-label)
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test' &&
    !hasAccessibleText &&
    !ariaLabel
  ) {
    console.warn(
      '[Button] It seems you are rendering a button without readable text or `aria-label`. This might not be accessible for screen readers.',
    );
  }

  return (
    <ButtonStyled
      {...props}
      size={size}
      variant={variant}
      fluid={fluid}
      type={type}
      allowWrap={allowWrap}
      data-testid={testId}
      aria-label={ariaLabel}
      aria-disabled={props.disabled}
      title={isIconOnly ? ariaLabel : undefined}
    >
      {children}
    </ButtonStyled>
  );
};

// Exposes size and variant enums for consistent consumption
Button.Sizes = Sizes;
Button.Variants = Variants;

Button.displayName = 'Button';

export default Button;
