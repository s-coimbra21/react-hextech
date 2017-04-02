import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import debounce from 'lodash.debounce';
import { SliderInput as BaseSliderInput, stateful } from '../src';

const SliderInput = stateful(BaseSliderInput);

storiesOf('Slider Input', module)
  .add('normal', () => (
    <SliderInput hocClassName="slider-wrapper" onChange={debounce(action('slider-input-change'), 300)} onBlur={action('slider-input-blur')} />
  ))
  .add('with tooltip [TODO]', () => (
    <SliderInput hocClassName="slider-wrapper" onChange={debounce(action('slider-input-change'), 300)} onBlur={action('slider-input-blur')} tooltip />
  ))
  .add('disabled', () => (
    <SliderInput hocClassName="slider-wrapper" onChange={debounce(action('slider-input-change'), 300)} onBlur={action('slider-input-blur')} disabled />
  ));
