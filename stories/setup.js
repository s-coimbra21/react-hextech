import React from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import theme from '../src/theme';

const Theme = storyFn => (
  <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
);

addDecorator(Theme);
