import { FC, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { DomPortalContainerService } from '../../../services/DomPortalContainerService';
import { GenericPortalProps } from './GenericPortal.types';

/**
 * Projects `children` into an external DOM node using `ReactDOM.createPortal`.
 *
 * - Mounts content in a container identified by `containerId`.
 * - Automatically creates or reuses the container via `DomPortalContainerService`.
 * - Renders only after the component is mounted, ensuring SSR safety.
 *
 * @remarks
 * Useful for modals, dropdowns, tooltips, and other UI layers that require rendering outside the React tree.
 *
 * @example
 * ```tsx
 * <GenericPortal containerId="modal-root">
 *   <div role="dialog">Hello from portal</div>
 * </GenericPortal>
 * ```
 */

const GenericPortal: FC<GenericPortalProps> = ({ containerId, children }) => {
  // Memoizes the container DOM node to avoid unnecessary re-fetches or recreations.
  const containerRef = useRef<HTMLElement | null>(null);

  // Prevents portal rendering until the container is available on the client.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (containerId) {
      // Delegates container resolution to DomPortalContainer.
      // This allows abstraction of DOM logic and enables reuse across the system.
      containerRef.current = DomPortalContainerService.getOrCreate(containerId);

      // Flags the component as safe to render the portal content.
      setMounted(true);
    }
  }, [containerId]);

  // Defensive render guard to ensure SSR safety and avoid mounting into null.
  if (!mounted || !containerRef.current) return null;

  // Core portal behavior: renders children into external DOM node.
  return createPortal(children, containerRef.current);
};

export default GenericPortal;
