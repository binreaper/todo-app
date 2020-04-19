import Listener from '../../../../../sid/listener';

import mount from './mount.js';
import List from './List.js';
import Input from './Input.js';
import Button from './Button.js';

function main() {
  try {
    const listener = new Listener();

    let listStorage = [];

    readFromStorage();

    function addToStorage(data) {
      localStorage.setItem('listTaks',JSON.stringify(listStorage));
    }

    function readFromStorage() {
      listStorage = JSON.parse(localStorage.getItem('listTasks')) || [];
      update();
    }

    function clearCompletedFromStorage() {
      listStorage  = listStorage.filter(item=>!item.marked);
      addToStorage(listStorage);
      update();
    }

    function toggleRead(id) {
      listStorage = listStorage.map(item=>{
        if(item.id === id){
          item.marked = true;
        }
        return item;
      });

      addToStorage();
    }

    function update() {
      listener.shout('UPDATE');
    }

    function render() {
      const list = List({
        update,
        items: listStorage,
        onClick: (e, selection) => {
          toggleRead(selection.id);
        }
      });

      const input = Input({
        placeholder: "What\'s on your mind?",
        onKeyUp: (e) => {
          if (e.keyCode === 13) {
            addToStorage({
              id: listStorage.length,
              content: e.target.value,
              marked: 0
            });
          }
        },
      });

      const button = Button({
        label: 'Clear',
        onClick: (e) => {
          clearCompletedFromStorage();
        }
      })

      const flexContainer = document.createElement('div');
      flexContainer.classList.add('flex');
      flexContainer.classList.add('task-entry-container');

      return {
        el: document.querySelector('main'),
        root: true,
        children: [{
          el: flexContainer,
          children: [
            input,
            button
          ]
        },
          list
        ]
      };
    }


    listener.listen('UPDATE', () => {
      mount(render());
    });

    mount(render());
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}



main();
