import { test } from '../../types/test'
import { types, Action } from '../actions/types';

export interface TestState {
    testValue: test
}

const initState: TestState = {
    testValue: {
        text: ''
    }
}

export default (state = initState, action: Action): TestState => {
    switch(action.type) {
        case types.SET_TEST_VALUE: {
            return {...state, testValue: action.payload}
        }
        default: return state;
    }
}