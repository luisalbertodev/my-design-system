import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithTheme } from '../../../shared/test/renderWithTheme';
import Button from './Button';
import { ButtonProps } from './Button.types';

const TEST_ID = 'button-component';

const renderButton = (props: ButtonProps = {}) => {
  const { children } = props;

  return renderWithTheme(
    <Button testId={TEST_ID} {...props}>
      {children}
    </Button>,
  );
};

describe('Button Component', () => {
  describe('Acceptance Criteria', () => {
    it('should render a button with visible text', () => {
      const buttonText = 'Submit';

      const { getByTestId } = renderButton({ children: buttonText });
      const button = getByTestId(TEST_ID);

      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(buttonText);
    });

    it('should render an icon-only button with aria-label and title', () => {
      const buttonAriaLabel = 'Close';

      const { getByTestId } = renderButton({ 'aria-label': buttonAriaLabel });
      const button = getByTestId(TEST_ID);

      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', buttonAriaLabel);
      expect(button).toHaveAttribute('title', buttonAriaLabel);
    });

    it('should apply full-width layout when fluid is true', () => {
      const { getByTestId } = renderButton({ fluid: true, children: 'Submit' });

      const button = getByTestId(TEST_ID);

      expect(button).toHaveStyle({ width: '100%' });
    });

    it('should allow text wrapping when allowWrap is true', () => {
      const { getByTestId } = renderButton({ allowWrap: true, children: 'Submit' });

      const button = getByTestId(TEST_ID);

      expect(button).toHaveStyle({ whiteSpace: 'normal' });
    });

    it('should default the type to "button"', () => {
      const { getByTestId } = renderButton({ children: 'Submit' });
      const button = getByTestId(TEST_ID);

      expect(button).toHaveAttribute('type', 'button');
    });

    it('should apply aria-disabled when disabled', () => {
      const buttonAriaLabel = 'Close';

      const { getByTestId } = renderButton({
        'aria-label': buttonAriaLabel,
        disabled: true,
        children: 'Submit',
      });
      const button = getByTestId(TEST_ID);

      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('should not call onClick when disabled', () => {
      const handleClick = jest.fn();

      const { getByTestId } = renderButton({
        onClick: handleClick,
        disabled: true,
        children: 'Submit',
      });
      const button = getByTestId(TEST_ID);

      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should call onClick when clicked', () => {
      const handleClick = jest.fn();

      const { getByTestId } = renderButton({ onClick: handleClick, children: 'Submit' });
      const button = getByTestId(TEST_ID);

      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalled();
    });

    it('should warn in development when rendered without children or aria-label', () => {
      const originalEnvironment = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      renderWithTheme(<Button testId={TEST_ID} />);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[Button] It seems you are rendering a button without readable text or `aria-label`. This might not be accessible for screen readers.',
      );

      consoleWarnSpy.mockRestore();
      process.env.NODE_ENV = originalEnvironment;
    });

    describe('Variants', () => {
      it.each([
        ['Primary', Button.Variants.Primary],
        ['Secondary', Button.Variants.Secondary],
        ['Link', Button.Variants.Link],
      ])('should render the %s variant', (_, variant) => {
        const { getByTestId } = renderButton({ variant, children: variant });
        const button = getByTestId(TEST_ID);

        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(variant);
      });
    });

    describe('Sizes', () => {
      it.each([['Small', Button.Sizes.Medium]])('should render the %s size', (_, size) => {
        const { getByTestId } = renderButton({ size, children: size });
        const button = getByTestId(TEST_ID);

        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(size);
      });
    });
  });

  describe('Accessibility', () => {
    it('should receive keyboard focus via Tab', async () => {
      const user = userEvent.setup();
      const testId = 'button-component';

      const { getByTestId } = renderWithTheme(
        <>
          <button>Other</button>
          <Button testId={testId}>Submit</Button>
        </>,
      );

      await user.tab();
      await user.tab();

      const button = getByTestId(testId);
      expect(button).toHaveFocus();
    });

    it('should activate via Enter key', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      const { getByTestId } = renderButton({ onClick: handleClick, children: 'Pressable' });

      const button = getByTestId(TEST_ID);
      button.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should activate via Space key', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      const { getByTestId } = renderButton({ onClick: handleClick, children: 'Pressable' });

      const button = getByTestId(TEST_ID);
      button.focus();
      await user.keyboard('{ }');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
