import React from 'react';
import {render, configure, cleanup } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import Heading from './Heading';

expect.extend(toHaveNoViolations);

beforeAll(() => {
  configure({ testIdAttribute: 'data-test-id' });
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('Display heading', () => {
  it('displays h1 heading with text HI', async () => {
    const textToDisplay = 'HI';
    const { container, getByTestId } = render(<Heading text={textToDisplay} />);

    const result = getByTestId('heading-test');
    expect(result).toHaveTextContent(textToDisplay);

    const axeA11yResult = await axe(container, {
      rules: {
        'button-name': { enabled: false },
      }
    });
    expect(axeA11yResult).toHaveNoViolations();
  });
});
