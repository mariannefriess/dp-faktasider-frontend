import React from 'react';
import { Link, PageProps } from 'gatsby';
import styled from 'styled-components/macro';
import Header from './felles/Header';
import localizeSanityContent from '../i18n/localizeSanityContent';
import { useLocale } from '../i18n/LocaleContext';
import { useTranslation } from 'react-i18next';
import { Project } from '../../gatsby-utils/createFaktasider';

const StyledElement = styled.div`
  background-color: white;
  padding: 1.2rem 1.2rem 2rem;
  border-radius: 0.5rem;
`;

const Style = styled.div`
  max-width: 50rem;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem 0;
  ${StyledElement} {
    flex: 15rem 1;
    margin: 0.5rem;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const KunTilgjengeligStyle = styled.p`
  text-align: center;
  opacity: 0.7;
  margin: 1rem 0 !important;
`;

const IndexPage = (props: PageProps<{}, Project>) => {
  const lang = useLocale();
  const { t } = useTranslation('global');
  return (
    <>
      <Header heading={localizeSanityContent(props.pageContext.title, lang)} ingress="" />
      <Style>
        {props.pageContext.summaries.map((side) => (
          <StyledElement key={side.id}>
            <StyledLink to={side.path}>{side.tittel}</StyledLink>
            {!side.tilgjengeligPåValgtSpråk && (
              <KunTilgjengeligStyle>
                ({t('kunTilgjengeligPå')} {t(side.språk)})
              </KunTilgjengeligStyle>
            )}
            <p>{side.ingress}</p>
          </StyledElement>
        ))}
      </Style>
    </>
  );
};

export default IndexPage;
