import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { Button } from '../src';

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('button-click')}>Hextech</Button>
  ))
  .add('magic [TODO]', () => <span />)
  .add('disabled', () => (
    <Button disabled onClick={action('button-click')}>+ Try Me</Button>
  ));
