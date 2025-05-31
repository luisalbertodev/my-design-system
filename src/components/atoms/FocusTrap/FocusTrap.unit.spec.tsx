import { fireEvent, act, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { renderWithTheme } from '../../../shared/test/renderWithTheme';
import FocusTrap from './FocusTrap';

const FakeModalComponent = ({
  testId,
  isActiveFocusTrap,
}: {
  testId: string;
  isActiveFocusTrap: boolean;
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <button data-testid={testId} onClick={() => setIsActive((prev) => !prev)}>
        Toggle Modal
      </button>
      {isActive && (
        <FocusTrap isActive={isActiveFocusTrap} onEscape={() => setIsActive(false)}>
          {() => (
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <header>
                <h2 id="modal-title">Modal Title</h2>
                <button>Close</button>
              </header>

              <div id="modal-description">
                <p>Modal content</p>
              </div>

              <footer>
                <button>Cancel</button>
                <button>Understood</button>
              </footer>
            </div>
          )}
        </FocusTrap>
      )}
    </>
  );
};

describe('FocusTrap Component', () => {
  describe('Acceptance Criteria', () => {
    it('should focus on the first focusable element', () => {
      const { getAllByRole } = renderWithTheme(
        <>
          <FocusTrap isActive={true}>
            {() => (
              <form>
                <input type="text" placeholder="First input" />
                <input type="email" placeholder="Second input" />
                <input type="password" placeholder="Third input" />
              </form>
            )}
          </FocusTrap>
        </>,
      );

      const inputs = getAllByRole('textbox');
      const firstInput = inputs[0];

      expect(firstInput).toHaveFocus();
    });

    it('should restore focus to the previously active element on unmount', () => {
      const TOGGLE_MODAL_TEST_ID = 'trigger-button';

      // This test validates the complete focus management cycle:
      // trigger receives focus -> focus trap mounts -> first element is focused -> unmount restores focus to trigger
      const FakeMountAndUnmountFocusTrap = () => {
        const [isActive, setIsActive] = useState(false);

        return (
          <>
            <button data-testid={TOGGLE_MODAL_TEST_ID} onClick={() => setIsActive((prev) => !prev)}>
              Toggle Trap
            </button>
            {isActive && (
              <FocusTrap isActive={true}>
                {() => (
                  <ul>
                    <li>
                      <a href="#1">Item 1</a>
                    </li>
                    <li>
                      <a href="#2">Item 2</a>
                    </li>
                    <li>
                      <a href="#3">Item 3</a>
                    </li>
                  </ul>
                )}
              </FocusTrap>
            )}
          </>
        );
      };

      const { getByTestId, getAllByRole } = renderWithTheme(<FakeMountAndUnmountFocusTrap />);

      const toggleButton = getByTestId(TOGGLE_MODAL_TEST_ID);

      // Initial focus and validate
      toggleButton.focus();
      expect(toggleButton).toHaveFocus();

      // wait to focus trap mounted
      act(() => {
        fireEvent.click(toggleButton);
      });

      // Validate initial focus on first focusable element
      const listItems = getAllByRole('link');
      expect(listItems[0]).toHaveFocus();

      // wait to focus trap unmounted
      act(() => {
        fireEvent.click(toggleButton);
      });

      // Validate focus restored to the previously active element
      expect(toggleButton).toHaveFocus();
    });

    it('should allow trigger external action when user press escape key', async () => {
      const TOGGLE_MODAL_TEST_ID = 'trigger-button';
      const user = userEvent.setup();

      const { getByTestId, getByRole } = renderWithTheme(
        <FakeModalComponent isActiveFocusTrap={true} testId={TOGGLE_MODAL_TEST_ID} />,
      );

      const toggleModal = getByTestId(TOGGLE_MODAL_TEST_ID);

      toggleModal.focus();
      expect(toggleModal).toHaveFocus();

      act(() => {
        fireEvent.click(toggleModal);
      });

      const dialog = getByRole('dialog');
      const dialogButtons = within(dialog).getAllByRole('button');

      await waitFor(() => {
        expect(dialogButtons[0]).toHaveFocus();
      });

      act(() => {
        user.keyboard('{Escape}');
      });

      await waitFor(() => {
        expect(toggleModal).toHaveFocus();
      });
    });

    it('should wrap to the first element if on last', async () => {
      const TOGGLE_MODAL_TEST_ID = 'trigger-button';
      const user = userEvent.setup();

      const { getByTestId, getByRole } = renderWithTheme(
        <FakeModalComponent isActiveFocusTrap={true} testId={TOGGLE_MODAL_TEST_ID} />,
      );

      const toggleModal = getByTestId(TOGGLE_MODAL_TEST_ID);

      fireEvent.click(toggleModal);

      const dialog = getByRole('dialog');
      const dialogButtons = within(dialog).getAllByRole('button');

      const firstFocusableElement = dialogButtons[0];
      expect(firstFocusableElement).toHaveFocus();

      const lastFocusableElement = dialogButtons[dialogButtons.length - 1];
      lastFocusableElement.focus();
      expect(lastFocusableElement).toHaveFocus();

      act(() => {
        user.keyboard('{Tab}');
      });

      await waitFor(() => {
        expect(firstFocusableElement).toHaveFocus();
      });
    });

    it('should wrap to the last element if on first', async () => {
      const TOGGLE_MODAL_TEST_ID = 'trigger-button';
      const user = userEvent.setup();

      const { getByTestId, getByRole } = renderWithTheme(
        <FakeModalComponent isActiveFocusTrap={true} testId={TOGGLE_MODAL_TEST_ID} />,
      );

      const toggleModal = getByTestId(TOGGLE_MODAL_TEST_ID);

      fireEvent.click(toggleModal);

      const dialog = getByRole('dialog');
      const dialogButtons = within(dialog).getAllByRole('button');

      const firstFocusableElement = dialogButtons[0];
      expect(firstFocusableElement).toHaveFocus();

      act(() => {
        user.keyboard('{Shift>}{Tab}{/Shift}');
      });

      await waitFor(() => {
        const lastFocusableElement = dialogButtons[dialogButtons.length - 1];
        expect(lastFocusableElement).toHaveFocus();
      });
    });

    it('should not focus within its children while isActive is false', () => {
      const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');

      const { getByPlaceholderText } = renderWithTheme(
        <FocusTrap isActive={false}>
          {() => (
            <form>
              <input type="text" placeholder="First input" />
              <input type="text" placeholder="Second input" />
            </form>
          )}
        </FocusTrap>,
      );

      const input = getByPlaceholderText('First input');
      expect(input).not.toHaveFocus();

      // ensure focus is not called
      expect(focusSpy).not.toHaveBeenCalled();

      // ensure focus persisted on body
      expect(document.body).toHaveFocus();
    });

    it('should use fallback ref when no focusable element is found', () => {
      const FALLBACK_TEST_ID = 'fallback';

      const { getByTestId } = renderWithTheme(
        <FocusTrap isActive={true}>
          {/* Fallback node is intentionally non-interactive but focusable (tabIndex={-1}) */}
          {(fallbackRef) => <div ref={fallbackRef} data-testid={FALLBACK_TEST_ID} tabIndex={-1} />}
        </FocusTrap>,
      );

      const fallbackNode = getByTestId(FALLBACK_TEST_ID);
      expect(fallbackNode).toHaveFocus();
    });
  });
});
