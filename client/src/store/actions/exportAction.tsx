import { types } from './types';

export type exportActions = setExportStateAction;

interface setExportStateAction {
    type: types.SET_EXPORT_STATE,
    payload: boolean;
}
export const setExportState = (value: boolean) => ({
    type: types.SET_EXPORT_STATE,
    payload: value
});