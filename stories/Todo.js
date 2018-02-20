import React from 'react';
import { storiesOf } from '@storybook/react';
import { RuneBuilder } from '../src';

storiesOf('TODO', module)
  .add('Mastery Builder', () => null)
  .add('Rune Builder', () => <RuneBuilder id="rune-builder" />)
  .add('Champion Squares w/ Mastery', () => null);
