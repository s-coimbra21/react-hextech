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
    disabled: PropTypes.bool,
    value: PropTypes.any,
    label: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
  }

  static defaultProps = {
    className: undefined,
    disabled: false,
    value: undefined,
    label: '',
    options: [],
    onChange: () => false,
    onBlur: () => false
  }

  componentDidMount () {
    this.uid = Math.round(Math.random() * 100);
  }

  handleSelect = (nextValue, evt) => {
    evt.preventDefault();
    const { value, onChange } = this.props;
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
    const { options, className, disabled, value, label } = this.props;
    const shouldRenderOptions = options.map && options.map.call;
    return (
      <div role="radiogroup" aria-labelledby={label} className={cx(style.radioInput, className)}>
        {shouldRenderOptions && normalizeOptions(options).map((o, i) =>
          <Option
            key={`${this.uid}${o.label}`}
            checked={o.value === value}
            disabled={disabled || o.disabled}
            onChange={evt => this.handleSelect(o.value, evt)}
            onBlur={this.handleBlur}
            label={o.label}
            value={o.value}
            tabIndex={i > 0 ? -1 : 0}
          />)}
      </div>
    );
  }
}
