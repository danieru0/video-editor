import { combineReducers } from 'redux';
import testReducer, { TestState } from './testReducer';

export default combineReducers({
    test: testReducer
})

export type RootState = {
    test: TestState
}