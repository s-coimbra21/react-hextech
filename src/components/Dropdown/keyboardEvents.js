export function handleArrowKeyNavigation(next) {
  const aux = next ? 1 : -1; // if it's next or previous

  const { options } = this.props;
  const { focusedOption } = this.state;

  const currIdx = options.findIndex(o => o === focusedOption);

  const nextIdx = currIdx + aux;

  this.navigateToOption(nextIdx);
}

export function executeStringSearch(tryNext, start = 0) {
  clearTimeout(this.searchTimeout);

  const { options } = this.props;
  const { focusedOption, focusedIdx } = this.state;

  let startIdx = start;

  if (tryNext && focusedIdx > -1 && focusedIdx + 1 < options.length) {
    startIdx = focusedIdx + 1;
  }

  let nextFocused = focusedOption;

  for (let i = startIdx; i < options.length; i += 1) {
    const label = options[i].hextech__label;
    if (tryNext && label.startsWith(this.searchString[0])) {
      nextFocused = options[i];
      break;
    } else if (label.startsWith(this.searchString)) {
      nextFocused = options[i];
      break;
    }
  }

  if (focusedOption !== nextFocused) {
    this.handleOptionFocus(nextFocused);
  } else if (tryNext) {
    for (let i = 0; i < startIdx; i += 1) {
      const label = options[i].hextech__label;
      if (label.startsWith(this.searchString[0])) {
        this.handleOptionFocus(options[i]);
        break;
      }
    }
  }

  this.searchTimeout = setTimeout(() => {
    this.searchString = '';
  }, 500);
}

const shouldHandleKey = ({ keyCode, ctrlKey, metaKey, altKey }) => {
  if ((keyCode >= 65 && keyCode <= 90) || keyCode === 32) {
    if (!ctrlKey && !metaKey && !altKey) {
      return true;
    }
  }
  return false;
};

export function handleTextSearch(evt) {
  if (!shouldHandleKey(evt)) return;
  if (evt.keyCode === 32 && this.searchString === '') return;

  evt.preventDefault();

  const lastTyped = String.fromCharCode(evt.keyCode).toLowerCase();
  const shouldTryNext =
    this.searchString.search(new RegExp(`^[${lastTyped}\\${lastTyped}]+$`)) !==
    -1;

  this.searchString += lastTyped;

  this.executeStringSearch(shouldTryNext);
}

export function handleKeyDown(evt) {
  this.handleTextSearch(evt);

  if (evt.defaultPrevented) {
    return;
  }

  const { options } = this.props;

  switch (evt.key) {
    case 'Tab':
      return this.handleChange(this.state.focusedOption);
    case 'Enter':
      this.handleChange(this.state.focusedOption);
      break;
    case ' ':
      this.handleToggle(true);
      break;
    case 'Escape':
      return this.handleChange(this.state.focusedOption);
    case 'ArrowUp':
    case 'ArrowDown':
      this.handleArrowKeyNavigation(evt.key === 'ArrowDown');
      break;
    case 'End':
      this.navigateToOption(options.length);
      break;
    case 'Home':
      this.navigateToOption(0);
      break;
    default:
      return;
  }

  evt.preventDefault();
}
