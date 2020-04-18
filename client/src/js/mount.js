function mount(tree) {
  if (!tree.children || !tree.children.length) {
    return;
  }

  if(tree.root){
    tree.el.innerHTML = '';
  }

  tree.children.forEach(item => {
    tree.el.appendChild(item.el);
    return mount(item);
  });
}


export default mount;
