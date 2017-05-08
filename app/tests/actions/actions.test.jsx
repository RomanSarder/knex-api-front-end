import * as actions from 'actions';
import thunk from 'redux-thunk';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
const createMockStore = configureMockStore([thunk]);

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
    it('should generate FAIL_LOGIN action with message', () => {
        let action = {
            type: 'FAIL_LOGIN',
            message: 'Message'
        };
        let res = actions.failLogin(action.message);
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
    it('should start fetching data and generate failLogin', (done) => {
        const store = createMockStore();
        store.dispatch(actions.login('1234', 'adsad')).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toInclude({type: 'START_FETCH'});
            expect(actions[1]).toInclude({type: 'FAIL_LOGIN'});
            expect(actions[1].message).toNotEqual('Something went wrong. Try again!')
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
});