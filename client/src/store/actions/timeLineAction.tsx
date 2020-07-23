import { timeLine, item } from '../../types/timeline';
import { types } from './types';

export type timeLineActions = createNewTrackAction
    | addItemToTrackAction
    | updateItemTimeAction
    | setTimelineRefAction
    | updateItemTrackPositionAction
    | updateItemTrackSizeAction
    | updateItemPositionAction
    | updateItemColorAction
    | updateTextOptionsColorAction
    | updateTextOptionsPositionAction
    | updateTextOptionsAlignAction;

interface createNewTrackAction {
    type: types.CREATE_NEW_TRACK,
    payload: timeLine
}
export const createNewTrack = (value: timeLine): createNewTrackAction => ({
    type: types.CREATE_NEW_TRACK,
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

interface updateTextOptionsColorAction {
    type: types.UPDATE_TEXT_OPTIONS_COLOR
    payload: { name: string, color: string }
}
export const updateTextOptionsColor = (value: { name: string; color: string }): updateTextOptionsColorAction => ({
    type: types.UPDATE_TEXT_OPTIONS_COLOR,
    payload: value
})

interface updateTextOptionsPositionAction {
    type: types.UPDATE_TEXT_OPTIONS_POSITION,
    payload: { name: string, x: number; y: number }
}
export const updateTextOptionsPosition = (value: { name: string, x: number, y: number }): updateTextOptionsPositionAction => ({
    type: types.UPDATE_TEXT_OPTIONS_POSITION,
    payload: value
})

interface updateTextOptionsAlignAction {
    type: types.UPDATE_TEXT_OPTIONS_ALIGN,
    payload: { name: string, align: string; }
}
export const updateTextOptionsAlign = (value: { name: string, align: string }): updateTextOptionsAlignAction => ({
    type: types.UPDATE_TEXT_OPTIONS_ALIGN,
    payload: value
})