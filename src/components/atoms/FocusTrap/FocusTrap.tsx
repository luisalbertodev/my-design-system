import { FC, useRef, useEffect } from 'react';
import { FocusTrapProps } from './FocusTrap.types';
import { KeyboardKeys } from '../../../enums/KeyboardKeys';

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'area[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable]',
].join(',');

/**
 * [FocusTrap Component]
 *
 * Traps keyboard focus within its children while `isActive` is true.
 * Designed to support modal, dialogs, and layered UI where focus isolation is required.
 *
 * - Automatically focuses the first focusable element or falls back to a dummy node.
 * - Restores focus to the previously active element on unmount.
 * - Exposes `onEscape` the allow parent components to handle close behavior.
 *
 * Children are rendered via function-as-child to allow injecting the fallback ref.
 **/

const FocusTrap: FC<FocusTrapProps> = ({
  children,
  isActive,
  onEscape,
  testId = 'focus-trap-component',
}) => {
  const trapContainerRef = useRef<HTMLDivElement>(null); // Root container for quering focusable elements
  const fallbackFocusRef = useRef<HTMLDivElement>(null); // Used when no focusable elements is found
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null); // Stores focus origin to restore later

  useEffect(() => {
    if (!isActive || !trapContainerRef.current) return;

    // Save the element that had focus before trap activation
    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

    const focusables = trapContainerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);

    // If no focusable element exist, use fallback
    if (focusables.length === 0) {
      fallbackFocusRef.current?.focus();
      return;
    }

    const firstElement = focusables[0];
    const lastElement = focusables[focusables.length - 1];

    firstElement.focus(); // Initial focus on first interactive element

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      const activeElement = document.activeElement;

      // Escape key: trigger external close action
      if (event.key === KeyboardKeys.Escape && onEscape) {
        event.preventDefault();
        onEscape();
        return;
      }

      const isPressTabAndShift = event.key === KeyboardKeys.Tab && event.shiftKey;
      const isPressTabAndNotShift = event.key === KeyboardKeys.Tab && !event.shiftKey;

      // Tab + Shift: wrap to last element of on first
      if (isPressTabAndShift && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      // Tabm alone: wrap to first element if on last
      if (isPressTabAndNotShift && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      previouslyFocusedElementRef.current?.focus(); // Restore focus on unmount
    };
  }, [isActive, onEscape]);

  return (
    <div data-testid={testId} ref={trapContainerRef} style={{ outline: 'none' }}>
      {children(fallbackFocusRef)}
    </div>
  );
};

export default FocusTrap;
