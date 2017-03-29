import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { SliderInput } from '../src';

storiesOf('Slider Input', module)
  .add('normal', () => (
    <SliderInput onChange={action('radio-input-change')} onBlur={action('radio-input-blur')} />
  ))
  .add('disabled', () => (
    <SliderInput onChange={action('radio-input-change')} onBlur={action('radio-input-blur')} disabled />
  ));
