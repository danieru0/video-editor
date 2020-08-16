import { types } from './types';

export type renderActions = setRenderStatusAction |
    setRenderMessageAction |
    setRenderErrorAction;

interface setRenderStatusAction {
    type: types.SET_RENDER_STATUS,
    payload: boolean;
}
export const setRenderStatus = (value: boolean): setRenderStatusAction => ({
    type: types.SET_RENDER_STATUS,
    payload: value
});

interface setRenderMessageAction {
    type: types.SET_RENDER_MESSAGE,
    payload: string;
}
export const setRenderMessage = (value: string): setRenderMessageAction => ({
    type: types.SET_RENDER_MESSAGE,
    payload: value
});

interface setRenderErrorAction {
    type: types.SET_RENDER_ERROR,
    payload: string;
}
export const setRenderErrorAction = (value: string): setRenderErrorAction => ({
    type: types.SET_RENDER_ERROR,
    payload: value
});