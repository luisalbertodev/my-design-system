/**
 * Manages DOM containers for React Portals by `id`.
 *
 * - Creates or reuses a container appended to `document.body`.
 * - Prevents duplicates and centralizes DOM access.
 *
 * @example
 * const container = DomPortalContainerService.getOrCreate('modal-root');
 * ReactDOM.createPortal(children, container);
 */

export class DomPortalContainerService {
  static get(id: string): HTMLElement | null {
    return document.getElementById(id);
  }

  static create(id: string): HTMLElement {
    const container = document.createElement('div');
    container.id = id;
    document.body.appendChild(container);

    return container;
  }

  static getOrCreate(id: string): HTMLElement {
    return this.get(id) ?? this.create(id);
  }
}
