import React from 'react';
import { getPubliseringsTidspunkt } from '../../../gatsby-utils/getPubliseringstidspunkt';
import { render } from '../../utils/test-utils';
import SistOppdatert from './SistOppdatert';
import { rawFaktasideDataMock } from '../../../__mocks__/rawFaktasideDataMock';

describe('Sist oppdatert funker finfint med internasjonalisering', () => {
  test('På norsk', () => {
    const publiseringsTidspunkt = getPubliseringsTidspunkt(rawFaktasideDataMock, 'no');
    const result = render(<SistOppdatert publiseringsTidspunkt={publiseringsTidspunkt} />);

    result.getByText('Denne siden ble sist oppdatert 10. juli 2020 12:54');
  });

  test('På engelsk', () => {
    const publiseringsTidspunkt = getPubliseringsTidspunkt(rawFaktasideDataMock, 'en');
    const result = render(<SistOppdatert publiseringsTidspunkt={publiseringsTidspunkt} />, undefined, 'en');

    result.getByText('Last updated on July 10th 2020 12:54');
  });
});
