import { timeLine } from '../../types/timeline';
import { types } from './types';

export type timeLineActions = createNewTrackAction;

interface createNewTrackAction {
    type: types.CREATE_NEW_TRACK,
    payload: timeLine
}
export const createNewTrack = (value: timeLine): createNewTrackAction => ({
    type: types.CREATE_NEW_TRACK,
    payload: value
});