// runtimeDatabase.js

export const RuntimeDatabase = (() => {
    const data = {};

    function create(key, value = key) {
        if (!(key in data)) {
            data[key] = value;
        } else {
            console.warn(`Key "${key}" already exists. Use update() to change the value.`);
        }
    }

    function read(key) {
        if (key in data) {
            return data[key];
        } else {
            console.warn(`Key "${key}" not found.`);
            return null;
        }
    }

    function update(key, value) {
        if (key in data) {
            data[key] = value;
        } else {
            console.warn(`Key "${key}" not found. Use create() to add the key first.`);
        }
    }

    function getAll() {
        return { ...data };
    }

    return {
        create,
        read,
        update,
        getAll,
    };
})();

export default RuntimeDatabase;