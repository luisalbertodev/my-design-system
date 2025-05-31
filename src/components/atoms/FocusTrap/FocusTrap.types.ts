import { Ref } from 'react';

export interface FocusTrapProps {
  children: (fallbackRef: Ref<HTMLDivElement>) => React.ReactNode; // Render-props pattern
  isActive: boolean;
  onEscape?: () => void;
  testId?: string;
}
