import expect from 'expect';
import df from 'deep-freeze-strict';
import * as reducers from 'reducers';

describe('Reducers', () => {
    describe('errorReducer', () => {
        it('should set error message', () => {
            let action = {
                type: 'ERROR',
                message: 'Message'
            };
            let res = reducers.errorReducer(df(''), df(action));
            expect(res).toEqual(action.message);
        });
        it('should set auth error', () => {
            let action = {
                type: 'FAIL_LOGIN',
                message: 'sadasda'
            };
            let res = reducers.errorReducer(df(''), df(action));
            expect(res).toEqual(action.message)
        });
        it('should remove error', () => {
            let action = {
                type: 'REMOVE_ERROR'
            };
            let res = reducers.errorReducer(df(''), df(action));
            expect(res).toEqual('');
        });
    });
    describe('authReducer', () => {
        it('it should set token', () => {
            let action = {
                type: 'SUCCESS_LOGIN',
                token: 'sdada'
            };
            let res = reducers.authReducer(df({}), df(action));
            expect(res).toInclude({token: action.token});
        });
    });
    describe('isLoadingReducer', () => {
        it('should set isLoading to true', () => {
            let action = {
                type: 'START_FETCH'
            }
            let res = reducers.isLoadingReducer(df(false), df(action));
            expect(res).toEqual(true);
        });
        it('should set isLoading to false', () => {
            let action = {
                type: 'FINISH_FETCH'
            }
            let res = reducers.isLoadingReducer(df(true), df(action));
            expect(res).toEqual(false);
        });
            
    });
    describe('itemsReducer', () => {
        it('should set items', () => {
            let action = {
                type: 'ADD_ITEMS',
                items: [1,2,3]
            };
            let res = reducers.itemsReducer(df([]), df(action));
            expect(res).toEqual(action.items);
        });
        it('should delete items', () => {
            let action = {
                type: 'DELETE_ITEMS'
            };
            let res = reducers.itemsReducer(df([1,2,3]), df(action));
            expect(res).toEqual([]);
        })
        it('should update item', () => {
            let action = {
                type: 'UPDATE_ITEM',
                updated: {id: 3, prop: true}
            };
            let state = [{id: 1, prop: false}, {id: 3, prop:false}];
            let res = reducers.itemsReducer(df(state), df(action));
            expect(res[1]).toEqual(action.updated);
        })
        it('should create item', () => {
            let action = {
                type: 'CREATE_ITEM',
                item: {id: 25, prop: 'BEST PROP EVER SEEN'}
            };
            let state = [{id: 1, prop: false}, {id: 3, prop:false}];
            let res = reducers.itemsReducer(df(state), df(action));
            expect(res[2]).toEqual(action.item);
        })
        it('should delete item', () => {
            let action = {
                type: 'DELETE_ITEM',
                id: 1,
            };
            let state = [{id: 1, prop: false}, {id: 3, prop:false}];
            let res = reducers.itemsReducer(df(state), df(action));
            expect(res[0]).toEqual(state[1]);
        });
    });
});