import React, { PropTypes, PureComponent } from 'react';
import cx from 'classnames';

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
    className: PropTypes.any,
    tabIndex: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
    disabled: PropTypes.bool,
    value: PropTypes.any,
    options: PropTypes.array,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
  }

  static defaultProps = {
    className: undefined,
    tabIndex: '0',
    disabled: false,
    value: undefined,
    options: [],
    onClick: () => false,
    onChange: () => false,
    onBlur: () => false
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
  handleSelect = (nextValue, evt) => {
    const { value, onChange, onClick } = this.props;
    onClick(evt);
    if (nextValue !== value) {
      onChange(nextValue);
    }
  }

  handleBlur = evt => {
    const { disabled, onBlur } = this.props;
    if (!disabled) {
      onBlur(evt);
    }
  }

  render () {
    const { options, className, tabIndex, disabled, value } = this.props;
    const shouldRenderOptions = options.map && options.map.call;
    return (
      <div role="radiogroup" className={cx(style.radioInput, className)} tabIndex={tabIndex}>
        {shouldRenderOptions && normalizeOptions(options).map(o =>
          <Option
            key={o.label}
            checked={o.value === value}
            disabled={disabled || o.disabled}
            onClick={evt => this.handleSelect(o.value, evt)}
            onBlur={this.handleBlur}
            label={o.label}
            value={o.value}
          />)}
      </div>
    );
  }
}
