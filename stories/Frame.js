import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Frame, RadioInput as BaseRadioInput, stateful } from '../src';

const RadioInput = stateful(BaseRadioInput);

const acceptClick = action('button-accept');
const rejectClick = action('button-reject');

storiesOf('Frame', module)
  .add('with title and body', () => (
    <Frame title="React Hextech"><p>A React Component library that aims to re-create the Hextech look of League of Legends</p></Frame>
  ))
  .add('with custom body', () => (
    <Frame>
      <h2>Favorite Champion</h2>
      <RadioInput onChange={action('radio-input-change')} options={['Jinx', 'Leona']} />
    </Frame>
  ))
  .add('with buttons', () => (
    <Frame options={[{ label: 'Yes', value: 'Lie', onClick: acceptClick }, { label: 'No', value: 'Truth', onClick: rejectClick }]}>
      <h2>Are you Challenger?</h2>
      <p>This is a question of utmost importance, please answer honestly</p>
    </Frame>
  ));
