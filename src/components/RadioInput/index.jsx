import React, { PropTypes, PureComponent } from 'react';

import normalizeOptions from '../../util/normalize-options';

import Option from '../RadioOption';

import style from './index.scss';

/**
 * RadioInput Component
 *
 * @export
 * @class RadioInput
 * @extends {PureComponent}
 */
export default class RadioInput extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    options: PropTypes.array
  }

  static defaultProps = {
    disabled: false,
    initialValue: undefined,
    value: undefined,
    options: [],
    onClick: () => false,
    onChange: () => false,
    children: undefined
  }

  /**
   * Called when an option is selected. If the option
   * is different from what is currently selected,
   * onChange is called.
   * If the onClick prop was provided to the component,
   * it is called every time an option is clicked.
   *
   * @memberOf RadioInput
   * @param {Object} option the which was clicked
   */
  handleSelect = nextValue => {
    const { value, onChange, onClick } = this.props;
    onClick(nextValue);
    if (nextValue !== value) {
      onChange(nextValue);
    }
  }

  render () {
    const { children, options, disabled, value } = this.props;
    const shouldRenderOptions = options.map && options.map.call;
    return (
      <div role="radiogroup" className={style.radioInput}>
        {shouldRenderOptions && normalizeOptions(options).map(o =>
          <Option
            key={o.label}
            checked={o.value === value}
            disabled={disabled || o.disabled}
            onClick={() => this.handleSelect(o.value)}
            label={o.label}
            value={o.value}
          />)}
        {children}
      </div>
    );
  }
}
