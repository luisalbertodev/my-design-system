import { useState, useEffect } from 'react';
import userEvent from '@testing-library/user-event';

import { renderWithTheme } from '../../../shared/test/renderWithTheme';
import Modal from './Modal';

describe('Modal Integration', () => {
  describe('User Interaction', () => {
    // Clicks, Keyboard, focus, etc
    it('should open and close modal via trigger', async () => {
      const user = userEvent.setup();

      const TRIGGER_OPEN_MODAL_TEST_ID = 'modal-trigger';
      const MODAL_TEST_ID = 'modal-component';
      const MODAL_BACKDROP_TEST_ID = `${MODAL_TEST_ID}-backdrop`;

      const ModalWrapper = () => {
        const [open, setOpen] = useState(false);
        return (
          <>
            <button data-testid={TRIGGER_OPEN_MODAL_TEST_ID} onClick={() => setOpen(true)}>
              Open Modal
            </button>
            <Modal isOpen={open} onClose={() => setOpen(false)} testId={MODAL_TEST_ID}>
              <Modal.Title>Modal Title</Modal.Title>
              <Modal.Content>Some content</Modal.Content>
            </Modal>
          </>
        );
      };

      const { getByTestId, queryByTestId } = renderWithTheme(<ModalWrapper />);

      // Modal should not be mounted when open is false
      expect(queryByTestId(MODAL_TEST_ID)).toBeNull();

      // Clicking trigger should open modal
      await user.click(getByTestId(TRIGGER_OPEN_MODAL_TEST_ID));
      expect(queryByTestId(MODAL_TEST_ID)).toBeInTheDocument();

      // Clicking backdrop should close modal
      await user.click(getByTestId(MODAL_BACKDROP_TEST_ID));
      expect(queryByTestId(MODAL_TEST_ID)).toBeNull();
    });
    it('should return focus to trigger after close', async () => {
      const user = userEvent.setup();
      const TRIGGER_OPEN_MODAL_TEST_ID = 'modal-trigger';
      const MODAL_TEST_ID = 'modal-component';
      const MODAL_BACKDROP_TEST_ID = `${MODAL_TEST_ID}-backdrop`;

      const ModalWrapper = () => {
        const [open, setOpen] = useState(false);

        return (
          <>
            <button data-testid={TRIGGER_OPEN_MODAL_TEST_ID} onClick={() => setOpen(true)}>
              Open Modal
            </button>
            <Modal isOpen={open} onClose={() => setOpen(false)} testId={MODAL_TEST_ID}>
              <Modal.Content>
                <input type="text" placeholder="Focusable input" />
              </Modal.Content>
            </Modal>
          </>
        );
      };

      const { getByTestId, getByPlaceholderText } = renderWithTheme(<ModalWrapper />);

      const trigger = getByTestId(TRIGGER_OPEN_MODAL_TEST_ID);
      trigger.focus();
      expect(trigger).toHaveFocus();

      await user.click(trigger);

      const input = getByPlaceholderText('Focusable input');
      expect(input).toHaveFocus();

      await user.click(getByTestId(MODAL_BACKDROP_TEST_ID));

      expect(trigger).toHaveFocus();
    });
    it('should close on Escape key', async () => {
      const user = userEvent.setup();
      const TRIGGER_OPEN_MODAL_TEST_ID = 'modal-trigger';
      const MODAL_TEST_ID = 'modal-component';

      const ModalWrapper = () => {
        const [open, setOpen] = useState(false);

        return (
          <>
            <button data-testid={TRIGGER_OPEN_MODAL_TEST_ID} onClick={() => setOpen(true)}>
              Open Modal
            </button>
            <Modal isOpen={open} onClose={() => setOpen(false)} testId={MODAL_TEST_ID}>
              <Modal.Content>
                <input type="text" placeholder="Focusable input" />
              </Modal.Content>
            </Modal>
          </>
        );
      };

      const { getByTestId, getByPlaceholderText } = renderWithTheme(<ModalWrapper />);

      const trigger = getByTestId(TRIGGER_OPEN_MODAL_TEST_ID);
      trigger.focus();
      expect(trigger).toHaveFocus();

      await user.click(trigger);

      const input = getByPlaceholderText('Focusable input');
      expect(input).toHaveFocus();

      await user.keyboard('{Escape}');

      expect(trigger).toHaveFocus();
    });
    it('should not close on content click', async () => {
      const user = userEvent.setup();

      const TRIGGER_OPEN_MODAL_TEST_ID = 'modal-trigger';
      const MODAL_TEST_ID = 'modal-component';

      const ModalWrapper = () => {
        const [open, setOpen] = useState(false);

        return (
          <>
            <button data-testid={TRIGGER_OPEN_MODAL_TEST_ID} onClick={() => setOpen(true)}>
              Open Modal
            </button>
            <Modal isOpen={open} onClose={() => setOpen(false)} testId={MODAL_TEST_ID}>
              <Modal.Content>
                <input type="text" placeholder="Focusable input" />
              </Modal.Content>
            </Modal>
          </>
        );
      };

      const { getByTestId, getByPlaceholderText } = renderWithTheme(<ModalWrapper />);

      const trigger = getByTestId(TRIGGER_OPEN_MODAL_TEST_ID);
      trigger.focus();
      expect(trigger).toHaveFocus();

      await user.click(trigger);

      const input = getByPlaceholderText('Focusable input');
      expect(input).toHaveFocus();

      await user.click(getByTestId(MODAL_TEST_ID));

      expect(trigger).not.toHaveFocus();
    });
    it('should support interaction inside modal', async () => {
      const user = userEvent.setup();
      const TRIGGER_OPEN_MODAL_TEST_ID = 'modal-trigger';
      const MODAL_TEST_ID = 'modal-component';
      const MODAL_INPUT_TEST_ID = 'modal-input';
      const MODAL_BUTTON_TEST_ID = 'modal-button';

      const onInternalAction = jest.fn();

      const ModalWrapper = () => {
        const [open, setOpen] = useState(false);

        return (
          <>
            <button data-testid={TRIGGER_OPEN_MODAL_TEST_ID} onClick={() => setOpen(true)}>
              Open Modal
            </button>
            <Modal isOpen={open} onClose={() => setOpen(false)} testId={MODAL_TEST_ID}>
              <Modal.Content>
                <input data-testid={MODAL_INPUT_TEST_ID} type="text" placeholder="Type here..." />
                <button data-testid={MODAL_BUTTON_TEST_ID} onClick={onInternalAction}>
                  Action
                </button>
              </Modal.Content>
            </Modal>
          </>
        );
      };

      const { getByTestId, queryByTestId } = renderWithTheme(<ModalWrapper />);

      // open modal
      await user.click(getByTestId(TRIGGER_OPEN_MODAL_TEST_ID));

      // writting in the input
      const input = getByTestId(MODAL_INPUT_TEST_ID);
      await user.type(input, 'Hello');
      expect(input).toHaveValue('Hello');

      // Clicking the internal button
      const internalButton = getByTestId(MODAL_BUTTON_TEST_ID);
      await user.click(internalButton);
      expect(onInternalAction).toHaveBeenCalledTimes(1);

      // Closing the modal
      await user.keyboard('{Escape}');
      expect(queryByTestId(MODAL_TEST_ID)).toBeNull();
      expect(getByTestId(TRIGGER_OPEN_MODAL_TEST_ID)).toHaveFocus();
    });
  });

  describe('Composed Usage', () => {
    // How works inside layouts, forms, wrappers, etc

    it('should submit a form from within the modal', async () => {
      const user = userEvent.setup();
      const handleSubmit = jest.fn((event) => event.preventDefault());

      const ModalWithForm = () => {
        const [open, setOpen] = useState(false);

        return (
          <>
            <button onClick={() => setOpen(true)}>Open Modal</button>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
              <Modal.Content>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="your@email.com" />
                  <button type="submit">Submit</button>
                </form>
              </Modal.Content>
            </Modal>
          </>
        );
      };

      const { getByRole, getByLabelText, queryByRole } = renderWithTheme(<ModalWithForm />);

      // user open modal
      const externalButton = getByRole('button', { name: /open modal/i });
      await user.click(externalButton);

      // user interacting with the input
      const input = getByLabelText('Email');
      await user.type(input, 'dev@example.com');
      expect(input).toHaveValue('dev@example.com');

      // user submit the form
      const submitButton = getByRole('button', { name: /submit/i });
      await user.click(submitButton);
      expect(handleSubmit).toHaveBeenCalledTimes(1);

      // validate modal is open (it wasn't affected by internal actions)
      const modalComponent = queryByRole('dialog');
      expect(modalComponent).toBeInTheDocument();
    });
    it('should allow modal content to contain interactive elements', async () => {
      const user = userEvent.setup();
      const handleLinkClick = jest.fn();
      const handleButtonClick = jest.fn();

      const ModalWrapper = () => {
        const [open, setOpen] = useState(false);
        return (
          <>
            <button onClick={() => setOpen(true)}>Open Modal</button>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
              <Modal.Content>
                <label htmlFor="name">Name</label>
                <input id="name" placeholder="Enter your name" />

                <select>
                  <option value="">Select an option</option>
                  <option value="a">Option A</option>
                  <option value="b">Option B</option>
                </select>

                <button onClick={handleButtonClick}>Save</button>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick();
                  }}
                >
                  Learn more
                </a>
              </Modal.Content>
            </Modal>
          </>
        );
      };

      const { getByRole, getByLabelText, getByText, queryByRole } = renderWithTheme(
        <ModalWrapper />,
      );

      // user open modal
      const externalButton = getByRole('button', { name: /open modal/i });
      await user.click(externalButton);

      // user input name
      const input = getByLabelText(/name/i);
      await user.type(input, 'Luis');
      expect(input).toHaveValue('Luis');

      // user select option b
      const select = getByRole('combobox');
      await user.selectOptions(select, 'b');
      expect(select).toHaveValue('b');

      // user click save button
      const saveButton = getByRole('button', { name: /save/i });
      await user.click(saveButton);
      expect(handleButtonClick).toHaveBeenCalledTimes(1);

      // user click learn more link
      const learnMoreLink = getByText(/learn more/i);
      await user.click(learnMoreLink);
      expect(handleLinkClick).toHaveBeenCalledTimes(1);

      // validate modal is open (it wasn't affected by internal actions)
      const modalComponent = queryByRole('dialog');
      expect(modalComponent).toBeInTheDocument();
    });
    it('should render declarative structure with subcomponents', async () => {
      const user = userEvent.setup();
      const MODAL_TITLE_COMPONENT_ID = 'modal-title-component';
      const MODAL_CONTENT_COMPONENT_ID = 'modal-content-component';

      const ModalWrapper = () => {
        const [open, setOpen] = useState(false);

        return (
          <>
            <button onClick={() => setOpen(true)}>Open Modal</button>
            <Modal
              isOpen={open}
              onClose={() => setOpen(false)}
              titleId={MODAL_TITLE_COMPONENT_ID}
              descriptionId={MODAL_CONTENT_COMPONENT_ID}
            >
              <Modal.Title id={MODAL_TITLE_COMPONENT_ID}>Payment Details</Modal.Title>
              <Modal.Content id={MODAL_CONTENT_COMPONENT_ID}>
                Please enter your payment information below.
              </Modal.Content>
              <Modal.Actions>
                <button onClick={() => setOpen(false)}>Close</button>
              </Modal.Actions>
            </Modal>
          </>
        );
      };

      const { getByRole, getByText, queryByRole } = renderWithTheme(<ModalWrapper />);

      const externalButton = getByRole('button', { name: /open modal/i });
      await user.click(externalButton);

      const dialog = getByRole('dialog');
      expect(dialog).toBeInTheDocument();

      expect(dialog).toHaveAttribute('aria-labelledby', MODAL_TITLE_COMPONENT_ID);
      expect(dialog).toHaveAttribute('aria-describedby', MODAL_CONTENT_COMPONENT_ID);

      const labelled = document.getElementById(MODAL_TITLE_COMPONENT_ID);
      const described = document.getElementById(MODAL_CONTENT_COMPONENT_ID);

      expect(labelled).toBeInTheDocument();
      expect(described).toBeInTheDocument();

      expect(getByText(/payment details/i)).toBeInTheDocument();
      expect(getByText(/enter your payment information/i)).toBeInTheDocument();
      expect(getByRole('button', { name: /close/i })).toBeInTheDocument();

      await user.click(getByRole('button', { name: /close/i }));
      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });
    it('should work in nested layout structures', async () => {
      const user = userEvent.setup();

      const ModalInCard = () => {
        const [open, setOpen] = useState(false);

        return (
          <section style={{ padding: '2rem', background: '#f5f5f5' }}>
            <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
              <h2>Settings</h2>
              <p>Configure your preferences</p>
              <button onClick={() => setOpen(true)}>Open Preferences Modal</button>
            </div>

            <Modal isOpen={open} onClose={() => setOpen(false)}>
              <Modal.Title>Preferences</Modal.Title>
              <Modal.Content>
                <label htmlFor="theme">Theme</label>
                <select id="theme">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </Modal.Content>
              <Modal.Actions>
                <button onClick={() => setOpen(false)}>Close</button>
              </Modal.Actions>
            </Modal>
          </section>
        );
      };

      const { getByRole, getByLabelText, queryByRole } = renderWithTheme(<ModalInCard />);

      // user open modal from within a nested card
      const openModalButton = getByRole('button', { name: /open preferences modal/i });
      await user.click(openModalButton);

      // modal should appeard
      const dialog = getByRole('dialog');
      expect(dialog).toBeInTheDocument();

      // user select dark theme
      const select = getByLabelText(/theme/i);
      await user.selectOptions(select, 'dark');
      expect(select).toHaveValue('dark');

      // user close modal
      const closeButton = getByRole('button', { name: /close/i });
      await user.click(closeButton);
      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Focus Mangement', () => {
    it('should not trap focus when modal is closed', async () => {
      const user = userEvent.setup();

      const ModalWithSiblingInput = () => {
        const [open, setOpen] = useState(false);

        return (
          <>
            <button onClick={() => setOpen(true)}>Open Modal</button>
            <input type="text" placeholder="Outside Input" />
            <Modal isOpen={open} onClose={() => setOpen(false)}>
              <Modal.Content>
                <input type="text" placeholder="Inside Modal Input" />
              </Modal.Content>
            </Modal>
          </>
        );
      };

      const { getByPlaceholderText, queryByRole } = renderWithTheme(<ModalWithSiblingInput />);

      const outsideInput = getByPlaceholderText('Outside Input');

      // fake tab to outside input when modal is closed
      outsideInput.focus();
      expect(outsideInput).toHaveFocus();

      // confirm modal is closed
      expect(queryByRole('dialog')).not.toBeInTheDocument();

      // tab to next element (not exist, should go to body)
      await user.tab();
      expect(document.body).toHaveFocus();
    });
    it('should focus first element when mounted', async () => {
      const user = userEvent.setup();

      const ModalWithFocusableContent = () => {
        const [open, setOpen] = useState(false);

        return (
          <>
            <button onClick={() => setOpen(true)}>Open Modal</button>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
              <Modal.Title>Test Modal</Modal.Title>
              <Modal.Content>
                <input type="text" placeholder="First input" />
                <button>Second button</button>
              </Modal.Content>
            </Modal>
          </>
        );
      };

      const { getByRole, getByPlaceholderText } = renderWithTheme(<ModalWithFocusableContent />);

      // user open modal
      await user.click(getByRole('button', { name: /open modal/i }));

      // focus should be on first input
      const firstInput = getByPlaceholderText('First input');
      expect(firstInput).toHaveFocus();
    });
    it('should restore focus to trigger element', async () => {
      const user = userEvent.setup();

      const ModalWrapper = () => {
        const [open, setOpen] = useState(false);
        return (
          <>
            <button onClick={() => setOpen(true)}>Open Modal</button>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
              <Modal.Content>
                <input type="text" placeholder="First input" />
                <button>Close Modal</button>
              </Modal.Content>
            </Modal>
          </>
        );
      };

      const { getByRole, getByPlaceholderText, queryByRole } = renderWithTheme(<ModalWrapper />);

      // focus should be on trigger button
      const triggerButton = getByRole('button', { name: /open modal/i });
      triggerButton.focus();
      expect(triggerButton).toHaveFocus();

      // user open modal
      await user.click(triggerButton);

      // focus should be on first input
      const firstInput = getByPlaceholderText(/first input/i);
      expect(firstInput).toHaveFocus();

      // user close modal with escape
      await user.keyboard('{Escape}');

      // focus should be on trigger button
      expect(triggerButton).toHaveFocus();

      // modal should be unmounted
      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });
    it('should trap focus and cycle within modal content', async () => {
      const user = userEvent.setup();

      const ModalWithFocusableItems = () => {
        const [open, setOpen] = useState(false);

        return (
          <>
            <button onClick={() => setOpen(true)}>Open Modal</button>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
              <Modal.Content>
                <input type="text" placeholder="First Input" />
                <button>Second Button</button>
                <a href="#1">Third Link</a>
              </Modal.Content>
            </Modal>
          </>
        );
      };

      const { getByRole, getByPlaceholderText, getByText } = renderWithTheme(
        <ModalWithFocusableItems />,
      );

      // user open modal
      await user.click(getByRole('button', { name: /open modal/i }));

      const firstInput = getByPlaceholderText('First Input');
      const secondButton = getByRole('button', { name: /second button/i });
      const thirdLink = getByText(/third link/i);

      // when modal appeard focus should be on first input
      expect(firstInput).toHaveFocus();

      // Tab -> should go to second button
      await user.tab();
      expect(secondButton).toHaveFocus();

      // Tab again -> should go to third link
      await user.tab();
      expect(thirdLink).toHaveFocus();

      // Tab again -> should cycle back to first input
      await user.tab();
      expect(firstInput).toHaveFocus();

      // Shift+Tab -> should go to third link
      await user.keyboard('{Shift>}{Tab}{/Shift}');
      expect(thirdLink).toHaveFocus();

      // Shift+Tab again -> should go to second button
      await user.keyboard('{Shift>}{Tab}{/Shift}');
      expect(secondButton).toHaveFocus();

      // Shift+Tab again -> should go to first input
      await user.keyboard('{Shift>}{Tab}{/Shift}');
      expect(firstInput).toHaveFocus();
    });
  });

  describe('Portal Behavior', () => {
    it('should render into correct portal container', async () => {
      const user = userEvent.setup();
      const CUSTOM_CONTAINER_ID = 'custom-modal-container';

      // prepare a node in the DOM as the portal destination
      const container = document.createElement('div');
      container.setAttribute('id', CUSTOM_CONTAINER_ID);
      document.body.appendChild(container);

      const ModalWrapper = () => {
        const [open, setOpen] = useState(false);
        return (
          <>
            <button onClick={() => setOpen(true)}>Open Modal</button>
            <Modal isOpen={open} onClose={() => setOpen(false)} containerId={CUSTOM_CONTAINER_ID}>
              <Modal.Title>Portal Test</Modal.Title>
              <Modal.Content>
                <p>Rendered in custom container</p>
              </Modal.Content>
            </Modal>
          </>
        );
      };

      const { getByRole, getByText } = renderWithTheme(<ModalWrapper />);

      // user open modal
      await user.click(getByRole('button', { name: /open modal/i }));

      // ensure content rendered correctly
      const modalNode = getByRole('dialog');
      expect(modalNode).toBeInTheDocument();
      expect(getByText(/rendered in custom container/i)).toBeInTheDocument();

      // ensure modal node is contained within the expected container
      const portalContainer = document.getElementById(CUSTOM_CONTAINER_ID);
      expect(portalContainer).toContainElement(modalNode);
    });
    it('should isolate modal from parent stacking context', async () => {
      const user = userEvent.setup();

      const ModalInStackingContext = () => {
        const [open, setOpen] = useState(false);

        return (
          <div
            style={{
              transform: 'scale(1)', // crea stacking context
              overflow: 'hidden',
              position: 'relative',
              zIndex: 1,
              height: '100px',
            }}
          >
            <button onClick={() => setOpen(true)}>Open Modal</button>

            <Modal isOpen={open} onClose={() => setOpen(false)}>
              <Modal.Title>Visible Title</Modal.Title>
              <Modal.Content>
                <p>Should not be clipped or hidden</p>
              </Modal.Content>
            </Modal>
          </div>
        );
      };

      const { getByRole, getByText } = renderWithTheme(<ModalInStackingContext />);

      // user open modal
      await user.click(getByRole('button', { name: /open modal/i }));

      // ensurance modal is visible
      const dialog = getByRole('dialog');
      expect(dialog).toBeInTheDocument();

      // ensure modal content is not clipper or hidden (be accessible)
      expect(getByText(/should not be clipped or hidden/i)).toBeVisible();

      // ensurance content isn't within the parent's stacking context
      const stackingParent = getByRole('button', { name: /open modal/i }).closest('div');
      expect(stackingParent).not.toContainElement(dialog);
    });

    it('should not interfere with scroll of parent container', async () => {
      const user = userEvent.setup();

      const ScrollableWrapperWithModal = () => {
        const [open, setOpen] = useState(false);

        return (
          <div
            data-testid="scrollable-wrapper"
            style={{
              height: '200px',
              overflowY: 'scroll',
              border: '1px solid gray',
            }}
          >
            <div style={{ height: '800px', padding: '1rem' }}>
              <button onClick={() => setOpen(true)}>Open Modal</button>
              <p>Scroll me!</p>
            </div>

            <Modal isOpen={open} onClose={() => setOpen(false)}>
              <Modal.Title>Scrollable Test</Modal.Title>
              <Modal.Content>
                <p>This modal should not affect scroll behavior of parent container.</p>
              </Modal.Content>
            </Modal>
          </div>
        );
      };

      const { getByRole, getByTestId, getByText } = renderWithTheme(<ScrollableWrapperWithModal />);

      // user scroll in the container before opening the modal
      const wrapper = getByTestId('scrollable-wrapper');
      wrapper.scrollTop = 300;
      expect(wrapper.scrollTop).toBe(300);

      // user open modal
      await user.click(getByRole('button', { name: /open modal/i }));

      // ensure modal is visible
      expect(getByRole('dialog')).toBeInTheDocument();
      expect(getByText(/should not affect scroll/i)).toBeInTheDocument();

      // ensure scroll position is preserved
      expect(wrapper.scrollTop).toBe(300);
    });
  });

  describe('Resilence', () => {
    // limit cases, without props, without children, poorly configured props, etc

    it('should not crash if closed immediately after mount', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const ModalMountAndCloseImmediately = () => {
        const [open, setOpen] = useState(true);

        // Cierre inmediato en el primer render
        useEffect(() => {
          setOpen(false);
        }, []);

        return (
          <Modal isOpen={open} onClose={() => setOpen(false)}>
            <Modal.Title>Edge Case</Modal.Title>
            <Modal.Content>
              <p>This modal should close immediately</p>
            </Modal.Content>
          </Modal>
        );
      };

      renderWithTheme(<ModalMountAndCloseImmediately />);

      expect(consoleErrorSpy).not.toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
    it('should not throw if rendered without children', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const ModalWrapper = () => {
        const [open, setOpen] = useState(true);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return <Modal isOpen={open} onClose={() => setOpen(false)} />;
      };

      const { getByRole } = renderWithTheme(<ModalWrapper />);

      // Ensure no errors are thrown
      expect(consoleErrorSpy).not.toHaveBeenCalled();
      // Ensure modal is not rendered
      expect(getByRole('dialog')).toBeInTheDocument();

      consoleErrorSpy.mockRestore();
    });
    it('should fallback gracefully if no focusable elements exist', async () => {
      const user = userEvent.setup();

      const ModalWithoutFocusableElements = () => {
        const [open, setOpen] = useState(false);

        return (
          <>
            <button onClick={() => setOpen(true)}>Open Modal</button>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
              <Modal.Title>Just Info</Modal.Title>
              <Modal.Content>
                <p>This modal has no inputs, buttons, or links.</p>
              </Modal.Content>
            </Modal>
          </>
        );
      };

      const { getByRole, getByText } = renderWithTheme(<ModalWithoutFocusableElements />);

      // user open modal
      await user.click(getByRole('button', { name: /open modal/i }));

      // should appear dialog
      const dialog = getByRole('dialog');
      expect(dialog).toBeInTheDocument();

      // validate the content didn't break focus trap
      // focus should be on the dialog
      expect(dialog).toHaveFocus();

      // content should be visible
      expect(getByText(/this modal has no/i)).toBeVisible();
    });
  });
});
