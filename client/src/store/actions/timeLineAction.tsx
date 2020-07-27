import { timeLine, item } from '../../types/timeline';
import { types } from './types';

export type timeLineActions = createNewTrackAction
    | deleteTrackAction
    | updateTrackNameAction
    | moveTrackAction
    | addItemToTrackAction
    | deleteItemFromTrackAction
    | updateItemTimeAction
    | setTimelineRefAction
    | updateItemTrackPositionAction
    | updateItemTrackSizeAction
    | updateItemPositionAction
    | updateItemColorAction
    | updateTextOptionsAction;

interface createNewTrackAction {
    type: types.CREATE_NEW_TRACK,
    payload: timeLine
}
export const createNewTrack = (value: timeLine): createNewTrackAction => ({
    type: types.CREATE_NEW_TRACK,
    payload: value
});

interface deleteTrackAction {
    type: types.DELETE_TRACK,
    payload: string;
}
export const deleteTrack = (value: string): deleteTrackAction => ({
    type: types.DELETE_TRACK,
    payload: value
});

interface moveTrackAction {
    type: types.MOVE_TRACK
    payload: {name: string, type: string}
}
export const moveTrack = (value: {name: string, type: string}): moveTrackAction => ({
    type: types.MOVE_TRACK,
    payload: value
});

interface updateTrackNameAction {
    type: types.UPDATE_TRACK_NAME,
    payload: { name: string, newName: string }
}
export const updateTrackName = (value: { name: string, newName: string }): updateTrackNameAction => ({
    type: types.UPDATE_TRACK_NAME,
    payload: value
});

interface addItemToTrackAction {
    type: types.ADD_ITEM_TO_TRACK,
    payload: {name: string; item: item}
}
export const addItemToTrack = (value: {name: string; item: item}): addItemToTrackAction => ({
    type: types.ADD_ITEM_TO_TRACK,
    payload: value
});

interface deleteItemFromTrackAction {
    type: types.DELETE_ITEM_FROM_TRACK,
    payload: string;
}
export const deleteItemFromTrack = (value: string): deleteItemFromTrackAction => ({
    type: types.DELETE_ITEM_FROM_TRACK,
    payload: value
});

interface updateItemTimeAction {
    type: types.UPDATE_ITEM_TRACK,
    payload: {name: string, start: number; end: number}
}
export const updateItemTime = (value: {name: string, start: number; end: number}): updateItemTimeAction => ({
    type: types.UPDATE_ITEM_TRACK,
    payload: value
});

interface setTimelineRefAction {
    type: types.SET_TIMELINE_REF,
    payload: object
}
export const setTimelineRef = (value: object): setTimelineRefAction => ({
    type: types.SET_TIMELINE_REF,
    payload: value
});

interface updateItemTrackPositionAction {
    type: types.UPDATE_ITEM_TRACK_POSITION,
    payload: { xPosition: number, start: number, end: number, name: string; }
}
export const updateItemTrackPosition = (value: { xPosition: number, start: number, end: number, name: string }): updateItemTrackPositionAction => ({
    type: types.UPDATE_ITEM_TRACK_POSITION,
    payload: value
})

interface updateItemTrackSizeAction {
    type: types.UPDATE_ITEM_TRACK_SIZE,
    payload: {name: string, width: string, start: number, end: number, xPosition: number};
}
export const updateItemTrackSize = (value: {name: string, width: string, start: number, end: number, xPosition: number}): updateItemTrackSizeAction => ({
    type: types.UPDATE_ITEM_TRACK_SIZE,
    payload: value
})

interface updateItemPositionAction {
    type: types.UPDATE_ITEM_POSITION,
    payload: { name: string, x: number, y: number }
}
export const updateItemPosition = (value: { name: string, x: number, y: number }): updateItemPositionAction => ({
    type: types.UPDATE_ITEM_POSITION,
    payload: value 
})

interface updateItemColorAction {
    type: types.UPDATE_ITEM_COLOR,
    payload: { name: string, color: string }
}
export const updateItemColor = (value: { name: string, color: string }): updateItemColorAction => ({
    type: types.UPDATE_ITEM_COLOR,
    payload: value 
})

interface TextOptions {
    name: string;
    textAlign: string | null;
    fontSize: string | null;
    fontFamily: string | null;
    text: string | null;
    textColor: string | null;
    x: number | null;
    y: number | null;
}
interface updateTextOptionsAction {
    type: types.UPDATE_TEXT_OPTIONS,
    payload: TextOptions
}
export const updateTextOptions = (value: TextOptions): updateTextOptionsAction => ({
    type: types.UPDATE_TEXT_OPTIONS,
    payload: value
})