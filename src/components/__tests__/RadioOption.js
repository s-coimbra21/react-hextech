import React from 'react';
import { shallow, mount } from 'enzyme';

import RadioOption from '../RadioOption';

describe('<RadioOption />', () => {
  it('should render two children', () => {
    const wrapper = shallow(<RadioOption checked value />);
    expect(wrapper.children().length).toBe(2);
  });

  it('should render its label using props.label', () => {
    const o = { label: 'testlabel', value: 'testvalue' };
    const wrapper = mount(<RadioOption
      checked
      disabled={false}
      onChange={() => false}
      {...o}
    />);
    expect(wrapper.find('.labelText').text()).toBe(o.label);
  });

  it('should render its label using props.children', () => {
    const child = 'testchild';
    const o = { value: 'testvalue' };
    const wrapper = mount(<RadioOption
      checked
      disabled={false}
      onChange={() => false}
      {...o}
    >
      {child}
    </RadioOption>);
    expect(wrapper.find('.label').text()).toBe('testchild');
  });

  it('should have the class "checked" if it is checked', () => {
    const wrapper = shallow(<RadioOption checked value="1" label="1" />);
    expect(wrapper.hasClass('checked')).toBe(true);
  });

  it('should not have the class "checked" if it isn\'t checked', () => {
    const wrapper = shallow(<RadioOption checked={false} value="1" label="1" />);
    expect(wrapper.hasClass('checked')).toBe(false);
  });

  it('should have the class "disabled" if it is disabled', () => {
    const wrapper = shallow(<RadioOption checked={false} disabled value="1" label="1" />);
    expect(wrapper.hasClass('disabled')).toBe(true);
  });
});
