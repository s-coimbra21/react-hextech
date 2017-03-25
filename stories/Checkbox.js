import React, { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Checkbox as BaseCheckbox, stateful } from '../src';

const Checkbox = stateful(BaseCheckbox);

storiesOf('Checkbox', module)
  .add('with text', () => (
    <Checkbox onClick={action('button-click')} onBlur={action('button-blur')}>Hextech</Checkbox>
  ))
  .add('disabled', () => (
    <Checkbox disabled onClick={action('button-click')} onBlur={action('button-blur')}>Try Me</Checkbox>
  ));
