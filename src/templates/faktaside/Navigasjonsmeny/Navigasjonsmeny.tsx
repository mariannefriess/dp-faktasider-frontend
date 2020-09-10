import * as React from 'react';
import styled from 'styled-components/macro';
import withErrorBoundary from '../../../components/withErrorBoundary';
import { useDekoratorPopdownOffset } from './useDekoratorPopdownOffset';
import SideListe from './SideListe';
import MobilmenyWrapper from './MobilmenyWrapper';
import { theme } from '../../../styles/theme';
import useProjectData from '../../../hooks/graphQl/useProjectData';
import { Systemtittel } from 'nav-frontend-typografi';
import useUniqueId from '../../../utils/useUniqueId';

type NavProps = { offsetTop: number };

const DesktopNav = styled.nav.attrs((props: NavProps) => ({ style: { top: `${props.offsetTop}px` } }))<NavProps>`
  @media (${theme.media.smallScreen}) {
    display: none;
  }
  border-top: ${theme.border.banner};
  background-color: white;
  @supports (position: sticky) {
    position: sticky;
    max-height: calc(100vh - ${(props) => props.offsetTop}px);
    overflow-y: auto;
    transition: top 0.2s, max-height 0.2s;
  }
  max-width: 16rem;
`;

const MobileNav = styled.nav`
  @media not all and (${theme.media.smallScreen}) {
    display: none;
  }
`;

const HeaderStyle = styled(Systemtittel)`
  padding: ${theme.layoutPadding};
  opacity: 0.8;
  pointer-events: none;
`;

function Header(props: { id: string; title: string }) {
  return (
    <HeaderStyle id={props.id}>
      <span className="sr-only">Sideoversikt</span>
      {props.title}
    </HeaderStyle>
  );
}

interface Props {
  className?: string;
}

function Navigasjonsmeny(props: Props) {
  const offsetTop = useDekoratorPopdownOffset();
  const mobileTitleId = useUniqueId('mobile-menu');
  const desktopTitleId = useUniqueId('desktop-menu');
  const projectData = useProjectData();

  return (
    <>
      <DesktopNav offsetTop={offsetTop} className={props.className} aria-labelledby={desktopTitleId}>
        <Header title={projectData.title} id={desktopTitleId} />
        <SideListe />
      </DesktopNav>
      <MobileNav className={props.className} aria-labelledby={mobileTitleId}>
        <MobilmenyWrapper offsetTop={offsetTop}>
          <Header title={projectData.title} id={mobileTitleId} />
          <SideListe />
        </MobilmenyWrapper>
      </MobileNav>
    </>
  );
}

export default withErrorBoundary(Navigasjonsmeny, 'Navigasjonsmeny');
