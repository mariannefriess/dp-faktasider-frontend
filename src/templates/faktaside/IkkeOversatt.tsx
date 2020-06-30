import * as React from 'react';
import { FaktaSideProps } from './FaktaSide';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../../i18n/supportedLanguages';
import FaktaSideLayout from './FaktaSideLayout';

const Style = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-height: 30vh;
`;

const StyledUl = styled.ul`
  list-style: none !important;
`;

const StyledNormaltekst = styled(Normaltekst)`
  margin: 2rem 0 0 !important;
`;

function IkkeOversatt(props: FaktaSideProps) {
  const page = props.pageContext;
  const { t } = useTranslation('global');

  const oversettelser = supportedLanguages.map((lang) => {
    const publisert = page.visSprakversjon?.[lang];
    if (!publisert) {
      return null;
    }
    const tittel = page.rawData.title?.[lang];
    return (
      <li>
        <Link to={`/${lang}/${page.slug?.current}`}>
          {tittel} - ({t(lang)})
        </Link>
      </li>
    );
  });

  const title = page.title || '';
  const ingress = page.ingress || '';

  return (
    <FaktaSideLayout header={title} ingress={ingress}>
      <Style>
        <Innholdstittel>{t('ikkeOversatt')}</Innholdstittel>
        {oversettelser.length && (
          <>
            <StyledNormaltekst>{t('tilgjengeligPåAndreSpråk')}</StyledNormaltekst>
            <StyledUl>{oversettelser}</StyledUl>
          </>
        )}
      </Style>
    </FaktaSideLayout>
  );
}

export default IkkeOversatt;
