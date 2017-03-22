import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Button } from '../src';

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('button-click')}>Hextech</Button>
  ))
  .add('disabled', () => (
    <Button disabled onClick={action('button-click')}>+ Try Me</Button>
  ));
