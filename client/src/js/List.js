function List(props){
  const listContainer = document.createElement('div');
  listContainer.classList.add('list-container')

  const listItems = props.items.map(listItem=>{
    const listItemEl = document.createElement('div');
    listItemEl.classList.add('list-item');

    if(listItem.marked){
      listItemEl.classList.add('marked');
    }

    listItemEl.addEventListener('click',(e)=>{
      props.onClick(e,listItem);
    });

    const divider = document.createElement('div');
    divider.classList.add('small-divider')

    return {
      el:listItemEl,
      children:[
      {
        el:divider
      },
        {
          el:document.createTextNode(listItem.content)
        }
      ]
    }
  });

  return {
    el:listContainer,
    children:listItems
  };
}

export default List;
