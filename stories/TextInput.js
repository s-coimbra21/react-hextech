import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { TextInput as BaseTextInput, stateful } from '../src';

const TextInput = stateful(BaseTextInput);

storiesOf('Text Input', module)
  .add('normal', () => (
    <TextInput onChange={action('text-input-change')} onBlur={action('text-input-blur')} placeholder="hextech..." />
  ))
  .add('search', () => (
    <TextInput onChange={action('text-input-change')} onBlur={action('text-input-blur')} placeholder="hextech..." type="search" />
  ))
  .add('without clear button', () => (
    <TextInput onChange={action('text-input-change')} onBlur={action('text-input-blur')} placeholder="hextech..." hideClear />
  ))
  .add('disabled', () => (
    <TextInput disabled placeholder="hextech..." />
  ));
