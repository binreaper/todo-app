function Button(props){
  const button = document.createElement('button');
  button.appendChild(document.createTextNode((props.label)));

  if(props.onClick){
    button.addEventListener('click',props.onClick);
  }

  return {
    el:button
  }
}

export default Button;
