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
    });
});