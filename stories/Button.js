import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button } from '../src';

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('button-click')}>Hextech</Button>
  ))
  .add('disabled', () => (
    <Button disabled onClick={action('button-click')}>
      Hextech
    </Button>
  ))
  .add('alternate', () => <button className="alternate">Hextech</button>)
  .add('alternate (disabled)', () => (
    <button className="alternate magic" disabled>
      Hextech
    </button>
  ))
  .add('alternate (magic)', () => (
    <button className="alternate magic">Hextech</button>
  ))
  .add('Pure CSS', () => <button>Hextech</button>)
  .add('Pure CSS (disabled)', () => <button disabled>Hextech</button>);
