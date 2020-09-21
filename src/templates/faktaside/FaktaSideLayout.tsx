import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components/macro';
import Navigasjonsmeny from './Navigasjonsmeny/Navigasjonsmeny';
import Header from '../felles/Header';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import DevKnapper from '../../components/DevKnapper/DevKnapper';
import { MainContentStyle } from './MainContentStyle';
import withErrorBoundary from '../../components/withErrorBoundary';
import Filtrering from './TilpassInnhold/TilpassInnhold';
import { theme } from '../../styles/theme';

interface Props {
  header: string;
  ingress: string;
  children: ReactNode;
  publiseringsTidspunkt?: string;
}

const ContentStyle = styled.div`
  flex-grow: 1;
  position: relative;
  min-height: 30vh;
  @media (${theme.media.bigScreen}) {
    display: flex;
    align-items: flex-start;
    .order-1 {
      order: 1;
    }
    .order-2 {
      order: 2;
      flex-grow: 1;
    }
    .order-3 {
      order: 3;
    }
  }
`;

const Style = styled.div`
  display: flex;
  position: relative;
  align-items: flex-start;
`;

function FaktaSideLayout(props: Props) {
  return (
    <>
      <LanguageSelector />
      <Style>
        <DevKnapper />
        <ContentStyle>
          <Navigasjonsmeny className="order-1" />
          <Filtrering className="order-3" />
          <div className="order-2">
            <Header
              heading={props.header}
              ingress={props.ingress}
              publiseringsTidspunkt={props.publiseringsTidspunkt}
            />
            <MainContentStyle>{props.children}</MainContentStyle>
          </div>
        </ContentStyle>
      </Style>
    </>
  );
}

export default withErrorBoundary(FaktaSideLayout, 'FaktaSideLayout');
