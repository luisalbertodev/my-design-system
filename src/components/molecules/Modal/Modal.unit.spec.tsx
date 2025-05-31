import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithTheme } from '../../../shared/test/renderWithTheme';
import { axe } from '../../../shared/test/axeHelper';
import Modal from './Modal';

describe('Modal Component', () => {
  describe('Acceptance Criteria', () => {
    it('should render when isOpen is true', () => {
      const MODAL_TITLE_TEST_ID = 'modal-title';

      const { getByTestId } = renderWithTheme(
        <Modal isOpen={true} onClose={() => {}}>
          <Modal.Title testId={MODAL_TITLE_TEST_ID}>Modal Title</Modal.Title>
        </Modal>,
      );

      const title = getByTestId(MODAL_TITLE_TEST_ID);
      expect(title).toBeInTheDocument();
    });
    it('should not render when isOpen is false', () => {
      const MODAL_TITLE_TEST_ID = 'modal-title';

      const { queryByTestId } = renderWithTheme(
        <Modal isOpen={false} onClose={() => {}}>
          <Modal.Title testId={MODAL_TITLE_TEST_ID}>Modal Title</Modal.Title>
        </Modal>,
      );

      const title = queryByTestId(MODAL_TITLE_TEST_ID);
      expect(title).toBeNull();
    });
    it('should close on backdrop click', () => {
      const MODAL_TEST_ID = 'modal-component';
      const MODAL_BACKDROP_TEST_ID = `${MODAL_TEST_ID}-backdrop`;
      const handleClose = jest.fn();

      const { getByTestId } = renderWithTheme(
        <Modal testId={MODAL_TEST_ID} isOpen={true} onClose={handleClose}>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal>,
      );

      const backdrop = getByTestId(MODAL_BACKDROP_TEST_ID);
      fireEvent.click(backdrop);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });
    it('should not close on content click', () => {
      const MODAL_TEST_ID = 'modal-component';
      const handleClose = jest.fn();

      const { getByTestId } = renderWithTheme(
        <Modal testId={MODAL_TEST_ID} isOpen={true} onClose={handleClose}>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal>,
      );

      const modalContent = getByTestId(MODAL_TEST_ID);
      fireEvent.click(modalContent);

      expect(handleClose).not.toHaveBeenCalled();
    });
    it('should render children correctly', () => {
      const MODAL_TITLE_TEST_ID = 'modal-title';

      const { getByTestId } = renderWithTheme(
        <Modal isOpen={true} onClose={() => {}}>
          <Modal.Title testId={MODAL_TITLE_TEST_ID}>Modal Title</Modal.Title>
        </Modal>,
      );

      const title = getByTestId(MODAL_TITLE_TEST_ID);
      expect(title).toBeInTheDocument();
    });

    describe('Sizes', () => {
      it.each([
        ['Small', Modal.Sizes.Small],
        ['Medium', Modal.Sizes.Medium],
        ['Large', Modal.Sizes.Large],
      ])('should support size %s variant', (_, size) => {
        const MODAL_TEST_ID = 'modal-component';

        const { getByTestId } = renderWithTheme(
          <Modal testId={MODAL_TEST_ID} size={size} isOpen={true} onClose={() => {}}>
            <Modal.Title>{size}</Modal.Title>
          </Modal>,
        );

        const modal = getByTestId(MODAL_TEST_ID);
        expect(modal).toBeInTheDocument();
        expect(modal).toHaveTextContent(size);
      });
    });
  });
  describe('Accessibility', () => {
    it('should have role="dialog" and aria-modal="true"', () => {
      const MODAL_TEST_ID = 'modal-component';

      const { getByTestId } = renderWithTheme(
        <Modal testId={MODAL_TEST_ID} isOpen={true} onClose={() => {}}>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal>,
      );

      const modal = getByTestId(MODAL_TEST_ID);
      expect(modal).toHaveAttribute('role', 'dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
    });

    it('should be accessible when open', async () => {
      const MODAL_TITLE_ID = 'modal-title';
      const MODAL_DESCRIPTION_ID = 'modal-description';

      const { container } = renderWithTheme(
        <Modal
          isOpen={true}
          onClose={() => {}}
          titleId={MODAL_TITLE_ID}
          descriptionId={MODAL_DESCRIPTION_ID}
        >
          <Modal.Title testId={MODAL_TITLE_ID}>Modal Title</Modal.Title>
          <Modal.Content testId={MODAL_DESCRIPTION_ID}>Modal Description</Modal.Content>
        </Modal>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
    it('should trap focus while open', async () => {
      const user = userEvent.setup();
      const MODAL_TEST_ID = 'modal-component';

      const { getByPlaceholderText, getByText } = renderWithTheme(
        <>
          <button>Outise Button</button>
          <Modal testId={MODAL_TEST_ID} isOpen={true} onClose={() => {}}>
            <Modal.Title>Modal Title</Modal.Title>
            <Modal.Content>
              <form>
                <input type="text" placeholder="First Input" />
                <button type="button">Second Button</button>
              </form>
            </Modal.Content>
          </Modal>
        </>,
      );

      // When Modal mount focus should be on first input
      const firstInput = getByPlaceholderText('First Input');
      expect(firstInput).toHaveFocus();

      // Tab, should go to the second button
      await user.tab();
      const secondButton = getByText('Second Button');
      expect(secondButton).toHaveFocus();

      // Tab again, should cycle back to the first input (focus trap)
      await user.tab();
      expect(firstInput).toHaveFocus();

      // Now try Shift+Tab (reverse direction)
      await user.keyboard('{Shift>}{Tab}{/Shift}');
      expect(secondButton).toHaveFocus();
    });
  });
});
