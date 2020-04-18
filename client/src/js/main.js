import mount from './mount.js';
import List from './List.js';
import Input from './Input.js';
import PubSub from './pubsub.js';
import Button from './Button.js';
import db from './db.js';

function main() {

  try {
    const pubSub = new PubSub();

    let listStorage = [];

    readFromStorage();

    function addToStorage(data) {
      return db.tasks.add(data).then(() => readFromStorage());
    }

    function readFromStorage() {
      return db.tasks.filter(x=>true).toArray().then(data => {
        listStorage = data;
        update();
      });
    }

    function clearCompletedFromStorage() {
      return db.tasks.where({ 'marked': 1 }).toArray()
        .then(records => {
          const marked = records.map(item => item.id);
          return db.tasks.bulkDelete(marked);
        })
        .then(() => readFromStorage());
    }

    function toggleRead(id) {
      return db.tasks.where({ id: id }).toArray()
        .then(records => {
          return db.tasks.update(id, { marked: records[0].marked ? 0 : 1 });
        })
        .then(() => readFromStorage());
    }

    function update() {
      pubSub.publish('UPDATE');
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


    const subToUpdate = pubSub.subscribe('UPDATE', () => {
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
