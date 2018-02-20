import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { Checkbox as BaseCheckbox, stateful } from '../src';

const Checkbox = stateful(BaseCheckbox);

storiesOf('Checkbox', module)
  .add('with text', () => (
    <Checkbox onClick={action('checkbox-click')} onChange={action('checkbox-change')} onBlur={action('checkbox-blur')}>Hextech</Checkbox>
  ))
  .add('disabled', () => (
    <Checkbox disabled onClick={action('checkbox-click')} onBlur={action('checkbox-blur')}>Try Me</Checkbox>
  ));
