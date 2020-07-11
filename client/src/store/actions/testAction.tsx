import { test } from '../../types/test';
import { types } from './types';

export type testActions = setTestValueAction;

interface setTestValueAction {
    type: types.SET_TEST_VALUE,
    payload: test
}
export const setTestValue = (value: test): setTestValueAction => ({
    type: types.SET_TEST_VALUE,
    payload: value
});