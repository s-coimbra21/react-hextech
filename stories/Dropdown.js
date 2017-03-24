import React, { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Dropdown as BaseDropdown } from '../src';

const stateful = Cmp => class extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: false
    };
  }

  handleChange = value => {
    this.setState({ value });
  }

  render () {
    return <div className="dropdown-wrapper"><Cmp {...this.props} value={this.state.value} onChange={this.handleChange} /></div>;
  }
};

const Dropdown = stateful(BaseDropdown);

const options = ['Jinx', 'Leona', 'Renekton', 'Quinn'];
const lotsOptions = [...options, 'Anivia', 'Tristana', 'Fiora', 'Vayne', 'Tryndamere', 'Yasuo', 'Poppy', 'Diana'];

storiesOf('Dropdown', module)
  .add('normal', () => (
    <Dropdown onChange={action('dropdown-change')} onBlur={action('dropdown-blur')} options={options}>Hextech</Dropdown>
  ))
  .add('with scroll', () => (
    <Dropdown onChange={action('dropdown-change')} onBlur={action('dropdown-blur')} options={lotsOptions}>Hextech</Dropdown>
  ))
  .add('disabled', () => (
    <Dropdown disabled onChange={action('dropdown-change')} onBlur={action('dropdown-blur')} options={options}>Try Me</Dropdown>
  ));
