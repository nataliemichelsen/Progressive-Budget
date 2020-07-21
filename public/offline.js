// db variable
let db;

// index variable
const index = indexedDB.open('budget, 1');

// index events
// 
index.onupgradeneeded = event => {

}

// 
index.onsuccess = event => {

}

// 
index.onerror = event => {
    
}

// run a check to make sure there is data in the indexedDB
function runCheck() {

}

// save a record of the transaction
function saveRecord(data) {

}