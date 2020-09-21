import * as React from 'react';
import { Block, Group } from '../../utils/richTextUtils/richTextTypes';
import { useTranslation } from 'react-i18next';
import { idFromString } from '../../utils/idFromString';
import H2GroupMarkup from '../../components/BlockContent/GroupMarkup/H2GroupMarkup';
import withErrorBoundary from '../../components/withErrorBoundary';

interface Props {
  blocks?: Block[];
}

function KortFortalt(props: Props) {
  const { t } = useTranslation('global');

  const blocks = props.blocks;
  if (!blocks || !blocks.length) {
    return null;
  }

  const h2Group: Group = {
    title: t('kortFortalt'),
    children: blocks,
    _type: 'group',
    style: 'h2',
    blockConfig: {
      id: idFromString(t('kortFortalt')),
    },
  };

  return <H2GroupMarkup {...h2Group} />;
}

export default withErrorBoundary(KortFortalt, 'KortFortalt');