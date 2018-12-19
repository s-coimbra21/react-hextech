export function handleArrowKeyNavigation(next) {
  const { options } = this.props;
  const { focusedOption } = this.state;

  const currIdx = options.findIndex(o => o === focusedOption);

  const nextIdx = currIdx + next;

  this.navigateToOption(nextIdx);
}

export function executeStringSearch(tryNext, start = 0) {
  clearTimeout(this.searchTimeout);

  const { options } = this.props;
  const { focusedOption } = this.state;

  const focusedIdx = options.findIndex(o => o === focusedOption);

  let startIdx = start;

  if (tryNext && focusedIdx > -1 && focusedIdx + 1 < options.length) {
    startIdx = focusedIdx + 1;
  }

  let nextFocusedIdx = focusedIdx;

  for (let i = startIdx; i < options.length; i += 1) {
    const label = options[i].hextech__label;
    if (tryNext && label.startsWith(this.searchString[0])) {
      nextFocusedIdx = i;
      break;
    } else if (label.startsWith(this.searchString)) {
      nextFocusedIdx = i;
      break;
    }
  }

  if (focusedOption !== options[nextFocusedIdx]) {
    this.navigateToOption(nextFocusedIdx);
  } else if (tryNext) {
    this.navigateToOption(
      options.findIndex(o => o.hextech__label.startsWith(this.searchString[0]))
    );
  }

  this.searchTimeout = setTimeout(() => {
    this.searchString = '';
  }, 1000);
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
    this.searchString[this.searchString.length - 1] === lastTyped;

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
    case 'Enter':
      return this.handleChange(this.state.focusedOption);
    case ' ':
      this.handleToggle(true);
      break;
    case 'Escape':
      this.handleToggle(false);
      break;
    case 'ArrowUp':
    case 'ArrowDown':
      this.handleArrowKeyNavigation(evt.key === 'ArrowDown' ? 1 : -1);
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
