import Dexie from 'dexie';

const db = new Dexie('Tasks');

// Declare tables, IDs and indexes
db.version(1).stores({
  tasks: '++id, content, marked'
});

export default db;
