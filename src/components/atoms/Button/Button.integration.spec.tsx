import { useState } from 'react';

import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../../shared/test/renderWithTheme';
import Button from './Button';

describe('Button Integration', () => {
  describe('User Interaction', () => {
    it('should trigger onClick when clicked by user', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      const { getByRole } = renderWithTheme(<Button onClick={handleClick}>Click Me</Button>);

      const button = getByRole('button', { name: /click me/i });

      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Compose Usaged', () => {
    it('should be usable inside semantic structures without conflict', () => {
      const { getByRole } = renderWithTheme(
        <section aria-label="Toolbar">
          <Button>Filter</Button>
        </section>,
      );

      const button = getByRole('button', { name: /filter/i });
      expect(button).toBeInTheDocument();
      expect(button).toBeVisible();
    });

    it('should not submit form by default', async () => {
      const handleSubmit = jest.fn((e) => e.preventDefault());
      const user = userEvent.setup();

      const { getByRole } = renderWithTheme(
        <form onSubmit={handleSubmit}>
          <Button>Submit</Button>
        </form>,
      );

      await user.click(getByRole('button', { name: /submit/i }));
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Resilience', () => {
    it('should toggle state when clicked', async () => {
      const TEST_ID = 'state-indicator';
      const user = userEvent.setup();

      const ToggleComponent = () => {
        const [active, setActive] = useState(false);

        return (
          <>
            <p data-testid={TEST_ID}>{active ? 'Active' : 'Inactive'}</p>
            <Button onClick={() => setActive(!active)}>Toggle</Button>
          </>
        );
      };

      const { getByTestId, getByRole } = renderWithTheme(<ToggleComponent />);

      expect(getByTestId(TEST_ID)).toHaveTextContent('Inactive');
      await user.click(getByRole('button', { name: /toggle/i }));
      expect(getByTestId(TEST_ID)).toHaveTextContent('Active');
    });
  });
});
