import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { RadioInput as BaseRadioInput, stateful } from '../src';

const RadioInput = stateful(BaseRadioInput);

const options = ['Jinx', 'Leona', 'Renekton', 'Quinn'];

storiesOf('Radio Input', module)
  .add('with options', () => (
    <RadioInput onChange={action('radio-input-change')} onBlur={action('radio-input-blur')} options={options} />
  ))
  .add('disabled', () => (
    <RadioInput disabled onChange={action('radio-input-change')} onBlur={action('radio-input-blur')} options={options} />
  ));
