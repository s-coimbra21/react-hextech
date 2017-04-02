import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Dropdown as BaseDropdown, stateful } from '../src';

const Dropdown = stateful(BaseDropdown);

const options = ['Jinx', 'Leona', 'Renekton', 'Quinn'];
const lotsOptions = [...options, 'Anivia', 'Tristana', 'Fiora', 'Vayne', 'Tryndamere', 'Yasuo', 'Poppy', 'Diana'];

storiesOf('Dropdown', module)
  .add('normal', () => (
    <Dropdown hocClassName="dropdown-wrapper" onChange={action('dropdown-change')} onBlur={action('dropdown-blur')} options={options}>Hextech</Dropdown>
  ))
  .add('with scroll [TODO]', () => (
    <Dropdown hocClassName="dropdown-wrapper" onChange={action('dropdown-change')} onBlur={action('dropdown-blur')} options={lotsOptions}>Hextech</Dropdown>
  ))
  .add('disabled', () => (
    <Dropdown hocClassName="dropdown-wrapper" disabled onChange={action('dropdown-change')} onBlur={action('dropdown-blur')} options={options}>Try Me</Dropdown>
  ));
