import * as actions from 'actions';
import thunk from 'redux-thunk';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
const createMockStore = configureMockStore([thunk]);
let token;
axios.post('http://localhost:3000/api/login', {
    email: "roman@ya.ru",
    password: '123'
}).then((res) => {
    token = res.data.token;
})

describe('ACTIONS', () => {
    it('should generate START_FETCH action', () => {
        let action = {
            type: 'START_FETCH'
        };
        let res = actions.startFetch();
        expect(res).toEqual(action);
    });
    it('should generate FINISH_FETCH action', () => {
        let action = {
            type: 'FINISH_FETCH'
        };
        let res = actions.finishFetch();
        expect(res).toEqual(action);
    });
    it('should generate SUCCESS_LOGIN action', () => {
        let action = {
            type: 'SUCCESS_LOGIN',
            token: '123'
        };
        let res = actions.successLogin(action.token);
        expect(res).toEqual(action);
    });
    it('should generate ADD_ITEMS action with array', () => {
        let action = {
            type: 'ADD_ITEMS',
            items: [1,2,3]
        };
        let res = actions.addItems(action.items);
        expect(res).toEqual(action);
    });
    it('should generate DELETE_ITEMS action', () => {
        let action = {
            type: 'DELETE_ITEMS'
        };
        let res = actions.deleteItems();
        expect(res).toEqual(action);
    });
    it('should generate ERROR action with message', () => {
        let action = {
            type: 'ERROR',
            message: 'YAY'
        };
        let res = actions.errorMessage(action.message);
        expect(res).toEqual(action);
    });
    it('should generate REMOVE_ERROR action', () => {
        let action = {
            type: 'REMOVE_ERROR'
        };
        let res = actions.removeError();
        expect(res).toEqual(action);
    });
    it('should generate UPDATE_ITEM with updated item', () => {
        let action = {
            type: 'UPDATE_ITEM',
            updated: {name: 'Lala'}
        };
        let res = actions.updateStoreItem(action.updated);
        expect(res).toEqual(action);
    });
    it('should generate DELETE_ITEM with id', () => {
        let action = {
            type: 'DELETE_ITEM',
            id: 1
        };
        let res = actions.deleteStoreItem(action.id);
        expect(res).toEqual(action);
    });
    it('should generate CREATE_ITEM with item', () => {
        let action = {
            type: 'CREATE_ITEM',
            item: ['created']
        }
        let res = actions.createStoreItem(action.item);
        expect(res).toEqual(action);
    });
});
describe('ASYNC ACTIONS', () => {
    const email = 'roman@ya.ru';
    const password = '123';
    it('should start fetching data and generate successLogin', (done) => {
        const store = createMockStore({});
        store.dispatch(actions.login(email, password)).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toInclude({type: 'START_FETCH'});
            expect(actions[1]).toInclude({type: 'SUCCESS_LOGIN'});
            expect(actions[1].token).toBeA('string');
            expect(actions[2]).toInclude({type: 'FINISH_FETCH'});
            done()
        }).catch(done);
    });
    it('should start fetching data and generate ERROR', (done) => {
        const store = createMockStore();
        store.dispatch(actions.login('1234', 'adsad')).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toInclude({type: 'START_FETCH'});
            expect(actions[1]).toInclude({type: 'ERROR'});
            expect(actions[1].message).toBeA('string');
            expect(actions[2]).toInclude({type: 'FINISH_FETCH'});
            done()
        }).catch(done);
    });
    it('should fetch items and generate finishFetch', (done) => {
        const store = createMockStore();
        store.dispatch(actions.fetchItems()).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toInclude({type: 'START_FETCH'});
            expect(actions[2]).toInclude({type: 'FINISH_FETCH'});
            expect(actions[1]).toInclude({type: 'ADD_ITEMS'});
            expect(actions[1].items).toBeA('array');
            expect(actions[1].items.length).toBeMoreThan(0);
            done()
        })
        .catch(done);
    });
    it('should update item and generate finishFetch', (done) => {
        const store = createMockStore();
        store.dispatch(actions.updateItem({
            name: 'Notebook',
            number: 13,
            state: 'In transit',
            id: 1,
            token
        })).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toInclude({type: 'START_FETCH'});
            expect(actions[1]).toInclude({type: 'UPDATE_ITEM'});
            expect(actions[1].updated).toBeA('object');
            expect(actions[2]).toInclude({type: 'FINISH_FETCH'});
            done()
        })
        .catch(done);
    });
    it('should not update item and generate error message', (done) => {
        const store = createMockStore();
        store.dispatch(actions.updateItem({
            name: 'Notebook',
            number: 13,
            state: 'In transit',
            id: 22,
            token
        })).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toInclude({type: 'START_FETCH'});
            expect(actions[1]).toInclude({type: 'ERROR'});
            expect(actions[1].message).toBeA('string');
            done();
        }).catch(done);
    });
    it('should create item and generate finishFetch', (done) => {
        const store = createMockStore();
        store.dispatch(actions.createItem({
            name: 'PSP',
            number: 50,
            state: 'In transit',
            token
        })).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toInclude({type: 'START_FETCH'});
            expect(actions[1]).toInclude({type: 'CREATE_ITEM'});
            expect(actions[1].item).toBeA('object');
            expect(actions[2]).toNotInclude({type: 'ERROR'});
            done();
        }).catch(done);
    });
    it('should delete item', (done) => {
        const store = createMockStore();
        store.dispatch(actions.deleteItem(1, token))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toInclude({type: 'START_FETCH'});
            expect(actions[1]).toInclude({type: 'DELETE_ITEM'});
            expect(actions[1].id).toBeA('number');
            expect(actions[2]).toNotInclude({type: 'ERROR'});
            done()
        }).catch(done);
    });
    it('should register user', (done) => {
        const store = createMockStore({});
        store.dispatch(actions.register({email: 'roman.sarder@yandex.ru', name: 'Roman Sarder', password: '1234'})).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toInclude({type: 'START_FETCH'});
            expect(actions[1]).toInclude({type: 'SUCCESS_LOGIN'});
            expect(actions[1].token).toBeA('string');
            expect(actions[2]).toInclude({type: 'FINISH_FETCH'});
            done()
        }).catch(done);
    });
});