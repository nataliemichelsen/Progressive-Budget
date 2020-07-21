// db variable
let db;

// index variable
const index = indexedDB.open('budget, 1');

// index events
// creating object store & db
index.onupgradeneeded = event => {
    const db = event.target.result;
    db.createObjectStore('pending', { autoIncrement: true });
}

// targeting event result
index.onsuccess = event => {
    db = event.target.result;
}

// delivering error message if triggered
index.onerror = event => {
    console.log(`ERROR: $(event.target.errorCode)`)
}

// run a check to make sure there is data in the indexedDB
function runCheck() {
    const transaction = db.transaction(['pending'], ['readwrite']);
    const store = transaction.objectStore('pending');
    const getAll = store.getAll();

    // check to make sure the db is populated
    getAll.onsuccess = () => {
        if (getAll.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result)
            // then to return the stored data so it can be cleared
            }).then(res => res.json()).then(() => {
                const transaction = db.transaction(['pending'], ['readwrite']);
                const store = transaction.objectStore('pending');
                store.clear();
            });
        }
    }
}

// save a record of the transaction
function saveRecord(data) {
    const transaction = db.transaction(['pending'], ['readwrite']);
    const store = transaction.objectStore('pending');
    // add data
    store.add(data);
}