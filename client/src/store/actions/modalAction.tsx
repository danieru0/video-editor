import { types } from './types';

export type modalActions = updateModalDataAction;

interface updateModalDataAction {
    type: types.UPDATE_MODAL_DATA,
    payload: {
        name: string | null;
        type: string | null;
    }
}
export const updateModalData = (value: { name: string | null; type: string | null }): updateModalDataAction => ({
    type: types.UPDATE_MODAL_DATA,
    payload: value
});