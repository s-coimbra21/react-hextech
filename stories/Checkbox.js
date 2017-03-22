import React, { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Checkbox as BaseCheckbox } from '../src';

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
    return <div><Cmp {...this.props} value={this.state.value} onChange={this.handleChange} /></div>;
  }
};

const Checkbox = stateful(BaseCheckbox);

storiesOf('Checkbox', module)
  .add('with text', () => (
    <Checkbox onClick={action('button-click')} onBlur={action('button-blur')}>Hextech</Checkbox>
  ))
  .add('disabled', () => (
    <Checkbox disabled onClick={action('button-click')} onBlur={action('button-blur')}>Try Me</Checkbox>
  ));
