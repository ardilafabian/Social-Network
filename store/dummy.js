const db = {
    'user': [
        {id:'1', name:'Carlos'},
    ],
};

async function list(table) {
    return db[table];
}

async function get(table, id) {
    let col = await list(table);
    return col.filter( item => item.id === id)[0] || null;
}

async function upsert(table, data) {
    if (!db[table]) {
        db[table] = []
    }
    db[table].push(data);
    console.log(db);
}

async function remove(table, id) {
    let index = db[table].findIndex(item => item.id === id);
    if (index >= 0) {
        db[table].splice(index, 1);
    }
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove
}