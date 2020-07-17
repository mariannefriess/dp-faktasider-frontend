import * as React from 'react';
import { useEffect, useReducer } from 'react';
import styled, { css } from 'styled-components/macro';
import BlockContent from '../BlockContent';
import { SanityBlock } from '../../../utils/richTextUtils/richTextTypes';
import parseRichText from '../../../utils/richTextUtils/parser/parseRichText';
import withErrorBoundary from '../../withErrorBoundary';
import { Element, Undertekst } from 'nav-frontend-typografi';
import { useTranslation } from 'react-i18next';
import useUniqueId from '../../../utils/useUniqueId';
import { theme } from '../../../styles/theme';
import VisMerPanel from './VisMerPanel';
import { loggVisTilleggsinfo } from '../../../utils/logging';
import { usePrevious } from 'react-use';

interface Props {
  node: {
    innhold: SanityBlock[];
    title: string;
  };
}

const asideBorder = `solid .1rem ${theme.colors.navBlaLighten80}`;

const StyledAside = styled.aside<{ open: boolean }>`
  border-top: ${asideBorder};
  border-bottom: ${asideBorder};
  padding: 1.5rem 0.5rem;
  margin: 1.5rem 0;
  transition: 0.3s;
  ${(props) =>
    props.open &&
    css`
      background-color: #ddd6;
    `}
`;

const Label = styled(Undertekst)`
  opacity: 0.5;
  font-size: 0.7rem;
  margin: 0 !important;
  text-transform: uppercase;
`;

const StyledElement = styled(Element)`
  margin-top: 0;
`;

function Tilleggsinnformasjon(props: Props) {
  const parsedText = parseRichText(props.node.innhold);
  const [open, toggle] = useReducer((state) => !state, false);
  const id = useUniqueId('tilleggsinfo-' + props.node.title);
  const { t } = useTranslation('global');

  const prevOpen = usePrevious(open);
  useEffect(() => {
    !prevOpen && open && loggVisTilleggsinfo(props.node.title);
  }, [open, prevOpen, props.node.title]);

  return (
    <StyledAside aria-labelledby={id} open={open}>
      <Label>{t('tilleggsinformasjon')}</Label>
      <StyledElement tag="h4" id={id}>
        {props.node.title}
      </StyledElement>
      <VisMerPanel toggle={toggle} open={open}>
        <BlockContent blocks={parsedText} />
      </VisMerPanel>
    </StyledAside>
  );
}

export default withErrorBoundary(Tilleggsinnformasjon, 'Tilleggsinnformasjon');