import { renderWithTheme } from '../../../shared/test/renderWithTheme';
import GenericPortal from './GenericPortal';

describe('GenericPortal Component', () => {
  describe('Acceptance Criteria', () => {
    it('should render null if containerId is not provided', () => {
      const PORTAL_CONTENT_TEST_ID = 'portal-content';

      const { queryByTestId } = renderWithTheme(
        <GenericPortal containerId="">
          <div data-testid={PORTAL_CONTENT_TEST_ID}>Content inside portal</div>
        </GenericPortal>,
      );

      const portalContent = queryByTestId(PORTAL_CONTENT_TEST_ID);
      expect(portalContent).toBeNull();
    });
    it('should render children into the resolved DOM container', () => {
      const PORTAL_TEST_ID = 'portal-test';
      const PORTAL_CONTENT_TEST_ID = 'portal-content';

      const { queryByTestId } = renderWithTheme(
        <GenericPortal containerId={PORTAL_TEST_ID}>
          <div data-testid={PORTAL_CONTENT_TEST_ID}>Content inside portal</div>
        </GenericPortal>,
      );

      const portalContent = queryByTestId(PORTAL_CONTENT_TEST_ID);
      expect(portalContent).toBeInTheDocument();
    });
    it('should support rendering multiple containers independently', () => {
      const PORTAL_A_TEST_ID = 'portal-a-test';
      const PORTAL_B_TEST_ID = 'portal-b-test';
      const PORTAL_A_CONTENT_TEST_ID = 'portal-a-content';
      const PORTAL_B_CONTENT_TEST_ID = 'portal-b-content';

      const { getByTestId } = renderWithTheme(
        <>
          <GenericPortal containerId={PORTAL_A_TEST_ID}>
            <div data-testid={PORTAL_A_CONTENT_TEST_ID}>Content inside portal A</div>
          </GenericPortal>
          <GenericPortal containerId={PORTAL_B_TEST_ID}>
            <div data-testid={PORTAL_B_CONTENT_TEST_ID}>Content inside portal B</div>
          </GenericPortal>
        </>,
      );

      const portalContainerA = document.getElementById(PORTAL_A_TEST_ID);
      const portalContainerB = document.getElementById(PORTAL_B_TEST_ID);

      expect(portalContainerA).not.toBeNull();
      expect(portalContainerB).not.toBeNull();

      const portalContentA = getByTestId(PORTAL_A_CONTENT_TEST_ID);
      const portalContentB = getByTestId(PORTAL_B_CONTENT_TEST_ID);

      expect(portalContainerA).toContainElement(portalContentA);
      expect(portalContainerB).toContainElement(portalContentB);

      expect(portalContainerA).not.toContainElement(portalContentB);
      expect(portalContainerB).not.toContainElement(portalContentA);
    });
  });
});
