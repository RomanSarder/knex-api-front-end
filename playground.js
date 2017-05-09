let state = [{ id: 1, prop: false }, { id: 3, prop: false }];
let updated = { id: 3, prop: true };

let newstate = state.map((item) => {
    if (item.id === updated.id) {
        return updated;
    }
    return item;
})

console.log(newstate);