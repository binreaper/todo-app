function Input(props) {
  const inputEl = document.createElement('input');
  inputEl.classList.add('w-100');
  inputEl.placeholder = props.placeholder || '';
  if (props.onKeyUp) {
    inputEl.addEventListener('keyup', props.onKeyUp);
  }
  return {
    el: inputEl
  };
}

export default Input;
