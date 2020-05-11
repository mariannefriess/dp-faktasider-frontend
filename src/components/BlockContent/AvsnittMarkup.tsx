import * as React from 'react';
import BlockContent from './BlockContent';
import styled from 'styled-components';
import { Ingress } from 'nav-frontend-typografi';
import { idFromString } from '../../utils/routingUtils';
import { Avsnitt } from '../../utils/richTextUtils/richTextTypes';

interface Props {
  node: Avsnitt;
}

const StyledSection = styled.section`
  margin: 3rem 0 2rem;
`;

const StyledIngress = styled(Ingress)`
  margin-bottom: 1rem;
  font-weight: 600 !important;
`;

function AvsnittMarkup(props: Props) {
  const id = idFromString(props.node.tittel);

  return (
    <StyledSection aria-labeledby={id}>
      <StyledIngress tag="h3" id={id} tabIndex={-1}>
        {props.node.tittel}
      </StyledIngress>
      <BlockContent blocks={props.node.children} />
    </StyledSection>
  );
}

export default AvsnittMarkup;
