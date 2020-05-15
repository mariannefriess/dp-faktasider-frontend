import * as React from 'react';
import { GatsbyNode, graphql, PageProps } from 'gatsby';
import BlockContent from '../../components/BlockContent/BlockContent';
import Layout from './Layout';
import GraphQLErrorList from '../../components/GraphqlErrorList';
import { Translations } from '../../types/translations';
import parseRichText from '../../utils/richTextUtils/parseRichText';
import ErrorBoundary from '../../components/ErrorBoundary';
import { SanityBlock } from '../../utils/richTextUtils/richTextTypes';
import { getBolkTitler } from '../../utils/richTextUtils/getBolkTitler';
import localize from '../../locales/localize';
import { FaktasideProvider } from './FaktasideContext';
import { SupportedLanguage } from '../../locales/supportedLanguages';
import IkkeOversatt from './IkkeOversatt';

export const query = graphql`
  query FaktaSide($id: String) {
    side: sanityFaktaSide(id: { eq: $id }) {
      _rawTitle
      _rawBody
      slug {
        current
      }
    }
  }
`;

interface PageContext {
  lang: SupportedLanguage;
  id: string;
}

export interface FaktaSideData {
  side: {
    _rawTitle: Translations<string>;
    _rawBody: Translations<SanityBlock[]>;
    slug: {
      current: string;
    };
  };
}

export interface FaktaSideProps extends PageProps<FaktaSideData, PageContext> {
  errors: any;
}

function FaktaSide(props: FaktaSideProps) {
  const lang = props.pageContext.lang;
  const ikkeOversatt = props.data.side._rawTitle[lang];

  if (!ikkeOversatt) {
    return <IkkeOversatt {...props} />;
  }

  const side = localize(props.data.side, lang);
  const parsedRichText = parseRichText(side._rawBody);
  const bolkTitler = getBolkTitler(parsedRichText);

  return (
    <ErrorBoundary>
      <FaktasideProvider faktasideProps={props}>
        <Layout header={side._rawTitle} menuItems={bolkTitler}>
          <GraphQLErrorList errors={props.errors} />
          <BlockContent blocks={parsedRichText} />
        </Layout>
      </FaktasideProvider>
    </ErrorBoundary>
  );
}

export default FaktaSide;
